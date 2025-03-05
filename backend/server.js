const express = require('express');
const app = express();
const PORT = process.env.PORT || 5000;

// Middleware pour traiter les requêtes JSON
app.use(express.json());

// Exemple d'endpoint
app.get('/', (req, res) => {
  res.send('Hello, welcome to Restrospective Studio backend!');
});

// Lancer le serveur
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
