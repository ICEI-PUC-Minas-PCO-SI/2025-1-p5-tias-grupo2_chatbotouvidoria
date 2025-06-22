const { Client, LocalAuth } = require('whatsapp-web.js');
const qrcode = require('qrcode-terminal');

const path = require('path');
const { DefaultSerializer } = require('v8');
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

//instancia a lista de municipes
const municipes = {};

//quando recebe uma mensagem
client.on('message', async msg => {
    //salva "quem" mandou
    const numeroDoMunicipe = msg.from;

    //ignora se for de um grupo
    if (numeroDoMunicipe.includes('@g.us')) return;

    //se ainda não esta na lista manda para o passo 0, saudar
    if (!municipes[numeroDoMunicipe]) {
        municipes[numeroDoMunicipe] = { step: 0 };
        console.log(`O municipe ${numeroDoMunicipe} iniciou contato.`);
    }

    const municipe = municipes[numeroDoMunicipe];

    /*EXEMPLO DE MUNICIPE
    responderAoErro (bool para saber se vai responder ao erro)
    nome
    email
    endereco (da atuacao)
    detalhes (descricao do problema)
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
                    `Olá! Seja bem-vindo(a) à *Ouvidoria de Contagem*.\n\n` +
                    `Por gentileza, selecione o número correspondente ao tipo de problema que você está enfrentando:\n\n` +
                    `1 - Capina (mato alto)\n` +
                    `2 - Buracos na via\n` +
                    `3 - Iluminação pública\n` +
                    `4 - Coleta de lixo\n` +
                    `5 - Outro assunto\n`
                );
                municipe.step = 1;
                municipe.responderAoErro = true;
                break;
            case 1://valida se ja fez contato com a secretaria
                const tag = await validarTAG(msg);//resposta da pergunta anterior
                if (tag != null) {
                    municipe.tag = tag;
                    await client.sendMessage(numeroDoMunicipe, `Você já entrou em contato com a secretaria responsável por esse assunto?\n` +
                        `Responda apenas com\n` +
                        `*1 para Sim* e\n` +
                        `*2 para Não*.`);
                    municipe.step = 2;
                    municipe.responderAoErro = true;
                }
                else if (municipe.responderAoErro == true) {
                    municipe.responderAoErro = false;
                    await client.sendMessage(numeroDoMunicipe, `⚠️ Por favor, responda com um dos números indicados na mensagem anterior.`);
                }
                break;
            case 2://pega o numero do protocolo
                const contato = await validarContatoSecretaria(msg)
                if (contato == 1) {
                    municipe.contatoJaRealizado = msg.body;
                    await client.sendMessage(numeroDoMunicipe, `Por gentileza, informe o *número do protocolo* fornecido pela secretaria.`);
                    municipe.step = 3;
                    municipe.responderAoErro = true;
                } else if (contato == 2) {
                    municipe.contatoJaRealizado = msg.body;
                    await client.sendMessage(numeroDoMunicipe,
                        `Tudo bem!\n\nPedimos, por favor, que entre em contato com a secretaria responsável para registrar um protocolo antes de continuar com o atendimento aqui na Ouvidoria.\n\nConfira as informações de contato no link abaixo:\n🔗 https://portal.contagem.mg.gov.br/portal/secretarias`);
                    municipe.step = 110;
                    municipe.responderAoErro = true;
                    console.log(`O municipe ${numeroDoMunicipe} finalizou contato.`);
                }
                else if (municipe.responderAoErro == true) {
                    municipe.responderAoErro = false;
                    await client.sendMessage(numeroDoMunicipe, `⚠️ Responda com *1 para* _sim_ ou *2 para* _Não_, por favor.`);
                }
                break;
            case 3://pega a data de abertura do protocolo
                const protocolo = await validarProtocolo(msg)
                if (protocolo != null) {
                    municipe.numeroProtocolo = msg.body;
                    await client.sendMessage(numeroDoMunicipe, `Por favor, informe a *data em que o protocolo foi aberto*\n siga o formato *DD/MM/AAAA*.`);
                    municipe.step = 4;
                    municipe.responderAoErro = true;
                }
                else if (municipe.responderAoErro == true) {
                    municipe.responderAoErro = false;
                    await client.sendMessage(numeroDoMunicipe, `⚠️ Por favor, informe um número de protocolo válido.`);
                }

                break;
            case 4://pega o prazo desse protocolo
                const data = await validarDataAbertura(msg)
                if (data != null) {
                    municipe.dataAbertura = msg.body;
                    await client.sendMessage(numeroDoMunicipe, `Qual é o *prazo estimado* informado para a resolução do seu protocolo?\n siga o formato *DD/MM/AAAA*`);
                    municipe.step = 5;
                    municipe.responderAoErro = true;
                }
                else if (municipe.responderAoErro == true) {
                    municipe.responderAoErro = false;
                    await client.sendMessage(numeroDoMunicipe, `⚠️ Informe uma data válida de abertura, por favor.`);
                }

                break;
            case 5://pega o nome do municipe
                const prazo = await validarPrazo(msg)
                if (prazo != null) {
                    municipe.prazoProtocolo = msg.body;
                    await client.sendMessage(numeroDoMunicipe, `Certo, estamos quase terminando. \nAgora, por gentileza, informe o seu *nome completo*.`);
                    municipe.step = 6;
                    municipe.responderAoErro = true;
                }
                else if (municipe.responderAoErro == true) {
                    municipe.responderAoErro = false;
                    await client.sendMessage(numeroDoMunicipe, `⚠️ Por favor, informe o prazo de atendimento fornecido pela secretaria.`);
                }

                break;
            case 6://pega o email
                const nome = await validarNome(msg)
                if (nome != null) {
                    municipe.nome = msg.body;
                    await client.sendMessage(numeroDoMunicipe, `${msg.body.split(" ")[0]}, Para que possamos entrar em contato, qual é o seu *e-mail*?`);
                    municipe.step = 7;
                    municipe.responderAoErro = true;
                }
                else if (municipe.responderAoErro == true) {
                    municipe.responderAoErro = false;
                    await client.sendMessage(numeroDoMunicipe, `⚠️ Informe seu nome completo, por favor.`);
                }

                break;
            case 7://pega o endereço
                const email = await validarEmail(msg)
                if (email != null) {
                    municipe.email = msg.body;
                    await client.sendMessage(numeroDoMunicipe, `Por gentileza, informe o *endereço completo* referente ao problema.`);
                    municipe.step = 8;
                    municipe.responderAoErro = true;
                }
                else if (municipe.responderAoErro == true) {
                    municipe.responderAoErro = false;
                    await client.sendMessage(numeroDoMunicipe, `⚠️ Informe um endereço de e-mail válido, por favor.`);
                }

                break;
            case 8://pega a descrição do problema
                const endereco = await validarEndereço(msg)
                if (endereco != null) {
                    municipe.endereco = msg.body;
                    await client.sendMessage(numeroDoMunicipe, 'Para finalizar, por favor, *descreva com mais detalhes o problema* que está enfrentando.');
                    municipe.step = 100;
                    municipe.responderAoErro = true;
                }
                else if (municipe.responderAoErro == true) {
                    municipe.responderAoErro = false;
                    await client.sendMessage(numeroDoMunicipe, `⚠️ Por favor, informe um endereço válido.`);
                }

                break;
            case 100://Encerrar atendimento - com mensagem para aguardar atendente
                const detalhes = await validarDetalhes(msg)
                if (detalhes != null) {
                    municipe.detalhes = msg.body;
                    await client.sendMessage(numeroDoMunicipe,
                        `Muito obrigado pelas informações, *${municipe.nome}*! \n\n` +
                        `Em breve, nossa equipe entrará em contato para dar continuidade ao atendimento.\n\n` +
                        `📌 *Resumo da sua solicitação:*\n` +
                        `• Tópico: *${tagCompleta(municipe.tag)}*\n` +
                        `• Protocolo: *${municipe.numeroProtocolo}*\n` +
                        `• Abertura/Prazo: *${municipe.dataAbertura} - ${municipe.prazoProtocolo}*\n` +
                        `• Nome: *${municipe.nome}*\n` +
                        `• E-mail: *${municipe.email}*\n` +
                        `• Endereço: *${municipe.endereco}*\n` +
                        `• Detalhes do problema: *${municipe.detalhes}*\n`
                    );
                    municipe.step = 300;
                    municipe.responderAoErro = true;
                    console.log(`O municipe ${numeroDoMunicipe} finalizou contato.`);

                    setTimeout(() => {
                        delete municipes[numeroDoMunicipe];
                        console.log(`Municipe ${numeroDoMunicipe} terminou o tempo de espera.`);
                    }, 300000);
                }
                else if (municipe.responderAoErro == true) {
                    municipe.responderAoErro = false;
                    await client.sendMessage(numeroDoMunicipe, `⚠️ Por favor, forneça uma breve descrição do problema.`);
                }
                break;
            case 110://Encerrar atendimento - com link das secretarias
                await client.sendMessage(numeroDoMunicipe,
                    `Atendimento finalizado, caso tenha mais alguma dúvida entre em contato novamente.`
                );
                setTimeout(() => {
                    delete municipes[numeroDoMunicipe];
                    console.log(`Municipe ${numeroDoMunicipe} terminou o tempo de espera.`);
                }, 300000);
                municipe.step = 300;
                break;
            case 300://"Limbo do encerramento"
                if (msg.body.trim() == "-1") {
                    delete municipes[numeroDoMunicipe];
                    console.log(`Municipe ${numeroDoMunicipe} reiniciou a conversa.`);
                }
                break;
        }

    } catch (err) {
        console.error('❌ Erro ao processar mensagem:', err.message);
        await client.sendMessage(numeroDoMunicipe, '⚠️ Ocorreu um erro. Tente novamente em instantes.');
    }
});

client.initialize();

async function validarTAG(msg) {
    const valor = msg.body.trim();

    if (["1", "2", "3", "4", "5"].includes(valor)) {
        return msg.body;
    } else {
        return null;
    }
}

async function validarContatoSecretaria(msg) {
    const valor = msg.body.trim();

    if (["1", "2"].includes(valor)) {
        return msg.body;
    } else {
        return null;
    }
}

async function validarProtocolo(msg) {
    const detalhes = msg.body.trim();
    if (detalhes.length > 4) {
        return msg.body;
    } else {
        return null;
    }
}

async function validarDataAbertura(msg) {
    const valor = msg.body.trim();
    const regex = /^([0-2]\d|3[01])\/(0\d|1[0-2])\/\d{4}$/;

    if (regex.test(valor)) {
        const [day, month, year] = valor.split('/').map(Number);
        const date = new Date(`${year}-${month}-${day}`);

        return (
            date.getFullYear() === year &&
            date.getMonth() + 1 === month &&
            date.getDate() === day
        );

    } else {
        return null;
    }
}

async function validarPrazo(msg) {
    const valor = msg.body.trim();
    const regex = /^([0-2]\d|3[01])\/(0\d|1[0-2])\/\d{4}$/;

    if (regex.test(valor)) {
        const [day, month, year] = valor.split('/').map(Number);
        const date = new Date(`${year}-${month}-${day}`);

        return (
            date.getFullYear() === year &&
            date.getMonth() + 1 === month &&
            date.getDate() === day
        );

    } else {
        return null;
    }
}

async function validarNome(msg) {
    const nome = msg.body.trim();
    if (nome.length > 2) {
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
        return null;
    }
}

async function validarEndereço(msg) {
    const endereco = msg.body.trim();
    if (endereco.length > 5) {
        return msg.body;
    } else {
        return null;
    }
}

async function validarDetalhes(msg) {
    const detalhes = msg.body.trim();
    if (detalhes.length > 10) {
        return msg.body;
    } else {
        return null;
    }
}

function tagCompleta(tag) {
    /*`1 - Capina (mato alto)\n` +
    `2 - Buracos na via\n` +
    `3 - Iluminação pública\n` +
    `4 - Coleta de lixo\n` +
    `5 - Outro assunto\n`*/

    let tagCompleta = "";

    switch (tag) {
        case "1":
            tagCompleta = "1 - Capina (mato alto)";
            break;
        case "2":
            tagCompleta = "2 - Buracos na via";
            break;
        case "3":
            tagCompleta = "3 - Iluminação pública";
            break;
        case "4":
            tagCompleta = "4 - Coleta de lixo";
            break;
        case "5":
            tagCompleta = "5 - Outro";
            break;
        default:
            tagCompleta = "0 - TAG";
            break;
    }

    return tagCompleta;
}
