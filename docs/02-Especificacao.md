# Especificação do projeto
<span style="color:red">Pré-requisitos: <a href="01-Contexto.md"> Documentação de contexto</a></span>

Definição do problema e ideia de solução a partir da perspectiva do usuário. É composta pela definição do diagrama de personas, histórias de usuários, requisitos funcionais e não funcionais além das restrições do projeto.

Apresenta-se aqui uma visão geral dos elementos que compõem a especificação do projeto SmartOuvidoria, desenvolvida para atender à demanda da Ouvidoria Geral do Município de Contagem. A análise foi feita com base em entrevistas com stakeholders, levantamento de requisitos e modelagem de casos de uso e fluxos. Foram utilizadas técnicas como análise de domínio, matriz de responsabilidades e Project Model Canvas.

# Personas
Maria Aparecida, 64 anos – Aposentada e moradora de Contagem
Maria Aparecida é uma senhora aposentada que mora sozinha em um bairro residencial de Contagem. Ela costuma entrar em contato com a prefeitura sempre que há problemas no asfalto, buracos ou lixo acumulado perto de sua rua. Apesar de não ter muita familiaridade com tecnologia, ela utiliza o WhatsApp com ajuda dos netos. Maria gostaria de registrar suas reclamações de maneira mais simples, sem precisar ligar ou se deslocar até um posto de atendimento.

João Henrique, 32 anos – Servidor Público Atendente da Ouvidoria
João trabalha há 4 anos na Ouvidoria Geral do Município de Contagem. Ele é responsável por atender ligações e e-mails dos cidadãos e registrar as manifestações no sistema interno. Ultimamente, tem se sentido sobrecarregado com a quantidade de demandas, e acredita que um sistema de chatbot ajudaria a otimizar o tempo, evitando que ele precise repetir respostas a perguntas frequentes como “qual o prazo do protocolo” ou “qual secretaria devo procurar?”.

# Histórias de usuários
Com base na análise das personas, foram identificadas as seguintes histórias de usuários:

| EU COMO... `PERSONA`   | QUERO/PRECISO ... `FUNCIONALIDADE`             | PARA ... `MOTIVO/VALOR`                                     |
| ---------------------- | ---------------------------------------------- | ----------------------------------------------------------- |
| Maria (Cidadã)         | Registrar uma manifestação via WhatsApp        | Para que minha demanda seja atendida rapidamente            |
| Maria (Cidadã)         | Receber informações automáticas sobre serviços | Para evitar ir até a prefeitura apenas para tirar dúvidas   |
| João (Atendente)       | Receber demandas classificadas pelo sistema    | Para focar apenas nos casos que realmente precisam de mim   |
| Patrícia (Funcionária) | Monitorar atendimentos feitos pelo chatbot     | Para garantir que tudo esteja sendo respondido corretamente |

# Requisitos funcionais e não funcionais

As tabelas a seguir apresentam os requisitos funcionais e não funcionais que detalham o escopo do projeto. A priorização foi realizada com base em criticidade para o funcionamento mínimo da solução.

| ID     | Descrição do Requisito                                          | Prioridade |
| ------ | --------------------------------------------------------------- | ---------- |
| RF-001 | Perguntar sobre a TAG do atendimento (ex: IPTU, capina, buraco) | Essencial  |
| RF-002 | Perguntar se houve contato com a secretaria                     | Importante |
| RF-003 | Solicitar número de protocolo                                   | Importante |
| RF-004 | Perguntar a data de abertura do protocolo                       | Importante |
| RF-005 | Perguntar a data de vencimento do protocolo                     | Importante |
| RF-006 | Solicitar nome, e-mail e endereço                               | Desejável  |
| RF-007 | Permitir descrição detalhada da manifestação                    | Desejável  |
| RF-008 | Encaminhar caso para um atendente humano                        | Essencial  |
| RF-009 | Informar contato da secretaria responsável                      | Essencial  |

| ID      | Descrição do Requisito                                                 | Prioridade |
| ------- | ---------------------------------------------------------------------- | ---------- |
| RNF-001 | Tempo de resposta do chatbot inferior a 5 segundos                     | Essencial  |
| RNF-002 | Proteção dos dados pessoais conforme a LGPD                            | Essencial  |
| RNF-003 | Suportar no mínimo 4 usuários simultâneos sem degradação de desempenho | Essencial  |
| RNF-004 | Sistema de fácil acesso e usabilidade para todos os públicos           | Essencial  |
| RNF-005 | Integração com a API oficial do WhatsApp Business                      | Essencial  |

# Restrições

| ID  | Restrição                                                                                 |
| --- | ----------------------------------------------------------------------------------------- |
| 001 | O projeto deverá ser finalizado e entregue até o final do semestre letivo de 2025         |
| 002 | A solução deve ser compatível com a infraestrutura tecnológica atual da Ouvidoria         |
| 003 | A implantação não pode depender de aquisição de servidores ou sistemas pagos de terceiros |

# Diagrama de casos de uso

![diagrama de caso de us](https://github.com/user-attachments/assets/a9f0efab-4a65-42c8-a2b8-e366c067e327)
