# Amigo de Patas

## Sobre o Projeto

O projeto **Amigo de Patas** é uma aplicação web desenvolvida em Angular, com o objetivo de conectar animais necessitados de adoção com potenciais adotantes. A plataforma oferece uma interface intuitiva para visualizar animais disponíveis, detalhes sobre cada um, formulários de contato e adoção, além de informações sobre como se tornar um voluntário.

Este repositório contém o código-fonte da parte frontend da aplicação, construída com foco em responsividade, usabilidade e uma experiência de usuário agradável.

**A "Amigo de Patas" é uma ONG fictícia criada para esse projeto**

## Tecnologias Utilizadas

O projeto foi desenvolvido utilizando as seguintes tecnologias:

*   **Angular**: Framework para construção de aplicações web dinâmicas e de página única.
    *   Versão: 19.2.15
*   **TypeScript**: Linguagem de programação que adiciona tipagem estática ao JavaScript.
*   **Tailwind CSS**: Framework CSS utilitário para estilização rápida e responsiva.
*   **ngx-mask**: Biblioteca para aplicação de máscaras em campos de formulário.
*   **Lucide Angular**: Biblioteca de ícones para Angular.
*   **JSON Server**: Utilizado para simular uma API RESTful para desenvolvimento e testes.

## Estrutura do Projeto

A estrutura do projeto segue as convenções do Angular, com módulos e componentes bem organizados:

```
Amigo-de-Patas-Front/
├── public/                  # Ativos públicos (imagens, etc.)
├── src/
│   ├── app/
│   │   ├── components/      # Componentes reutilizáveis
│   │   │   ├── adoption-form/ # Formulário de adoção
│   │   │   ├── animal-card/   # Cartão de exibição de animal
│   │   │   ├── footer/        # Rodapé da aplicação
│   │   │   └── header/        # Cabeçalho da aplicação
│   │   ├── models/          # Definições de modelos de dados
│   │   ├── pages/           # Páginas principais da aplicação
│   │   │   ├── animais/       # Lista de animais
│   │   │   ├── animal-detalhes/ # Detalhes de um animal específico
│   │   │   ├── contato/       # Página de contato
│   │   │   ├── home/          # Página inicial
│   │   │   ├── sobre/         # Página 'Sobre Nós'
│   │   │   └── voluntario/    # Página para voluntários
│   │   ├── service/         # Serviços para comunicação com a API
│   │   └── ...
│   ├── environments/        # Configurações de ambiente
│   └── ...
├── angular.json             # Configuração do Angular CLI
├── package.json             # Dependências e scripts do projeto
└── README.md                # Este arquivo
```

## Páginas da Aplicação

A aplicação é composta pelas seguintes páginas principais, localizadas em `src/app/pages/`:

*   **Home (`/home`)**: A página inicial da aplicação, servindo como porta de entrada para os usuários. Apresenta uma visão geral do projeto, animais em destaque e chamadas para ação para adoção ou voluntariado.
*   **Animais (`/animais`)**: Exibe uma lista completa de todos os animais disponíveis para adoção. Os usuários podem navegar, filtrar e buscar animais com base em diversos critérios, como espécie, raça, idade e localização.
*   **Detalhes do Animal (`/animal-detalhes/:id`)**: Uma página dedicada a cada animal, onde são apresentadas informações detalhadas, incluindo galeria de fotos, descrição completa, histórico, temperamento e requisitos para adoção. Inclui um botão para iniciar o processo de adoção.
*   **Contato (`/contato`)**: Oferece um formulário para que os usuários possam entrar em contato com a equipe do Amigo de Patas para dúvidas, sugestões ou outras informações.
*   **Sobre Nós (`/sobre`)**: Detalha a missão, visão, valores e a história da organização Amigo de Patas, promovendo a transparência e a conexão com a causa.
*   **Voluntário (`/voluntario`)**: Uma página informativa para aqueles que desejam se juntar à causa como voluntários. Contém informações sobre as atividades de voluntariado e um formulário de inscrição para interessados.

## Componentes Reutilizáveis

Os componentes reutilizáveis, localizados em `src/app/components/`, são elementos modulares da interface do usuário que promovem a consistência e a eficiência no desenvolvimento:

*   **Header**: O cabeçalho da aplicação, presente em todas as páginas. Contém o logotipo do Amigo de Patas, a navegação principal (links para Home, Animais, Contato, Sobre, Voluntário) e, possivelmente, elementos de interação como um botão de login/perfil.
*   **Footer**: O rodapé da aplicação, também presente em todas as páginas. Inclui informações de contato, links para redes sociais, política de privacidade, termos de uso e direitos autorais.
*   **Animal Card (`animal-card/`)**: Um componente de cartão que exibe um resumo conciso das informações de um animal. Ideal para listagens, inclui a foto do animal, nome, espécie e um link rápido para a página de detalhes.
*   **Adoption Form (`adoption-form/`)**: Um formulário abrangente para que os usuários interessados possam formalizar sua intenção de adotar um animal. Coleta informações essenciais do adotante e pode incluir validações e máscaras de entrada para garantir a qualidade dos dados.

## Como Rodar o Projeto Localmente

Para configurar e rodar o projeto em sua máquina local, siga os passos abaixo:

### Pré-requisitos

Certifique-se de ter as seguintes ferramentas instaladas:

*   **Node.js** (versão LTS recomendada)
*   **npm** (gerenciador de pacotes do Node.js)
*   **Angular CLI** (instale globalmente com `npm install -g @angular/cli`)

### Instalação e Execução

1.  **Clone o repositório:**

    ```bash
    git clone https://github.com/GabrielNunes5/Amigo-de-Patas-Front.git
    cd Amigo-de-Patas-Front
    ```

2.  **Instale as dependências:**

    ```bash
    npm install
    ```

3.  **Inicie o servidor de desenvolvimento:**

    ```bash
    ng serve
    ```

    Navegue para `http://localhost:4200/` em seu navegador. A aplicação será recarregada automaticamente sempre que você modificar qualquer arquivo-fonte.

4.  **(Opcional) Inicie a simulação de API:**

    Este projeto utiliza `json-server` para simular uma API RESTful. Para iniciar o servidor JSON, execute em um novo terminal:

    ```bash
    npm run json-server
    ```

## Licença

Este projeto está licenciado sob a licença MIT.

## Autor

**Gabriel Nunes**
*   [GitHub](https://github.com/GabrielNunes5)
*   [Linkedin](https://www.linkedin.com/in/gabriel-nunes-085gn/)