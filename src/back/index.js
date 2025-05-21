const { Client, LocalAuth, Buttons } = require('whatsapp-web.js');
const qrcode = require('qrcode-terminal');

const path = require('path');
const chromePath = path.join(process.cwd(), 'puppeteer-core', '.local-chromium', 'win64-1045629', 'chrome-win', 'chrome.exe');

const client = new Client({
    authStrategy: new LocalAuth(),
    puppeteer: {
        executablePath: chromePath,
        headless: true,
        args: ['--no-sandbox', '--disable-setuid-sandbox']
    }
});

//processo para gerar o QR code para conectar com o chatbot
client.on('qr', qr => {
    qrcode.generate(qr, { small: true });
    console.log('Escaneie o QR Code com o WhatsApp para conectar o chatbot');
});

//quando conectado avisa sobre a conexão
client.on('ready', () => {
    console.clear();
    console.log('O chatbot está em funcionamento (não feche essa janela)');
});

//instancia lista de municipes
const municipes = {};

//quando recebe uma mensagem
client.on('message', async msg => {
    //salva "quem" mandou
    const numeroDoMunicipe = msg.from;

    //ignora se for de um grupo
    if (numeroDoMunicipe.includes('@g.us')) return;

    //se ainda não esta na lista
    if (!municipes[numeroDoMunicipe]) {
        municipes[numeroDoMunicipe] = { step: 0 };
    }

    const municipe = municipes[numeroDoMunicipe];

    /*EXEMPLO DE MUNICIPE
    nome
    email
    endereco (da atuacao)
    detalhes (descrissao do problema)
    tag
    contatoJaRealizado (se ja realizou contato com a secretaria)
    numeroProtocolo
    dataAbertura (data de criacao do protocolo)
    prazoProtocolo (prazo do protocolo)
    */

    try {
        switch (municipe.step) {
            case 0://entrou em contato pela primeira vez
                await client.sendMessage(numeroDoMunicipe,
                    `Olá! Seja bem-vindo(a) à *Ouvidoria de contagem*.\n` +
                    `Seu problema é relacionado a algum dos tópicos abaixo? (Indique pelo número do problema)\n` +
                    `1 - Capina\n` +
                    `2 - Buraco\n` +
                    `3 - Iluminação pública\n` +
                    `4 - Coleta de lixo\n` +
                    `5 - Outro\n`
                );
                municipe.step = 1;
                break;
            case 1://valida se ja fez contato com a secretaria
                const tag = await validarTAG(msg);//resposta da pergunta anterior
                if (tag != null) {
                    municipe.tag = tag;
                    await client.sendMessage(numeroDoMunicipe, `Já foi feito contato com a secretaria? (Sim ou Não`);
                    municipe.step = 2;
                }
                break;
            case 2://pega o numero do protocolo
                const contato = await validarContatoSecretaria(msg)
                if (contato != null && contato != "nao") {
                    municipe.contatoJaRealizado = msg.body;
                    await client.sendMessage(numeroDoMunicipe, `Qual o número do protocolo?`);
                    municipe.step = 3;
                } else if (contato == "nao") {
                    municipe.step = 10;
                }
                break;
            case 3://pega a data de abertura do protocolo
                const protocolo = await validarProtocolo(msg)
                if (protocolo != null) {
                    municipe.numeroProtocolo = msg.body;
                    await client.sendMessage(numeroDoMunicipe, `Qual a data de abertura do protocolo?`);
                    municipe.step = 4;
                }

                break;
            case 4://pega o prazo desse protocolo
                const data = await validarDataAbertura(msg)
                if (data != null) {
                    municipe.dataAbertura = msg.body;
                    await client.sendMessage(numeroDoMunicipe, `Qual o prazo do protocolo?`);
                    municipe.step = 5;
                }

                break;
            case 5://pega o nome do municipe
                const prazo = await validarPrazo(msg)
                if (prazo != null) {
                    municipe.prazoProtocolo = msg.body;
                    await client.sendMessage(numeroDoMunicipe,
                        `Certo, estamos quase finalizando essa etapa.\n` +
                        `Qual o seu nome?`
                    );
                    municipe.step = 6;
                }

                break;
            case 6://pega o email
                const nome = await validarNome(msg)
                if (nome != null) {
                    municipe.nome = msg.body;
                    await client.sendMessage(numeroDoMunicipe, `Qual o email para contato?`);
                    municipe.step = 7;
                }

                break;
            case 7://pega o endereço
                const email = await validarEmail(msg)
                if (email != null) {
                    municipe.email = msg.body;
                    await client.sendMessage(numeroDoMunicipe, `Qual o endereço?`);
                    municipe.step = 8;
                }

                break;
            case 8://pega a descrição do problema
                const endereco = await validarEndereço(msg)
                if (endereco != null) {
                    municipe.endereco = msg.body;
                    await client.sendMessage(numeroDoMunicipe, 'Certo, para finalizar, por gentileza descreva o problema em mais detalhes.');
                    municipe.step = 9;
                }

                break;
            case 9://mensagem pre atendimento humano
                const detalhes = await validarDetalhes(msg)
                if (detalhes != null) {
                    municipe.detalhes = msg.body;
                    await client.sendMessage(numeroDoMunicipe,
                        `*${municipe.nome}* Em breve entraremos em contato com mais detalhes\n` +
                        `Tópico: *${municipe.tag}*.\n` +
                        `Protocolo: *${municipe.numeroProtocolo}*.\n` +
                        `Abertura/Prazo: *${municipe.dataAbertura} - ${municipe.prazoProtocolo}*.\n` +
                        `Nome: *${municipe.nome}*.\n` +
                        `E-mail: *${municipe.email}*.\n` +
                        `Endereço: *${municipe.endereco}*\n` +
                        `Situação: *${municipe.detalhes}*.\n`
                    );
                    municipe.step = 11;
                }

                break;
            case 10:
                await client.sendMessage(numeroDoMunicipe,
                    `Por favor, entre em contato com a secretaria correspondente e abra um protocolo.\n` +
                    `Você pode encontrar mais informações sobre as secretarias no seguinte link: https://portal.contagem.mg.gov.br/portal/secretarias`
                );
                municipe.step = 11;
                break;
            case 11:
                //se precisar
                break;
        }

    } catch (err) {
        console.error('❌ Erro ao processar mensagem:', err.message);
        await client.sendMessage(numeroDoMunicipe, '⚠️ Ocorreu um erro. Tente novamente em instantes.');
    }
});

