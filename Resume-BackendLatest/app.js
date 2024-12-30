require('dotenv').config();
const express = require('express');
const session = require('express-session');
const cors = require('cors');
const passport = require('passport');
const http = require('http'); 
const { Server } = require('socket.io'); 
const connectDB = require('./config/db');
const mainRoutes = require('./routes/mainRoutes');
const app = express();
const server = http.createServer(app); 
const io = new Server(server, { cors: { origin: '*' } }); 
const path = require('path');
connectDB();



app.use(cors());
app.use(express.json());
app.use(session({ secret: 'your_secret_key', resave: false, saveUninitialized: false }));
app.use(passport.initialize());
app.use(passport.session());

require('./config/passport');

app.use('/api', require('./routes/auth'));
app.use('/api', require('./routes/resumeRoute'));
app.use('/api', mainRoutes);
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

app.use((err, req, res, next) => {
  console.error(err);
  res.status(500).json({ message: 'An error occurred' });
});

const PORT = process.env.PORT || 5000;
server.listen(PORT, () => console.log(`Server running on port ${PORT}`));
