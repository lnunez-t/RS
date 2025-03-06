# Variables
DOCKER_COMPOSE = docker-compose
FRONTEND_DIR = frontend
BACKEND_DIR = backend

# Lancer l'ensemble du projet
up:
	$(DOCKER_COMPOSE) up --build -d
	@echo "🚀 Projet lancé ! Accède au frontend : http://localhost:5173"

# Arrêter tous les conteneurs
down:
	$(DOCKER_COMPOSE) down
	@echo "🛑 Projet arrêté."

# Redémarrer proprement
restart: down up

# Voir les logs des services
logs:
	$(DOCKER_COMPOSE) logs -f

# Accéder au shell du conteneur backend
backend-shell:
	$(DOCKER_COMPOSE) exec backend sh

# Accéder au shell du conteneur frontend
frontend-shell:
	$(DOCKER_COMPOSE) exec frontend sh

# Accéder au shell du conteneur MongoDB
mongo-shell:
	$(DOCKER_COMPOSE) exec mongo mongosh

# Nettoyer les conteneurs et les volumes
clean:
	$(DOCKER_COMPOSE) down -v
	@echo "🧹 Nettoyage terminé."

# Lancer uniquement le frontend sans Docker
frontend:
	cd $(FRONTEND_DIR) && npm install && npm start

# Lancer uniquement le backend sans Docker
backend:
	cd $(BACKEND_DIR) && npm install && npm start
