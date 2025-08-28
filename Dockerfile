# Use uma imagem oficial do Node.js
FROM node:20-bullseye

# Defina o diretório de trabalho
WORKDIR /app

# Copie package.json e package-lock.json
COPY package*.json ./

# Instale as dependências do Node.js
RUN npm install --production

# Instale dependências do Puppeteer/Chromium no Linux
RUN apt-get update && apt-get install -y \
    gconf-service \
    libasound2 \
    libatk1.0-0 \
    libc6 \
    libcairo2 \
    libcups2 \
    libdbus-1-3 \
    libexpat1 \
    libfontconfig1 \
    libgcc1 \
    libgconf-2-4 \
    libgdk-pixbuf2.0-0 \
    libglib2.0-0 \
    libgtk-3-0 \
    libnspr4 \
    libnss3 \
    libpango-1.0-0 \
    libx11-6 \
    libx11-xcb1 \
    libxcb1 \
    libxcomposite1 \
    libxcursor1 \
    libxdamage1 \
    libxext6 \
    libxfixes3 \
    libxi6 \
    libxrandr2 \
    libxrender1 \
    libxss1 \
    libxtst6 \
    ca-certificates \
    fonts-liberation \
    libappindicator1 \
    lsb-release \
    xdg-utils \
    wget \
    curl \
    unzip \
    libgbm1 \
    && rm -rf /var/lib/apt/lists/*

# Copie todo o código da aplicação
COPY . .

# Exponha a porta que o Cloud Run usará
ENV PORT=8080
EXPOSE 8080

# Comando para rodar a aplicação
CMD ["npm", "run", "dev"]
