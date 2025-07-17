const express = require('express');
const cors = require('cors');
const connectDB = require('./config/db');
const dotenv = require('dotenv');
const vendorRoutes = require('./routes/vendorRoutes');
const authRoutes = require('./routes/authRoutes');

dotenv.config();
connectDB();

const app = express();
app.use(cors());
app.use(express.json());

app.use('/api/vendor', authRoutes);
app.use('/api/vendor', vendorRoutes);
app.use('/api/menu', require('./routes/menuRoutes'));
app.use('/api/order', require('./routes/orderRoutes'));


app.get('/', (req,res)=>{
    res.send("Server is running..");
});

const PORT = process.env.PORT || 5000;

app.listen(PORT,()=> console.log(`Server is running on ${PORT}`));
