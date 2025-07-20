const express = require('express');
const cors = require('cors');
const connectDB = require('./config/db');
const dotenv = require('dotenv');
const vendorRoutes = require('./routes/vendorRoutes');
const authRoutes = require('./routes/authRoutes');
const menuRoutes = require('./routes/menuRoutes');
const orderRoutes = require('./routes/orderRoutes');
const customerRoutes = require('./routes/customerRoutes');

dotenv.config();
connectDB();

const app = express();
app.use(cors());
app.use(express.json());

const http = require('http').createServer(app);
const { Server } = require('socket.io');
const io = new Server(http, {
    cors: {
        origin: '*',
        methods: ['GET', 'POST']
    }
});
app.set('io', io);

io.on('connection', (socket) => {
    console.log('📡 New Socket.IO connection:', socket.id);

    socket.on('joinVendorRoom', (vendorId) => {
        socket.join(vendorId);
        console.log(`🛎️ Vendor ${vendorId} joined room`);
    });

    socket.on('disconnect', () => {
        console.log('❌ Disconnected:', socket.id);
    });
});


app.use('/api/vendor', authRoutes);
app.use('/api/vendor', vendorRoutes);
app.use('/api/menu', menuRoutes);
app.use('/api/order', orderRoutes);
app.use('/api/customer', customerRoutes);

app.get('/', (req,res)=>{
    res.send("Server is running..");
});

const PORT = process.env.PORT || 5000;

http.listen(PORT, () => console.log(`🚀 Server running on port ${PORT}`));