const mongoose = require('mongoose');

const variantSchema = new mongoose.Schema({
  size: { type: String, required: true },
  color: { type: String, required: true },
  stock: { type: Number, default: 0 }
}, { _id: false }); // on évite un _id inutile par variant

const clothingItemSchema = new mongoose.Schema({
  name: { type: String, required: true },
  description: { type: String },
  variants: [variantSchema], // 👈 nouvelle structure
  price: { type: Number, required: true },
  images: [{ type: String }],
  visible: { type: Boolean, default: true },
  createdAt: { type: Date, default: Date.now }
});


// Method to update stock
clothingItemSchema.methods.updateStock = function (quantity) {
  this.stock += quantity;
  return this.save();
};

// Method to calculate discount price
clothingItemSchema.methods.calculateDiscount = function (discountPercentage) {
  return this.price - (this.price * (discountPercentage / 100));
};

module.exports = mongoose.model('ClothingItem', clothingItemSchema);
