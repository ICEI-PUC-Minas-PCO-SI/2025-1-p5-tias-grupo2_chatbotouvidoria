
# Metodologia

<span style="color:red">Pré-requisitos: <a href="02-Especificacao.md"> Especificação do projeto</a></span>

A equipe adotou a metodologia ágil Scrum para organizar o desenvolvimento do projeto SmartOuvidoria, permitindo uma abordagem iterativa e colaborativa. Foram utilizados diversos ambientes e ferramentas para versionamento, controle de tarefas e gerenciamento da aplicação.


## Controle de versão

A ferramenta de controle de versão adotada no projeto foi o [Git](https://git-scm.com/), sendo que o [GitHub](https://github.com/ICEI-PUC-Minas-PCO-SI/2025-1-p5-tias-grupo2_chatbotouvidoria) foi utilizado para hospedagem do repositório.

O projeto segue a seguinte convenção para o nome de branches:

- `docs`: versão estável já testada do software
- `presentation`: versão já testada do software, porém instável
- `src`: versão em testes do software

Quanto à gerência de issues, o projeto adota a seguinte convenção para etiquetas:

- `documentation`: melhorias ou acréscimos à documentação
- `bug`: uma funcionalidade encontra-se com problemas
- `enhancement`: uma funcionalidade precisa ser melhorada
- `feature`: uma nova funcionalidade precisa ser introduzida

As features são desenvolvidas em branches próprias e submetidas via pull requests para validação. As tags são usadas para marcar versões estáveis. A equipe utilizou issues e milestones no GitHub para acompanhar o progresso do projeto em tempo real, com integrações automáticas com GitHub Projects.

## Planejamento do projeto

###  Divisão de papéis

#### Sprint 1
- _Scrum master_: Daniel Araújo
- Protótipos: Gustavo Perdigão
- Testes: Matheus Duarte
- Documentação: Michael Passos

#### Sprint 2
- _Scrum master_: Vinicius Oliveira
- Desenvolvedor _front-end_: Daniel Araújo
- Desenvolvedor _back-end_: Yago Simões
- Testes: Matheus Duarte

###  Quadro de tarefas

#### Sprint 1

Atualizado em: 20/06/2025

| Responsável      | Tarefa/Requisito                    | Iniciado em | Prazo      | Status | Terminado em |
| ---------------- | ----------------------------------- | ----------- | ---------- | ------ | ------------ |
| Daniel Araújo    | Levantamento de requisitos          | 10/03/2025  | 15/03/2025 | ✔️     | 14/03/2025   |
| Gustavo Perdigão | Protótipos da interface             | 12/03/2025  | 20/03/2025 | ✔️     | 19/03/2025   |
| Matheus Duarte   | Documentação do contexto            | 10/03/2025  | 18/03/2025 | ✔️     | 17/03/2025   |

#### Sprint 2

Atualizado em: 20/06/2025

| Responsável       | Tarefa/Requisito                    | Iniciado em | Prazo      | Status | Terminado em |
| ----------------- | ----------------------------------- | ----------- | ---------- | ------ | ------------ |
| Vinicius Oliveira | Integração com API do WhatsApp      | 01/04/2025  | 10/04/2025 | ✔️     | 08/04/2025   |
| Daniel Araújo     | Implementação do chatbot            | 01/04/2025  | 15/04/2025 | ✔️     | 13/04/2025   |
| Yago Simões       | Backend do sistema de protocolo     | 02/04/2025  | 12/04/2025 | ✔️     | 13/04/2025   |
| Matheus Duarte    | Casos de uso e documentação técnica | 03/04/2025  | 10/04/2025 | ✔️     | 13/04/2025   |



Legenda:
- ✔️: terminado
- 📝: em execução
- ⌛: atrasado
- ❌: não iniciado

### Processo

O grupo seguiu a metodologia Scrum com sprints quinzenais e reuniões semanais para acompanhamento. O quadro de tarefas foi estruturado por meio do GitHub Projects, permitindo rastrear o progresso de cada membro, vincular tarefas a issues e identificar impedimentos com antecedência.

Durante cada sprint, houve troca de papéis entre os membros para promover aprendizado coletivo e desenvolvimento de múltiplas habilidades. O backlog foi priorizado com base na criticidade funcional dos requisitos da Ouvidoria de Contagem.
 

## Relação de ambientes de trabalho

Abaixo estão listados os ambientes, plataformas e ferramentas utilizadas para desenvolvimento, colaboração e entrega do projeto:

| Ambiente                         | Plataforma      | Link de acesso                                                               |
| -------------------------------- | --------------- | ---------------------------------------------------------------------------- |
| Repositório de código fonte      | GitHub          | https://github.com/ICEI-PUC-Minas-PCO-SI/2025-1-p5-tias-grupo2_chatbotouvidoria |
| Documentos do projeto            | GitHub Wiki     | https://github.com/ICEI-PUC-Minas-PCO-SI/2025-1-p5-tias-grupo2_chatbotouvidoria |


### Ferramentas

A equipe utilizou ferramentas gratuitas e acessíveis, com foco em colaboração, agilidade e integração com o fluxo de desenvolvimento. A seguir, apresentamos a relação completa de ferramentas utilizadas no projeto:

| Ferramenta                | Finalidade                                              | Justificativa                                                          |
| ------------------------- | ------------------------------------------------------- | ---------------------------------------------------------------------- |
| **Git + GitHub**          | Versionamento de código e controle de issues            | Integração com CI/CD, boards de tarefas e documentação integrada      |
| **GitHub Projects**       | Gerenciamento de tarefas por Sprint                     | Permite organização visual em quadros estilo kanban                      |
| **WhatsApp Business API** | Canal principal de atendimento com munícipes            | Meio de comunicação mais acessível para a população de Contagem       |
| **Visual Studio Code**    | Editor de código                                        | Leve, multiplataforma e com plugins para Python e Git                         |
| **Microsoft Teams**       | Comunicação entre os membros e reuniões com a Ouvidoria | Canal oficial da equipe junto à instituição parceira                    |
| **Lucidchart / draw\.io** | Criação de diagramas UML e casos de uso                 | Ferramentas visuais para modelagem dos requisitos e fluxo de uso               |

 
