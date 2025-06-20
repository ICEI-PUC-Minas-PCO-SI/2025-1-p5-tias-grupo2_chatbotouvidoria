# Plano de testes de software

<span style="color:red">Pré-requisitos: <a href="02-Especificacao.md">Especificação do projeto</a></span>, <a href="05-Projeto-interface.md">Projeto de interface</a>

Este plano tem como objetivo validar os requisitos definidos para a aplicação SmartOuvidoria, garantindo que o chatbot para atendimento à Ouvidoria Geral de Contagem funcione conforme esperado em diferentes situações de uso.

A seguir, estão descritos os principais casos de teste planejados com base nos requisitos funcionais e não funcionais do projeto.

# CT-001 – Saudação ao Munícipe

| Campo                   | Detalhes                                                                                                        |
| ----------------------- | --------------------------------------------------------------------------------------------------------------- |
| **Requisito associado** | RD-001 – O sistema deve saudar o munícipe.                                                                      |
| **Objetivo do teste**   | Verificar se o sistema envia a mensagem de saudação corretamente após a primeira interação do munícipe.         |
| **Passos**              | - Abrir o WhatsApp/ - Enviar qualquer mensagem para o número da Ouvidoria/ - Observar a resposta automática |
| **Critério de êxito**   | - O sistema envia uma mensagem de saudação com identificação da Ouvidoria de Contagem.                          |
| **Responsável**         | Vinicius Augusto                                                                                    |


<br>

# CT-002 – Cadastro de Manifestação

| Campo                   | Detalhes                                                                                                                                 |
| ----------------------- | ---------------------------------------------------------------------------------------------------------------------------------------- |
| **Requisito associado** | RF-006 a RF-007 – Coleta de dados e descrição da manifestação.                                                                           |
| **Objetivo do teste**   | Verificar se o sistema solicita e registra os dados do munícipe para criar uma nova manifestação.                                        |
| **Passos**              | - Iniciar conversa com o chatbot<br>- Selecionar uma opção de atendimento<br>- Informar e-mail, nome, endereço<br>- Descrever o problema |
| **Critério de êxito**   | - Todos os dados são coletados corretamente e a manifestação é registrada ou encaminhada.                                                |
| **Responsável**         | Daniel Vitor                                                                                                          |

<br>

# CT-003 – Encaminhamento para Atendente

| Campo                   | Detalhes                                                                                                             |
| ----------------------- | -------------------------------------------------------------------------------------------------------------------- |
| **Requisito associado** | RF-008 – Encaminhamento ao atendimento humano.                                                                       |
| **Objetivo do teste**   | Verificar se o sistema encaminha corretamente o munícipe para um atendente quando necessário.                        |
| **Passos**              | - Iniciar atendimento com o chatbot<br>- Indicar um problema que exija suporte humano<br>- Aguardar redirecionamento |
| **Critério de êxito**   | - O chatbot transfere a conversa para um atendente ou fornece as instruções adequadas para contato humano.           |
| **Responsável**         | Gustavo Augusto                                                                                     |

<br>

# CT-004 – Envio de Contato da Secretaria

| Campo                   | Detalhes                                                                                                                         |
| ----------------------- | -------------------------------------------------------------------------------------------------------------------------------- |
| **Requisito associado** | RF-009 – Envio de informações de contato da secretaria.                                                                          |
| **Objetivo do teste**   | Verificar se o sistema fornece corretamente o contato da secretaria quando necessário.                                           |
| **Passos**              | - Realizar atendimento com o chatbot<br>- Indicar que o cidadão ainda não contatou a secretaria<br>- Aguardar o envio do contato |
| **Critério de êxito**   | - O sistema envia corretamente as informações de contato da secretaria competente.                                               |
| **Responsável**         | Yago de Arruda                                                                                                   |


# Ferramentas de Testes Utilizadas

- WhatsApp Business (ambiente de testes)
Utilizado para simular interações reais com os munícipes.

- Planilhas Google
Para monitoramento e registro das manifestações recebidas.

- Postman
Testes de integração com a API do WhatsApp Business.
