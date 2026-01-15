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
- **Git** (for cloning the repository)

### Verify Installation
```bash
# Check Node.js and npm versions
node --version
npm --version
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

# The backend uses a local JSON database (no MongoDB required!)
# Data is stored in backend/database/db.json
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
The backend uses a local JSON database, so minimal configuration is needed:
```env
JWT_SECRET=your-super-secret-jwt-key-here
PORT=5000
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

## Data Storage

This application uses a **local JSON database** (LowDB) instead of MongoDB for simplicity:

- **Database file**: `backend/database/db.json`
- **Uploaded images**: Stored in `backend/uploads/`
- **No external database required** - perfect for development and small-scale use

### Database Structure
```json
{
  "users": [...],
  "payments": [...],
  "messages": [...]
}
```

All data persists locally and is automatically backed up in JSON format.

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
- **LowDB** - Local JSON database (no MongoDB required!)
- **JWT** - Authentication
- **bcrypt** - Password hashing
- **Multer** - File upload handling

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

**"Registration/Login fails"**
- Ensure the backend server is running on port 5000
- Check that the JWT_SECRET in backend/.env is set

**"File upload fails"**
- Ensure the backend/uploads directory exists and is writable
- Check file size (limited to 5MB) and type (images only)

**"Data not persisting"**
- Data is stored locally in `backend/database/db.json`
- Ensure the backend has write permissions to this file

**Mobile app issues**
- Ensure Expo CLI is installed globally
- Clear Expo cache: `expo r -c`

---

Happy coding! 💕