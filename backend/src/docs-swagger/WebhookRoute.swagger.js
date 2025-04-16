/**
 * @swagger
 * /webhook:
 *   post:
 *     summary: Webhook Stripe – Paiement terminé
 *     description: |
 *       Utilisé par Stripe pour notifier le backend lorsqu'un paiement a été validé (checkout.session.completed).
 *       Cette route est **publique**, ne nécessite pas d'authentification, et utilise un corps brut (raw body).
 *     tags: [Orders]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             description: Données Stripe (checkout.session)
 *     responses:
 *       200:
 *         description: Webhook reçu
 *       400:
 *         description: Signature invalide
 */
