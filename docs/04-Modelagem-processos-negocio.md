# Modelagem dos processos de negócio

<span style="color:red">Pré-requisitos: <a href="02-Especificacao.md"> Especificação do projeto</a></span>

## Modelagem da situação atual (Modelagem AS IS)

Atualmente, o atendimento da Ouvidoria Geral do Município de Contagem é realizado de forma manual e descentralizada. Os munícipes entram em contato por WhatsApp, telefone ou e-mail, sendo que cada atendente precisa registrar manualmente as informações recebidas em planilhas internas.

Esse processo apresenta diversos gargalos:

- Ausência de padronização no registro de dados.

- Alto risco de perda de informações em caso de falhas técnicas (como queda de internet).

- Tempo elevado de resposta, pois as mensagens precisam ser lidas, analisadas e respondidas manualmente.

- Dificuldade no rastreamento do histórico de manifestações.

- Ações repetitivas e sobrecarga dos atendentes com demandas simples.

O processo atual não conta com automatizações e depende exclusivamente da disponibilidade dos funcionários para atender as solicitações, ocasionando atrasos em períodos de alta demanda.

## Descrição geral da proposta (Modelagem TO BE)

A proposta do projeto SmartOuvidoria é automatizar o atendimento inicial da Ouvidoria por meio de um chatbot integrado ao WhatsApp Business, que será responsável por:

- Identificar o tipo de manifestação do cidadão (reclamação, elogio, denúncia etc.).

- Coletar informações iniciais e verificar se há protocolo anterior.

- Encaminhar a solicitação para o setor competente ou para um atendente humano, caso necessário.

- Responder dúvidas frequentes automaticamente.

- Registrar e organizar os dados no banco de dados.

Limites da solução:
- O chatbot não substitui o atendimento humano para casos complexos.

- A integração com sistemas externos depende das permissões da Ouvidoria e pode ser gradual.

- O uso depende da disponibilidade de internet e de dispositivos compatíveis.

Alinhamento estratégico:
- Reduzir o tempo de resposta aos cidadãos.

- Melhorar a organização e rastreabilidade das manifestações.

- Alinhar o serviço da Ouvidoria com os princípios de eficiência, transparência e inclusão digital.

## Modelagem dos processos

# Processo 1 – Registro de manifestação via WhatsApp

## Objetivo
Permitir que o cidadão registre sua manifestação (reclamação, denúncia, elogio ou sugestão) diretamente pelo WhatsApp de forma automatizada, com coleta de dados organizada e resposta imediata.

## Participantes
- Cidadão (Munícipe)
- Chatbot (SmartOuvidoria)
- Banco de Dados

## Etapas do Processo (TO-BE)
1. O cidadão inicia a conversa com o número da Ouvidoria via WhatsApp.
2. O chatbot exibe uma mensagem de saudação e apresenta as opções de manifestação.
3. O cidadão seleciona a opção desejada (reclamação, denúncia, etc.).
4. O chatbot pergunta se já houve contato com a secretaria responsável.
5. Se sim, solicita o número de protocolo e data de abertura.
6. Verifica se o prazo do protocolo expirou.
7. Coleta os dados do cidadão (nome, e-mail, endereço).
8. Solicita a descrição detalhada da manifestação.
9. Registra todos os dados no banco.
10. Encerra com confirmação e número de atendimento (gerado automaticamente).


## Pontos fortes do processo:
- Totalmente automatizado.
- Redução de tempo de resposta.
- Estruturação e padronização das informações.
- Registro seguro e rastreável.

## Observações
- A coleta de dados sensíveis está em conformidade com a LGPD.
- A funcionalidade está limitada a usuários com acesso ao WhatsApp.


# Processo 2 – Encaminhamento para atendimento humano

## Objetivo
Garantir que manifestações mais complexas ou que não possam ser solucionadas automaticamente pelo chatbot sejam redirecionadas a um atendente humano da Ouvidoria.

## Participantes
- Chatbot (SmartOuvidoria)
- Atendente da Ouvidoria
- Cidadão (Munícipe)

## Etapas do Processo (TO-BE)
1. O chatbot recebe a manifestação do cidadão.
2. Verifica se a solicitação pode ser respondida automaticamente.
3. Caso não seja possível, identifica a necessidade de suporte humano.
4. Encaminha os dados recebidos para a interface interna do atendente.
5. Um atendente assume o atendimento e entra em contato via WhatsApp ou telefone.
6. Finaliza o atendimento e registra a conclusão no sistema.

## Benefícios do processo:
- Filtragem eficiente das manifestações.
- Redução da sobrecarga dos atendentes.
- Atendimento humano apenas quando necessário.

## Observações
- O tempo de resposta humano pode variar.
- Há registro da troca de responsável (chatbot → atendente).



## Indicadores de desempenho

| **Indicador**                   | **Objetivos**                                                | **Descrição**                                                    | **Fonte de dados**     | **Fórmula de cálculo**                                          |
| ------------------------------- | ------------------------------------------------------------ | ---------------------------------------------------------------- | ---------------------- | --------------------------------------------------------------- |
| Tempo médio de atendimento      | Reduzir o tempo de resposta ao cidadão                       | Média de tempo entre a primeira mensagem e a resposta do chatbot | Tabela de Atendimentos | soma do tempo de resposta / total de atendimentos               |
| Taxa de automatização           | Avaliar eficiência do chatbot                                | Percentual de demandas resolvidas sem intervenção humana         | Tabela de Atendimentos | (demandas automatizadas / total de demandas) \* 100             |
| Índice de satisfação do cidadão | Medir a qualidade percebida no atendimento                   | Nota de avaliação ao final do atendimento                        | Tabela de Feedbacks    | média das notas recebidas                                       |
| Reclamações por secretaria      | Identificar setores com maior número de problemas reportados | Total de reclamações por secretaria registrada no sistema        | Tabela de Reclamações  | número de reclamações / secretaria                              |
| Cumprimento de prazos           | Avaliar a eficiência na solução das manifestações            | Percentual de manifestações resolvidas dentro do prazo informado | Tabela de Protocolos   | (resolvidas no prazo / total de manifestações com prazo) \* 100 |



Obs.: Todas as informações acima estão previstas no diagrama de classes e na modelagem do banco de dados descritos no projeto técnico.
