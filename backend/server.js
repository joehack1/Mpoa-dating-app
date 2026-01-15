const express = require('express');
const cors = require('cors');
const path = require('path');
const multer = require('multer');
require('dotenv').config();

const { initDB } = require('./database/db');

const app = express();

// Initialize local database
initDB().then(() => {
  console.log('Local database initialized');
}).catch(err => {
  console.error('Database initialization error:', err);
});

// Middleware
app.use(cors());
app.use(express.json());

// Create uploads directory
const uploadsDir = path.join(__dirname, 'uploads');
const fs = require('fs');
if (!fs.existsSync(uploadsDir)) {
  fs.mkdirSync(uploadsDir, { recursive: true });
}

// Serve uploaded files statically
app.use('/uploads', express.static(uploadsDir));

// Configure multer for file uploads
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, uploadsDir);
  },
  filename: (req, file, cb) => {
    const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
    cb(null, file.fieldname + '-' + uniqueSuffix + path.extname(file.originalname));
  }
});

const upload = multer({
  storage: storage,
  limits: {
    fileSize: 5 * 1024 * 1024 // 5MB limit
  },
  fileFilter: (req, file, cb) => {
    if (file.mimetype.startsWith('image/')) {
      cb(null, true);
    } else {
      cb(new Error('Only image files are allowed!'), false);
    }
  }
});

// Routes
app.get('/', (req, res) => {
    res.json({
        message: 'Dating App API',
        pricing: { men: '100 KSH', women: '50 KSH' }
    });
});

// Import routes
const authRoutes = require('./routes/auth');
const profileRoutes = require('./routes/profiles');
const paymentRoutes = require('./routes/payments');
const mpesaRoutes = require('./routes/mpesa');

app.use('/api/auth', authRoutes);
app.use('/api/profiles', profileRoutes);
app.use('/api/payments', paymentRoutes);
app.use('/api/mpesa', mpesaRoutes);

// File upload route
app.post('/api/upload', upload.single('profilePhoto'), (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({ error: 'No file uploaded' });
    }

    const fileUrl = `/uploads/${req.file.filename}`;
    res.json({
      message: 'File uploaded successfully',
      fileUrl: fileUrl,
      filename: req.file.filename
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
    console.log(`File uploads available at: http://localhost:${PORT}/uploads`);
});