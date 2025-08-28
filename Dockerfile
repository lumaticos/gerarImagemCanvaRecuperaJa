# Use a imagem oficial do Node.js (LTS)
FROM node:20-slim

# Define o diretório de trabalho dentro do container
WORKDIR /app

# Copia package.json e package-lock.json
COPY package*.json ./

# Instala as dependências
RUN npm install --production

# Copia o restante do código
COPY . .

# Expõe a porta (Cloud Run usa a variável $PORT)
ENV PORT=8080
EXPOSE $PORT

# Comando para rodar o backend
CMD ["npm", "run", "dev"]