client.initialize();

async function validarTAG(msg) {
    const valor = parseInt(msg.body);

    if (!isNaN(valor) && valor >= 1 && valor <= 5) {
        return msg.body;
    } else {
        return null;
    }
}

async function validarContatoSecretaria(msg) {
    if (["sim", "s", "já", "já sim", "ja"].includes(msg.body.toLowerCase())) {
        return msg.body;
    } else if (["não", "n", "nao"].includes(msg.body.toLowerCase())) {
        return "nao";
    } else {
        return null;
    }
}

async function validarProtocolo(msg) {
    if (msg.body) {
        return msg.body;
    } else {
        return null;
    }
}

function converterParaDate(dataString) {
    const [dia, mes, ano] = dataString.split('/');
    return new Date(`${ano}-${mes}-${dia}`);
}

function diferencaEmDias(data1, data2) {
    const msPorDia = 1000 * 60 * 60 * 24;
    const diffMs = Math.abs(data2 - data1);
    return Math.floor(diffMs / msPorDia);
}

function formatarDataAtual() {
    const hoje = new Date();
    const dia = String(hoje.getDate()).padStart(2, '0');
    const mes = String(hoje.getMonth() + 1).padStart(2, '0');
    const ano = hoje.getFullYear();
    return `${dia}/${mes}/${ano}`;
}

async function validarDataAbertura(dataString) {
    const dataAtualFormatada = formatarDataAtual();
    const data2 = converterParaDate(dataAtualFormatada);
    const data1 = converterParaDate(dataString);

    const diasDeDiferenca = diferencaEmDias(data1, data2);

    if (diasDeDiferenca >= 15) {
        return dataString;
    } else {
        return null;
    }
}

async function validarPrazo(msg) {
    const resultado = await validarDataAbertura(msg.body);

    if (resultado) {
        return msg.body;
    } else {
        await client.sendMessage(msg.from, '⚠️ O tempo é menor que o esperado de 15 dias.');
        return null;
    }
}


async function validarNome(msg) {
    if (1 == 1) {//verificar o que precisa para validar nome
        return msg.body;
    } else {
        return null;
    }
}

async function validarEmail(msg) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (emailRegex.test(msg.body)) {
        return msg.body;
    } else {
        await client.sendMessage(msg.from, '⚠️ O e-mail digitado é inválido.');
        return null;
    }
}

async function validarEndereço(msg) {
    if (1 == 1) {//verificar o que precisa para validar endereço
        return msg.body;
    } else {
        return null;
    }
}

async function validarDetalhes(msg) {
    if (1 == 1) {//verificar o que precisa para validar detalhes
        return msg.body;
    } else {
        return null;
    }
}
