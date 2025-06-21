# Arquitetura da solução

<span style="color:red">Pré-requisitos: <a href="05-Projeto-interface.md"> Projeto de interface</a></span>

A arquitetura da solução descreve como os componentes da aplicação SmartOuvidoria estão organizados, sua estrutura técnica, modelo de dados e ambiente de hospedagem. A proposta busca garantir um sistema escalável, seguro e com baixo custo de manutenção.

![arquitdasolução](https://github.com/user-attachments/assets/8f86eb76-19b8-421c-b42b-4d43b8d6c109)

## Diagrama de classes

O diagrama de classes representa os principais elementos da aplicação. Foram definidas classes para o controle de usuários, manifestações, atendimentos, protocolos e interações automatizadas com o chatbot.

![diagramadeclasses](https://github.com/user-attachments/assets/c7e7874b-e158-4344-87dc-f7a4f201f42e)

##  Modelo de dados

### Modelo ER

![modeloER](https://github.com/user-attachments/assets/a33495b4-4ac7-4212-bcbe-9ddaff7fdb43)

### Esquema relacional

-
 
### Modelo físico

-

## Tecnologias

A tabela abaixo resume as tecnologias utilizadas na construção da solução SmartOuvidoria:

| **Dimensão**             | **Tecnologia**                      |
| ------------------------ | ----------------------------------- |
| Front-end                | JavaScript                          |
| Interface interna        | Figma (protótipo)                   |
| Chatbot                  | WhatsApp Business API               |
| Gerenciamento de projeto | GitHub Projects                     |
| Versionamento            | Git + GitHub                        |
| Hospedagem               | Servidor local                      |



## Hospedagem

-

## Qualidade de software

Com base no modelo ISO/IEC 25010, o projeto adota as seguintes subcaracterísticas como referência para assegurar qualidade no produto:

| Subcaracterística            | Justificativa                                                                 | Métricas                                           |
| ---------------------------- | ----------------------------------------------------------------------------- | -------------------------------------------------- |
| **Usabilidade**              | Necessidade de ser acessível a cidadãos com diferentes níveis de escolaridade | Taxa de conclusão de tarefas / feedback do usuário |
| **Confiabilidade**           | O sistema deve funcionar sem falhas ao registrar ou encaminhar dados          | Taxa de falhas por semana                          |
| **Segurança**                | Proteção de dados conforme LGPD                                               | N° de vazamentos / acessos indevidos               |
| **Eficiência de desempenho** | Resposta rápida às solicitações automáticas via chatbot                       | Tempo médio de resposta do bot                     |
| **Manutenibilidade**         | Facilita correções e evoluções futuras                                        | Tempo médio de resolução de bugs                   |

Esses aspectos são monitorados durante os testes de funcionalidade, testes de carga e testes de usabilidade conduzidos pela equipe.
