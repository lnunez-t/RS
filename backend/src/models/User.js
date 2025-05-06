const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');

const userSchema = new mongoose.Schema({
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },

  infosPerso: {
    firstName: { type: String },
    lastName: { type: String },
    entreprise: { type: String },
    adresse: { type: String },
    appartement: { type: String },
    codePostal: { type: String },
    ville: { type: String },
    telephone: { type: String },
    pays: { type: String },
    genre: { type: String },
    dateNaissance: {type: Date}
  },
  isVerified: {
    type: Boolean,
    default: false
  },
  emailVerifyToken: String,  

  role: { type: String, enum: ['user', 'admin'], default: 'user' },
  createdAt: { type: Date, default: Date.now },
  resetPasswordToken: String,     // 👈 ici
  resetPasswordExpires: Date  
});

// Hash du mot de passe avant sauvegarde
userSchema.pre('save', async function (next) {
  if (!this.isModified('password')) return next();
  this.password = await bcrypt.hash(this.password, 10);
  next();
});

module.exports = mongoose.model('User', userSchema);
