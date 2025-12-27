import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import connectDB from './config/db.js';
import router from './routes/userRoutes.js';
import chatRouter from './routes/chatRoutes.js';
import messageRouter from './routes/messageRoutes.js';
import creditRouter from './routes/creditRoutes.js';
import { stripeWebhooks } from './controllers/webhooks.js';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 3000;

await connectDB();

// Stripe webhooks
app.post('/api/stripe', express.raw({type: 'application/json'}), stripeWebhooks);

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
app.use('/api/credit', creditRouter);


app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
})