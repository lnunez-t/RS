const mongoose = require('mongoose');

const promoCodeSchema = new mongoose.Schema({
  code: { type: String, required: true, unique: true },
  discountType: { type: String, enum: ['percent', 'amount'], required: true },
  value: { type: Number, required: true },
  expiresAt: { type: Date },
  usageLimit: { type: Number }, // nombre total de fois qu'il peut être utilisé
  usedCount: { type: Number, default: 0 }, // nombre de fois utilisé
  active: { type: Boolean, default: true }
}, { timestamps: true });

module.exports = mongoose.model('PromoCode', promoCodeSchema);
