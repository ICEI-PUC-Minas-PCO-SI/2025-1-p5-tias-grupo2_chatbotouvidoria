# Registro de testes de software

<span style="color:red">Pré-requisitos: <a href="05-Projeto-interface.md"> Projeto de interface</a></span>, <a href="08-Plano-testes-software.md"> Plano de testes de software</a>

Este relatório apresenta as evidências dos testes realizados no sistema SmartOuvidoria. Os testes foram executados com base no plano previamente definido, validando o funcionamento da aplicação e garantindo a conformidade com os requisitos especificados.

# CT-001 – Saudação ao Munícipe

| Campo                     | Detalhes                                                                                         |
| ------------------------- | ------------------------------------------------------------------------------------------------ |
| **Requisito associado**   | RD-001 – O sistema deve saudar o munícipe assim que for iniciada uma nova conversa via WhatsApp. |


# CT-002 – Cadastro de Manifestação

| Campo                     | Detalhes                                                                                           |
| ------------------------- | -------------------------------------------------------------------------------------------------- |
| **Requisito associado**   | RF-006 a RF-007 – O sistema deve solicitar dados do cidadão e coletar a descrição da manifestação. |


# CT-003 – Encaminhamento para Atendente

| Campo                     | Detalhes                                                                                |
| ------------------------- | --------------------------------------------------------------------------------------- |
| **Requisito associado**   | RF-008 – O sistema deve encaminhar o usuário para atendimento humano quando necessário. |


# CT-004 – Envio de Contato da Secretaria

| Campo                     | Detalhes                                                                         |
| ------------------------- | -------------------------------------------------------------------------------- |
| **Requisito associado**   | RF-009 – O sistema deve fornecer ao cidadão o contato da secretaria responsável. |



## Avaliação

# Pontos Fortes
-Interface simples e acessível para cidadãos com baixo domínio tecnológico.

-Integração eficiente com o WhatsApp Business.

-Boa classificação e encaminhamento automático das manifestações.

# Pontos Fracos
-Algumas respostas do chatbot foram vagas em situações complexas.

-O tempo de resposta variou ligeiramente quando vários testes simultâneos foram realizados (acima de 4 usuários).

# Melhorias Sugeridas
-Aumentar a base de dados de respostas do chatbot para situações não previstas.

-Implementar um mecanismo de fallback mais robusto quando o chatbot não entender a demanda.

-Otimizar o desempenho para cenários com maior carga de usuários simultâneos.
