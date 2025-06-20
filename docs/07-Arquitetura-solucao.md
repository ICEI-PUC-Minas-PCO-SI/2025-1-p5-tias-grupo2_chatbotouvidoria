# Arquitetura da solução

<span style="color:red">Pré-requisitos: <a href="05-Projeto-interface.md"> Projeto de interface</a></span>

A arquitetura da solução descreve como os componentes da aplicação SmartOuvidoria estão organizados, sua estrutura técnica, modelo de dados e ambiente de hospedagem. A proposta busca garantir um sistema escalável, seguro e com baixo custo de manutenção.

![Arquitetura da Solução](images/arquitetura.png)

## Diagrama de classes

O diagrama de classes representa os principais elementos da aplicação. Foram definidas classes para o controle de usuários, manifestações, atendimentos, protocolos e interações automatizadas com o chatbot.


##  Modelo de dados

### Modelo ER

O Modelo ER representa, por meio de um diagrama, como as entidades (coisas, objetos) se relacionam entre si na aplicação interativa.

### Esquema relacional

O Esquema Relacional corresponde à representação dos dados em tabelas juntamente com as restrições de integridade e chave primária.
 
### Modelo físico

Insira aqui o script de criação das tabelas do banco de dados.

Veja um exemplo:

```sql
-- Criação da tabela Medico
CREATE TABLE Medico (
    MedCodigo INTEGER PRIMARY KEY,
    MedNome VARCHAR(100)
);

-- Criação da tabela Paciente
CREATE TABLE Paciente (
    PacCodigo INTEGER PRIMARY KEY,
    PacNome VARCHAR(100)
);

-- Criação da tabela Consulta
CREATE TABLE Consulta (
    ConCodigo INTEGER PRIMARY KEY,
    MedCodigo INTEGER,
    PacCodigo INTEGER,
    Data DATE,
    FOREIGN KEY (MedCodigo) REFERENCES Medico(MedCodigo),
    FOREIGN KEY (PacCodigo) REFERENCES Paciente(PacCodigo)
);

-- Criação da tabela Medicamento
CREATE TABLE Medicamento (
    MdcCodigo INTEGER PRIMARY KEY,
    MdcNome VARCHAR(100)
);

-- Criação da tabela Prescricao
CREATE TABLE Prescricao (
    ConCodigo INTEGER,
    MdcCodigo INTEGER,
    Posologia VARCHAR(200),
    PRIMARY KEY (ConCodigo, MdcCodigo),
    FOREIGN KEY (ConCodigo) REFERENCES Consulta(ConCodigo),
    FOREIGN KEY (MdcCodigo) REFERENCES Medicamento(MdcCodigo)
);
```
Esse script deverá ser incluído em um arquivo .sql na pasta [de scripts SQL](../src/db).


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
