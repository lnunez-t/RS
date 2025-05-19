require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const swaggerUi = require('swagger-ui-express');
const swaggerSpec = require('./swagger/swagger.js');



const cors = require('cors');
const app = express();

const cookieParser = require('cookie-parser');
app.use(cookieParser());

// Autoriser les requêtes depuis localhost:3000
app.use(cors({
    origin: 'http://localhost:3000', // autoriser cette origine
    credentials: true,
    methods: ['GET', 'POST','PUT', 'DELETE'], // autoriser certaines méthodes
    allowedHeaders: ['Content-Type'], // autoriser certains headers
}));


mongoose.connect(process.env.MONGO_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
.then(() => console.log('✅ Connected to MongoDB Atlas'))
.catch(err => console.error('❌ MongoDB connection error:', err));


app.get('/', (req, res) => {
  res.send('Hello World!');
});

const PORT = process.env.PORT || 4338;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));

app.use('/webhook', require('./routes/WebhookRoute'));
// ... (déjà existant)
app.use(express.json());
const authRoutes = require('./routes/auth');
app.use('/api/auth', authRoutes);

const clothingRoutes = require('./routes/ClothingRoutes');
app.use('/clothing', clothingRoutes);

const userAdminRoutes = require('./routes/AdminRoute');
app.use('/useradmin', userAdminRoutes);

const contactRoutes = require('./routes/ContactRoutes');
app.use('/api/contact', contactRoutes);

const orderRoutes = require('./routes/OrderRoutes');
app.use('/orders', orderRoutes);

// ⚠️ À NE PAS PARSER avec express.json()


// Ensuite seulement



// Swagger route
require('./swagger/swagger.js')(app);