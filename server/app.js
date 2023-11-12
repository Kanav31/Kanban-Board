require('dotenv').config();
const express = require('express');
const app = express();
const cors = require('cors');
const http = require('http');
const server = http.createServer(app);

const boardRoutes = require('./routes/boardRoutes')
const boardItemRoutes = require('./routes/boardItemRoutes'); 
const boardColumnRoutes = require('./routes/boardColumnRoutes');
const connectDB = require('./db/connect');

const port = process.env.PORT || 8000;

app.use(cors());
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.use('/api/v1/', boardRoutes);
app.use('/api/v1/boards/', boardColumnRoutes);
app.use('/api/v1/boards/', boardItemRoutes); 

const start = async () => {
  try {
    await connectDB(process.env.MONGO_URI);
    app.listen(port, () => console.log(`Server is listening on port ${port}...`));

    // socket.io
    const io = require('socket.io')(server, {
      pingTimeout: 60000,
      cors: {
        origin: 'http://localhost:3000',
      },
    });

    io.on('connection', (socket) => {
      console.log('Connected to socket.io');
      socket.on('disconnect', () => {
        socket.disconnect();
        console.log('A user disconnected');
      });
    });
  } catch (error) {
    console.log(error);
  }
};

start();
