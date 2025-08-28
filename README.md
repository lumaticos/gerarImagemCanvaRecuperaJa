# Gerar Imagem Canva Recupera Já

Este repositório contém uma aplicação Node.js que gera imagens de relatórios escolares personalizados, utilizando os dados fornecidos em formato JSON. A aplicação utiliza o Puppeteer para renderizar o HTML em uma imagem PNG.

## Funcionalidades

* **Geração de Relatórios Personalizados**: A aplicação recebe dados em formato JSON e gera um relatório visual em HTML, que é então convertido em uma imagem PNG.
* **Utilização do Puppeteer**: O Puppeteer é utilizado para renderizar o HTML em uma imagem, garantindo alta qualidade e precisão no layout.
* **Estrutura Modular**: O código está organizado em módulos, facilitando a manutenção e a expansão da aplicação.

## Estrutura do Repositório

* `src/`: Contém o código-fonte da aplicação.
* `body.json`: Arquivo JSON de exemplo contendo os dados do aluno e das disciplinas.
* `teste.http`: Arquivo para testes de requisições HTTP, útil para testar a API localmente.
* `package.json`: Gerenciador de dependências e scripts da aplicação.
* `package-lock.json`: Arquivo gerado automaticamente que registra as versões exatas das dependências instaladas.
* `yarn.lock`: Arquivo de bloqueio de dependências para o Yarn.

## Como Utilizar

### Instalação

1. Clone o repositório:

   ```bash
   git clone https://github.com/lumaticos/gerarImagemCanvaRecuperaJa.git
   cd gerarImagemCanvaRecuperaJa
   ```

2. Instale as dependências:

   ```bash
   npm install
   ```

### Geração de Imagem

1. Certifique-se de que o arquivo `body.json` contém os dados corretos. Um exemplo de conteúdo para `body.json`:

   ```json
   {
     "aluno": "Nicole",
     "periodo": "1º Trimestre",
     "ano": "8º ano – Ensino Fundamental II",
     "disciplinas": [
       {
         "nome": "Matemática",
         "notaAtual": 6.0,
         "notaNecessaria": 7.5,
         "necessidade": "Aumento percentual de 25%",
         "risco": "Baixo risco"
       },
       {
         "nome": "Matemática 2",
         "notaAtual": 6.0,
         "notaNecessaria": 7.5,
         "necessidade": "Aumento percentual de 25%",
         "risco": "Alto risco"
       },
       {
         "nome": "Literatura",
         "notaAtual": 6.4,
         "notaNecessaria": 7.3,
         "necessidade": "Aumento percentual de 14%",
         "risco": "Risco Moderado"
       },
       {
         "nome": "Redação",
         "notaAtual": 6.73,
         "notaNecessaria": 7.54,
         "necessidade": "Aumento percentual de 12%",
         "risco": "Risco Moderado"
       },
       {
         "nome": "Língua Portuguesa",
         "notaAtual": 7.06,
         "notaNecessaria": 6.97,
         "necessidade": "Manter nota com rotina de estudos",
         "risco": "Risco Moderado"
       }
     ]
   }
   ```

2. Execute o script para subir o servidor localmente:

   ```bash
   npm run dev
   ```

  Ao chamar a rota de POST, a string base64 será gerada

## Testes

O arquivo `teste.http` contém exemplos de requisições HTTP que podem ser utilizadas para testar a API localmente. Utilize um cliente HTTP como o Postman ou Insomnia para enviar as requisições e visualizar as respostas.
