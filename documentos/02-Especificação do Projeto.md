# Especificações do Projeto

`<span style="color:red">`Pré-requisitos: `<a href="1-Documentação de Contexto.md">` Documentação de Contexto `</a>`

Definição do problema e ideia de solução a partir da perspectiva do usuário. É composta pela definição do  diagrama de personas, histórias de usuários, requisitos funcionais e não funcionais além das restrições do projeto.

Apresente uma visão geral do que será abordado nesta parte do documento, enumerando as técnicas e/ou ferramentas utilizadas para realizar a especificações do projeto

## Arquitetura e Tecnologias

**Front-end:**

- **Framework:** Angular
- **Linguagem de Programação:** TypeScript

**Back-end:**

- **Framework:** Express.js
- **Linguagem de Programação:** TypeScript

**Banco de Dados:**

- **Sistema de Gerenciamento de Banco de Dados (SGBD):** PostgreSQL
- **ORM (Object-Relational Mapping):** Prisma

**IDE:**

- **Ambiente de Desenvolvimento Integrado:** Visual Studio Code (VSCode)

**Hospedagem**

- **Ambiente de Preview e Desenvolvimento:** Vercel
- **Ambiente de Produção:** Hostinger

## Project Model Canvas

![project-model-canvas](../documentos/img/project-model-canvas.png)

## Requisitos

As tabelas abaixo apresentam os requisitos funcionais e não funcionais da aplicação, definindo o escopo do projeto. Também, há as restrições e a maneira que utilizamos para determinar a prioridade das tarefas que serão realizadas.

### Requisitos Funcionais

| RF    | Descrição                                                                                                                       | Prioridade |
| ----- | --------------------------------------------------------------------------------------------------------------------------------- | ---------- |
| RF-01 | Autenticação de dois fatores para o login do admin                                                                              | Alta       |
| RF-02 | O sistema deverá permitir ao administrador criar artigos                                                                         | Alta       |
| RF-03 | O sistema deverá permitir ao administrador editar artigos                                                                        | Alta       |
| RF-04 | O sistema deverá permitir ao administrador excluir artigos                                                                       | Alta       |
| RF-05 | O sistema deverá permitir ao administrador realizar upload de imagens                                                            | Alta       |
| RF-06 | O sistema deverá permitir ao administrador realizar exclusão de imagens                                                         | Alta       |
| RF-07 | O sistema deverá permitir ao administrador realizar edições de imagens (colocar legenda, por exemplo)                          | Alta       |
| RF-08 | O sistema deverá permitir ao administrador criar eventos                                                                         | Alta       |
| RF-09 | O sistema deverá permitir ao administrador editar eventos                                                                        | Alta       |
| RF-10 | O sistema deverá permitir ao administrador excluir eventos                                                                       | Alta       |
| RF-11 | O sistema deverá permitir ao administrador criar informações de nutrição                                                     | Alta       |
| RF-12 | O sistema deverá permitir ao administrador editar informações de nutrição                                                    | Alta       |
| RF-13 | O sistema deverá permitir ao administrador excluir informações de nutrição                                                   | Alta       |
| RF-14 | O sistema deverá permitir ao administrador editar informações da empresa, como email, telefone, Instagram, Facebook e YouTube  | Alta       |
| RF-15 | O sistema deverá permitir ao administrador criar banners                                                                         | Alta       |
| RF-16 | O sistema deverá permitir ao administrador editar banners                                                                        | Alta       |
| RF-17 | O sistema deverá permitir ao administrador excluir banners                                                                       | Alta       |
| RF-18 | O sistema deverá incluir um cabeçalho na interface com links para as telas de artigos, nutrição, eventos, contato e doações | Média     |
| RF-19 | O sistema deverá implementar um carrossel na interface principal exibindo eventos                                                | Média     |
| RF-20 | O sistema deverá implementar um carrossel na interface principal exibindo informações de nutrição                            | Média     |
| RF-21 | O sistema deverá implementar um carrossel na interface principal exibindo artigos                                                | Média     |
| RF-22 | O sistema deverá incluir um formulário de contato para os usuários entrarem em contato com a empresa                           | Média     |
| RF-23 | O sistema deverá incluir um rodapé na interface do sistema com informações adicionais                                         | Baixa      |

### Requisitos não Funcionais

| RFN    | Descrição                                                                                        | Prioridade |
| ------ | -------------------------------------------------------------------------------------------------- | ---------- |
| RFN-01 | O sistema deve garantir segurança no login através de criptografia                               | Alta       |
| RFN-02 | O sistema deve ser responsivo, adaptando-se a diferentes dispositivos e tamanhos de tela           | Alta       |
| RFN-03 | O sistema deve ser de fácil utilização, com uma interface intuitiva e amigável                 | Alta       |
| RFN-04 | O sistema deve ter um tempo de resposta rápido para as interações do usuário                   | Alta       |
| RFN-05 | O sistema deve ser escalável, capaz de lidar com um aumento significativo no número de usuários | Alta       |
| RFN-06 | O sistema deve garantir disponibilidade, com um tempo de inatividade planejado mínimo             | Média     |
| RFN-07 | O sistema deve ser compatível com os principais navegadores web e sistemas operacionais           | Baixa      |
| RFN-08 | O sistema deve ser desenvolvido de acordo com as melhores práticas de desenvolvimento de software | Média     |
| RFN-09 | O sistema deve estar em conformidade com as regulamentações de proteção de dados e privacidade | Média     |

## Restrições

O projeto está restrito pelos itens apresentados na tabela a seguir.

| ID | Restrição                                                                                                                                      |
| -- | ------------------------------------------------------------------------------------------------------------------------------------------------ |
| 01 | O projeto deverá ser entregue até o final do semestre                                                                                          |
| 02 | A aplicação deverá ser construída por alunos do curso de Tecnologia em Análise e Desenvolvimento de Sistemas Virtual da PUCMinas, do eixo 5 |
| 03 | A plicação deverá estar no github, bem como sua documentação                                                                                |
| 04 | A aplicação deverá estar hospedada em algum provedor de domínio como hostinger, hostigator, uol, etc                                         |
| 05 | A aplicação usará Prisma como ORM, Express como framework de Node e Postgress como banco de dados. Utilizaremos Angular no frontend           |
| 06 | A aplicação não terá mobile                                                                                                                  |
| 07 | A hospedagem deverá ser doada pelo grupo                                                                                                        |

## Matriz de Rastreabilidade de Requisitos

![matrizRastreabilidade](../documentos/img/02-matriz-rastreabilidade.png)

## Diagrama de Casos de Uso

![diagrama-casos-uso](../documentos/img/diagrama-casos-uso.png)

## Modelo ER (Projeto Conceitual)

![1710087568191](img/modelo-er.png)

## Projeto da Base de Dados

![projeto-base-dados](../documentos/img/projeto-base-dados.png)
