
# Projeto de interface

<span style="color:red">Pré-requisitos: <a href="02-Especificacao.md"> Especificação do projeto</a></span>

Esta seção apresenta uma visão geral das principais interfaces da plataforma SmartOuvidoria, detalhando o fluxo de interação do usuário, wireframes e telas funcionais. As interfaces foram pensadas para garantir acessibilidade, clareza e praticidade, respeitando os requisitos funcionais e não funcionais, além das histórias de usuários descritas anteriormente.


 ## User flow

O fluxo do usuário foi definido considerando a simplicidade de uso, especialmente por munícipes com pouca familiaridade com tecnologia. Todo o atendimento começa no WhatsApp, com navegação orientada por menus e respostas guiadas do chatbot.

![Userflow](https://github.com/user-attachments/assets/e535f721-73f3-46ce-a6a1-38cccb2ac94e)


### Diagrama de fluxo

![Userflow](https://github.com/user-attachments/assets/e535f721-73f3-46ce-a6a1-38cccb2ac94e)

## Wireframes

Os wireframes foram desenvolvidos no Figma para simular a experiência de interação do usuário com a interface administrativa da Ouvidoria. Embora o cidadão utilize o WhatsApp, há uma interface interna utilizada pelos atendentes e gestores para acompanhar os dados.

![wireframe](https://github.com/user-attachments/assets/634ae162-9998-4bef-a441-19455e394344)

## Interface do sistema

Visão geral da interação do usuário por meio das telas do sistema. Apresente as principais interfaces da plataforma em sua versão final.

### Tela principal do sistema

A tela principal corresponde ao WhatsApp, onde podem assumir atendimentos pendentes.


###  Telas do processo 1 - Registro da manifestação

Tela 1.1 – Início do atendimento no WhatsApp

O cidadão inicia o atendimento via WhatsApp e recebe uma saudação automática com o menu de opções.

Tela 1.2 – Coleta da manifestação

O chatbot pergunta sobre o tipo de manifestação, dados do protocolo e dados pessoais do munícipe, registrando tudo automaticamente.


### Telas do processo 2 – Encaminhamento para atendimento humano

Tela 2.1 – Identificação de necessidade de atendimento humano

Quando o chatbot não consegue atender, ele exibe uma mensagem explicando que o atendimento será realizado por um atendente.

Tela 2.2 – Interface do atendente

O atendente visualiza todas as informações coletadas pelo chatbot e continua o atendimento pelo painel administrativo ou via WhatsApp.


