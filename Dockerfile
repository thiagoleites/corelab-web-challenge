# Node.js base
FROM node:16-alpine

# Diretório de trabalho dentro do container
WORKDIR /app

# Copia os arquivos de package.json e package-lock.json para o diretório de trabalho
COPY package.json .
COPY package-lock.json .

# Instala as dependências do projeto
RUN npm install

# Copia todos os arquivos do diretório atual para o diretório de trabalho
COPY . .

# Bulida aplicação React
RUN npm run build

# Defineição de porta
EXPOSE 3000

# Comando para iniciar a aplicação quando o container for iniciado
CMD ["npm", "start"]
