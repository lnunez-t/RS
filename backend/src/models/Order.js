const mongoose = require('mongoose');
const orderSchema = new mongoose.Schema({
    user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    items: [
      {
        productId: { type: mongoose.Schema.Types.ObjectId, ref: 'ClothingItem' },
        name: String,
        size: String,
        color: String,
        quantity: Number,
        price: Number
      }
    ],
    shippingAddress: {
      firstName: String,
      lastName: String,
      adresse: String,
      codePostal: String,
      ville: String,
      pays: String,
      telephone: String
    },
    total: { type: Number, required: true },
    status: {
      type: String,
      enum: ['en attente', 'payée', 'expédiée', 'livrée', 'annulée'],
      default: 'en attente'
    },
    createdAt: { type: Date, default: Date.now }
  });
  

module.exports = mongoose.model('Order', orderSchema);
