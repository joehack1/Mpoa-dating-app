# Dating App - Full Stack Monorepo

🚀 **Complete dating application with web frontend, REST API backend, and React Native mobile app**

## Features
- ⚡ **Frontend**: Fast React app built with Vite and Chakra UI
- 🔐 **Authentication**: JWT-based user authentication
- 💰 **Payments**: M-Pesa payment integration
- 📱 **Mobile App**: React Native Expo app for iOS/Android
- 🎨 **Modern UI**: Beautiful gradient designs and responsive layouts
- 📡 **API**: RESTful backend with Express.js and MongoDB

## Project Structure
```
dating-app/
├── frontend/          # React/Vite web application
├── backend/           # Node.js/Express API server
├── mobile-app/        # React Native Expo mobile app
└── README.md
```

## Prerequisites

Before running this application, make sure you have the following installed:

- **Node.js** (v16 or higher) - [Download here](https://nodejs.org/)
- **MongoDB** (local or cloud instance like MongoDB Atlas)
- **Expo CLI** (for mobile app development)
- **Git** (for cloning the repository)

### Verify Installation
```bash
# Check Node.js and npm versions
node --version
npm --version

# Check if MongoDB is running (if using local instance)
mongod --version
```

## Installation & Setup

### 1. Clone the Repository
```bash
git clone <repository-url>
cd dating-app
```

### 2. Backend Setup
```bash
# Navigate to backend directory
cd backend

# Install dependencies
npm install

# Create environment file
cp .env.example .env

# Edit .env with your configuration
# Add your MongoDB connection string and JWT secret
```

### 3. Frontend Setup
```bash
# Navigate to frontend directory
cd ../frontend

# Install dependencies
npm install

# The frontend is configured to proxy API requests to localhost:5000
```

### 4. Mobile App Setup (Optional)
```bash
# Navigate to mobile app directory
cd ../mobile-app

# Install dependencies
npm install

# Install Expo CLI globally (if not already installed)
npm install -g expo-cli
```

## Environment Configuration

### Backend (.env)
Create a `.env` file in the `backend/` directory with:
```env
PORT=5000
MONGODB_URI=mongodb://localhost:27017/datingapp
JWT_SECRET=your-super-secret-jwt-key-here
NODE_ENV=development
```

### Frontend
The frontend automatically proxies API requests to `http://localhost:5000`. No additional configuration needed for development.

## Running the Application

### Development Mode

1. **Start the Backend Server:**
   ```bash
   cd backend
   npm start
   ```
   Server will run on `http://localhost:5000`

2. **Start the Frontend Dev Server:**
   ```bash
   cd frontend
   npm run dev
   ```
   Frontend will run on `http://localhost:5173`

3. **Start the Mobile App (Optional):**
   ```bash
   cd mobile-app
   npx expo start
   ```
   Follow the Expo instructions to run on device/emulator

### Production Build

1. **Build Frontend:**
   ```bash
   cd frontend
   npm run build
   ```

2. **Start Backend in Production:**
   ```bash
   cd backend
   npm start
   ```

## Available Scripts

### Frontend (`frontend/` directory)
```bash
npm run dev      # Start development server
npm run build    # Build for production
npm run preview  # Preview production build
```

### Backend (`backend/` directory)
```bash
npm start        # Start production server
npm run dev      # Start with nodemon (auto-restart)
```

### Mobile App (`mobile-app/` directory)
```bash
npx expo start          # Start Expo development server
npx expo start --web    # Run in web browser
npx expo start --android # Run on Android device/emulator
npx expo start --ios     # Run on iOS device/simulator
```

## API Endpoints

The backend provides the following main endpoints:

- `POST /api/auth/register` - User registration
- `POST /api/auth/login` - User login
- `GET /api/profiles/me` - Get current user profile
- `GET /api/profiles` - Get all user profiles
- `POST /api/payments/process` - Process payments

## Technologies Used

### Frontend
- **React 18** - UI library
- **Vite** - Build tool and dev server
- **Chakra UI** - Component library
- **React Router** - Client-side routing
- **Axios** - HTTP client

### Backend
- **Node.js** - Runtime environment
- **Express.js** - Web framework
- **MongoDB** - Database
- **Mongoose** - ODM for MongoDB
- **JWT** - Authentication
- **bcrypt** - Password hashing

### Mobile App
- **React Native** - Mobile framework
- **Expo** - Development platform
- **React Navigation** - Navigation library
- **AsyncStorage** - Local storage

## Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## License

This project is licensed under the MIT License - see the LICENSE file for details.

## Support

If you encounter any issues:
1. Check the troubleshooting section below
2. Open an issue on GitHub
3. Check the console for error messages

## Troubleshooting

### Common Issues

**"npm command not found"**
- Ensure Node.js is installed and added to your PATH
- Restart your terminal/command prompt

**"MongoDB connection failed"**
- Ensure MongoDB is running (if using local instance)
- Check your MONGODB_URI in the .env file

**"Port already in use"**
- Change the PORT in backend/.env
- Or kill the process using the port: `npx kill-port 5000`

**Mobile app issues**
- Ensure Expo CLI is installed globally
- Clear Expo cache: `expo r -c`

---

Happy coding! 💕