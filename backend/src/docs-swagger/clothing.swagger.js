/**
 * @swagger
 * tags:
 *   - name: Clothing
 *     description: Gestion des vêtements (admin)
 */

/**
 * @swagger
 * /clothing:
 *   post:
 *     summary: Ajouter un vêtement (admin uniquement)
 *     tags: [Clothing]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - name
 *               - price
 *               - variants
 *             properties:
 *               name:
 *                 type: string
 *               description:
 *                 type: string
 *               price:
 *                 type: number
 *               images:
 *                 type: array
 *                 items:
 *                   type: string
 *               variants:
 *                 type: array
 *                 items:
 *                   type: object
 *                   properties:
 *                     size:
 *                       type: string
 *                     color:
 *                       type: string
 *                     stock:
 *                       type: number
 *     responses:
 *       201:
 *         description: Vêtement ajouté avec succès
 *       401:
 *         description: Token invalide
 *       403:
 *         description: Accès interdit (non-admin)
 */

/**
 * @swagger
 * /clothing/all_clothing:
 *   get:
 *     summary: Récupérer tous les vêtements, avec filtres possibles
 *     tags: [Clothing]
 *     parameters:
 *       - in: query
 *         name: size
 *         schema:
 *           type: string
 *         description: Taille (ex. S, M, L)
 *       - in: query
 *         name: color
 *         schema:
 *           type: string
 *         description: Couleur
 *       - in: query
 *         name: inStock
 *         schema:
 *           type: string
 *           enum: [true]
 *         description: Si true, ne retourne que les variantes avec stock > 0
 *       - in: query
 *         name: sort
 *         schema:
 *           type: string
 *           enum: [new, name, price, -price]
 *         description: Tri des résultats (nouveauté, nom, prix)
 *       - in: query
 *         name: page
 *         schema:
 *           type: integer
 *         description: Page à afficher (défaut 1)
 *       - in: query
 *         name: limit
 *         schema:
 *           type: integer
 *         description: Nombre d’éléments par page (défaut 10)
 *       - in: query
 *         name: search
 *         schema:
 *           type: string
 *         description: Rechercher un vêtement par nom (ex: "t-shirt")
 *     responses:
 *       200:
 *         description: Liste des vêtements
 */

/**
 * @swagger
 * /clothing/{id}:
 *   put:
 *     summary: Modifier un vêtement (admin uniquement)
 *     tags: [Clothing]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: ID du vêtement à modifier
 *     requestBody:
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *               description:
 *                 type: string
 *               price:
 *                 type: number
 *               images:
 *                 type: array
 *                 items:
 *                   type: string
 *               variants:
 *                 type: array
 *                 items:
 *                   type: object
 *                   properties:
 *                     size:
 *                       type: string
 *                     color:
 *                       type: string
 *                     stock:
 *                       type: number
 *     responses:
 *       200:
 *         description: Vêtement mis à jour
 *       404:
 *         description: Vêtement non trouvé
 */

/**
 * @swagger
 * /clothing/{id}:
 *   delete:
 *     summary: Supprimer un vêtement (admin uniquement)
 *     tags: [Clothing]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: ID du vêtement à supprimer
 *     responses:
 *       200:
 *         description: Vêtement supprimé avec succès
 *       404:
 *         description: Vêtement non trouvé
 */

/**
 * @swagger
 * /clothing/{id}:
 *   get:
 *     summary: Récupérer un vêtement par ID
 *     tags: [Clothing]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: ID du vêtement à récupérer
 *     responses:
 *       200:
 *         description: Données du vêtement
 *       404:
 *         description: Vêtement non trouvé
 */
