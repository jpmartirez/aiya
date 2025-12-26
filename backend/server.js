import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import connectDB from './config/db.js';
import router from './routes/userRoutes.js';
import chatRouter from './routes/chatRoutes.js';
import messageRouter from './routes/messageRoutes.js';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 3000;

await connectDB();

//Middleware
app.use(cors());
app.use(express.json());

//Routes
app.get('/', (req, res) => {
    res.send('Server is running');
})
app.use('/api/user', router);
app.use('/api/chat', chatRouter);
app.use('/api/message', messageRouter)

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
})