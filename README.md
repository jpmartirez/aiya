# AIYA - AI Chat Application

A modern AI-powered chat application built with the MERN stack, featuring image generation, text conversations, and secure payments.

#### Live Viewing : [Aiya](https://aiya-ochre.vercel.app/)

## 🚀 Tech Stack

- **Frontend**: React, Vite, Tailwind CSS, DaisyUI, PreBuiltUI
- **Backend**: Node.js, Express.js, MongoDB
- **AI Integration**: Gemini API (Google), OpenAI API
- **Image Processing**: ImageKit
- **Payments**: Stripe
- **Authentication**: JWT
- **Deployment**: Vercel

## 📋 Features

- AI-powered text conversations
- AI image generation
- User authentication and authorization
- Credit-based payment system
- Real-time chat interface
- Responsive design
- Secure payment processing

## 🛠️ Installation & Setup

### Prerequisites

- Node.js (v16 or higher)
- MongoDB
- Git

### Backend Setup

1. Navigate to the backend directory:
   ```bash
   cd backend
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Create a `.env` file in the backend directory with the following variables:
   ```env
   PORT=3000
   JWT_SECRET=your_jwt_secret_key_here
   MONGODB_URI=mongodb://localhost:27017/aiya
   GEMINI_API_KEY=your_gemini_api_key_here
   IMAGEKIT_URL_ENDPOINT=your_imagekit_url_endpoint
   IMAGEKIT_PUBLIC_KEY=your_imagekit_public_key
   IMAGEKIT_PRIVATE_KEY=your_imagekit_private_key
   STRIPE_PUBLISHABLE_KEY=your_stripe_publishable_key
   STRIPE_SECRET_KEY=your_stripe_secret_key
   STRIPE_WEBHOOK_SECRET=your_stripe_webhook_secret
   ```

4. Start the backend server:
   ```bash
   npm run server
   ```

### Frontend Setup

1. Navigate to the client directory:
   ```bash
   cd client
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Create a `.env` file in the client directory with the following variable (change this when deploy in vercel):
   ```env
   VITE_SERVER_URL=http://localhost:3000
   ```

4. Start the development server:
   ```bash
   npm run dev
   ```

## 🔧 Environment Variables

### Backend (.env)
- `JWT_SECRET`: Secret key for JWT token generation
- `MONGODB_URI`: MongoDB connection string
- `GEMINI_API_KEY`: API key for Google's Gemini AI
- `IMAGEKIT_URL_ENDPOINT`: ImageKit CDN endpoint URL
- `IMAGEKIT_PUBLIC_KEY`: ImageKit public API key
- `IMAGEKIT_PRIVATE_KEY`: ImageKit private API key
- `STRIPE_PUBLISHABLE_KEY`: Stripe publishable key for frontend
- `STRIPE_SECRET_KEY`: Stripe secret key for backend
- `STRIPE_WEBHOOK_SECRET`: Stripe webhook secret for payment verification

### Frontend (.env)
- `VITE_SERVER_URL`: Backend server URL (default: http://localhost:3000)


## 📝 API Endpoints

### Authentication
- `POST /api/user/register` - User registration
- `POST /api/user/login` - User login
- `GET /api/user/data` - Get user data
- `GET /api/user/published-images` - Get community images

### Chat
- `GET /api/chat/create` - Create new chat
- `GET /api/chat/get` - Get user chats
- `POST /api/chat/delete` - Delete chat

### Messages
- `POST /api/message/text` - Send text messages
- `POST /api/message/image` - Send image messages

### Credits & Payments
- `GET /api/credit/plan` - Get credit plans
- `POST /api/credit/purchase` - Purchase credits


## Test Payment
To test the payment system, go to [Stripe Test Cards](https://docs.stripe.com/testing#cards) to use sample card number. (Don't use real card number)

## 🙏 Credits

This project was built following the tutorials and guidance from [GreatStack](https://www.youtube.com/@GreatStackDev) on YouTube. Special thanks for the comprehensive MERN stack development tutorials.
