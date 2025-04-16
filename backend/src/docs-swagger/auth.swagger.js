/**
 * @swagger
 * tags:
 *   - name: Auth
 *     description: Gestion de l'authentification et du profil utilisateur
 */

/**
 * @swagger
 * /api/auth/register:
 *   post:
 *     summary: Inscription d’un nouvel utilisateur (compte non activé tant que non vérifié)
 *     tags: [Auth]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - email
 *               - password
 *             properties:
 *               email:
 *                 type: string
 *               password:
 *                 type: string
 *     responses:
 *       201:
 *         description: Utilisateur créé, un e-mail de vérification a été envoyé
 *       400:
 *         description: L'utilisateur existe déjà
 */

/**
 * @swagger
 * /api/auth/verify-email:
 *   get:
 *     summary: Vérifie l'adresse e-mail de l'utilisateur via un lien
 *     tags: [Auth]
 *     parameters:
 *       - in: query
 *         name: token
 *         schema:
 *           type: string
 *         required: true
 *         description: Le token de vérification envoyé par e-mail
 *       - in: query
 *         name: email
 *         schema:
 *           type: string
 *         required: true
 *         description: L'adresse e-mail de l'utilisateur
 *     responses:
 *       200:
 *         description: Compte vérifié avec succès
 *       400:
 *         description: Lien invalide ou expiré
 */

/**
 * @swagger
 * /api/auth/login:
 *   post:
 *     summary: Connexion de l'utilisateur
 *     tags: [Auth]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - email
 *               - password
 *             properties:
 *               email:
 *                 type: string
 *               password:
 *                 type: string
 *     responses:
 *       200:
 *         description: Connexion réussie, retourne un token JWT
 *       400:
 *         description: Identifiants invalides
 *       403:
 *         description: Compte non vérifié

 */

/**
 * @swagger
 * /api/auth/update-infos:
 *   put:
 *     summary: Mise à jour des informations personnelles de l'utilisateur
 *     tags: [Auth]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               infosPerso:
 *                 type: object
 *                 properties:
 *                   firstName:
 *                     type: string
 *                   lastName:
 *                     type: string
 *                   entreprise:
 *                     type: string
 *                   adresse:
 *                     type: string
 *                   appartement:
 *                     type: string
 *                   codePostal:
 *                     type: string
 *                   ville:
 *                     type: string
 *                   telephone:
 *                     type: string
 *                   pays:
 *                     type: string
 *                   genre:
 *                     type: string
 *                   dateNaissance:
 *                     type: string
 *                     format: date
 *     responses:
 *       200:
 *         description: Infos mises à jour
 *       404:
 *         description: Utilisateur non trouvé
 */

/**
 * @swagger
 * /api/auth/me:
 *   get:
 *     summary: Récupérer les informations de l'utilisateur connecté
 *     tags: [Auth]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Informations de l'utilisateur
 *       404:
 *         description: Utilisateur non trouvé
 */


/**
 * @swagger
 * /api/auth/forgot-password:
 *   post:
 *     summary: Envoie un lien par e-mail pour réinitialiser le mot de passe
 *     tags: [Auth]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - email
 *             properties:
 *               email:
 *                 type: string
 *                 example: utilisateur@example.com
 *     responses:
 *       200:
 *         description: Lien envoyé par e-mail
 *       404:
 *         description: Utilisateur non trouvé
 */

/**
 * @swagger
 * /api/auth/reset-password:
 *   post:
 *     summary: Réinitialise le mot de passe avec un token
 *     tags: [Auth]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - email
 *               - token
 *               - newPassword
 *             properties:
 *               email:
 *                 type: string
 *                 example: utilisateur@example.com
 *               token:
 *                 type: string
 *                 description: Token reçu par e-mail
 *               newPassword:
 *                 type: string
 *                 description: Nouveau mot de passe
 *     responses:
 *       200:
 *         description: Mot de passe mis à jour
 *       400:
 *         description: Lien expiré ou invalide
 *       404:
 *         description: Utilisateur non trouvé
 */
