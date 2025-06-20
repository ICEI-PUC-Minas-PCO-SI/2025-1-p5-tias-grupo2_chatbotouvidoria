# Plano de testes de software

<span style="color:red">Pré-requisitos: <a href="02-Especificacao.md">Especificação do projeto</a></span>, <a href="05-Projeto-interface.md">Projeto de interface</a>

Este plano tem como objetivo validar os requisitos definidos para a aplicação SmartOuvidoria, garantindo que o chatbot para atendimento à Ouvidoria Geral de Contagem funcione conforme esperado em diferentes situações de uso.

A seguir, estão descritos os principais casos de teste planejados com base nos requisitos funcionais e não funcionais do projeto.

Por exemplo:

| **Caso de teste**  | **CT-001 – Saudação ao munícipe**  |
|:---: |:---: |
| Requisito associado | RD-001 - A aplicação deve apresentar, na página principal, a funcionalidade de cadastro de usuários para que estes consigam criar e gerenciar seu perfil. |
| Objetivo do teste | Verificar se o usuário consegue se cadastrar na aplicação. |
| Passos | - Acessar o navegador <br> - Informar o endereço do site https://adota-pet.herokuapp.com/src/index.html <br> - Clicar em "Criar conta" <br> - Preencher os campos obrigatórios (e-mail, nome, sobrenome, celular, CPF, senha, confirmação de senha) <br> - Aceitar os termos de uso <br> - Clicar em "Registrar" |
| Critério de êxito | - O cadastro foi realizado com sucesso. |
| Responsável pela elaboração do caso de teste | Nome do integrante da equipe. |

<br>

| **Caso de teste**  | **CT-002 – Efetuar login**  |
|:---: |:---: |
| Requisito associado | RF-00Y - A aplicação deve possuir opção de fazer login, sendo o login o endereço de e-mail. |
| Objetivo do teste | Verificar se o usuário consegue realizar login. |
| Passos | - Acessar o navegador <br> - Informar o endereço do site https://adota-pet.herokuapp.com/src/index.html <br> - Clicar no botão "Entrar" <br> - Preencher o campo de e-mail <br> - Preencher o campo de senha <br> - Clicar em "Login" |
| Critério de êxito | - O login foi realizado com sucesso. |
| Responsável pela elaboração do caso de teste | Nome do integrante da equipe. |


## Ferramentas de testes (opcional)

# Ferramentas de Testes Utilizadas
WhatsApp Business em ambiente de testes para simular interações reais com munícipes.

Planilhas Google para monitoramento de manifestações registradas automaticamente.

Postman para testes de integração com a API do WhatsApp Business.

Cronômetro (manual ou ferramentas como JMeter) para medir o tempo de resposta do chatbot.
