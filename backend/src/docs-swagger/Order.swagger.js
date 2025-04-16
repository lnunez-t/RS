/**
 * @swagger
 * tags:
 *   - name: Orders
 *     description: Gestion des commandes
 */

/**
 * @swagger
 * /orders:
 *   post:
 *     summary: Enregistrer une nouvelle commande
 *     tags: [Orders]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required: [items, total, shippingAddress]
 *             properties:
 *               items:
 *                 type: array
 *                 items:
 *                   type: object
 *                   properties:
 *                     productId:
 *                       type: string
 *                     name:
 *                       type: string
 *                     size:
 *                       type: string
 *                     color:
 *                       type: string
 *                     quantity:
 *                       type: number
 *                     price:
 *                       type: number
 *               total:
 *                 type: number
 *               shippingAddress:
 *                 type: object
 *                 properties:
 *                   firstName:
 *                     type: string
 *                   lastName:
 *                     type: string
 *                   adresse:
 *                     type: string
 *                   codePostal:
 *                     type: string
 *                   ville:
 *                     type: string
 *                   pays:
 *                     type: string
 *                   telephone:
 *                     type: string
 *     responses:
 *       201:
 *         description: Commande enregistrée
 */

/**
 * @swagger
 * /orders/me:
 *   get:
 *     summary: Voir toutes les commandes de l'utilisateur connecté
 *     tags: [Orders]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Liste des commandes de l'utilisateur
 *       401:
 *         description: Non autorisé
 */

/**
 * @swagger
 * /orders/{id}/status:
 *   put:
 *     summary: Modifier le statut d'une commande (admin uniquement)
 *     tags: [Orders]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - name: id
 *         in: path
 *         required: true
 *         description: ID de la commande à modifier
 *         schema:
 *           type: string
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required: [status]
 *             properties:
 *               status:
 *                 type: string
 *                 enum: [en attente, payée, expédiée, livrée, annulée]
 *     responses:
 *       200:
 *         description: Statut mis à jour
 *       400:
 *         description: Statut invalide
 *       404:
 *         description: Commande non trouvée
 */
/**
 * @swagger
 * /orders/search:
 *   get:
 *     summary: Rechercher des commandes par prénom ou nom du client (admin uniquement)
 *     tags: [Orders]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: query
 *         name: name
 *         required: true
 *         schema:
 *           type: string
 *         description: Nom ou prénom du client à rechercher
 *     responses:
 *       200:
 *         description: Liste des commandes trouvées
 *       400:
 *         description: Nom manquant
 */
/**
 * @swagger
 * /orders/{id}:
 *   get:
 *     summary: Récupérer une commande par ID (admin uniquement)
 *     tags: [Orders]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - name: id
 *         in: path
 *         required: true
 *         description: ID de la commande à récupérer
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Données de la commande
 *       404:
 *         description: Commande non trouvée
 *       500:
 *         description: Erreur serveur
 */

/**
 * @swagger
 * /orders/{id}:
 *   delete:
 *     summary: Supprimer une commande (admin uniquement)
 *     tags: [Orders]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - name: id
 *         in: path
 *         required: true
 *         description: ID de la commande à supprimer
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Commande supprimée
 *       404:
 *         description: Commande non trouvée
 *       500:
 *         description: Erreur serveur
 */
