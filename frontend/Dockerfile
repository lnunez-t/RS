# frontend/Dockerfile
FROM node:20-alpine

# Créer un dossier de travail dans le conteneur
WORKDIR /app

# Copier les fichiers nécessaires
COPY package.json package-lock.json* ./
RUN npm install

# Copier tout le reste
COPY . .

# Construire l'application Next.js
RUN npm run build

EXPOSE 3000

# Lancer l'application en production
CMD ["npm", "run", "dev"]
