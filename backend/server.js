require('dotenv').config(); // ✅ Load environment variables
const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const nodemailer = require('nodemailer');
const bcrypt = require('bcryptjs');
const { MongoClient, ObjectId } = require('mongodb');

const app = express();
app.use(cors());
app.use(bodyParser.json());

// ✅ Use environment variables
const PORT = process.env.PORT || 5000;
const mongoUrl = process.env.MONGO_URI;
const client = new MongoClient(mongoUrl, { useUnifiedTopology: true });

let usersCollection;
let callsCollection;
let messagesCollection;

client.connect()
  .then(() => {
    const db = client.db('legal_consultation');
    usersCollection = db.collection('users');
    callsCollection = db.collection('calls');
    messagesCollection = db.collection('messages');
    console.log('✅ MongoDB connected');
    app.listen(PORT, () => console.log(`🚀 Server running on http://localhost:${PORT}`));
  })
  .catch(err => console.error('❌ MongoDB connection error:', err));

// 🔐 OTP logic
const otpStore = new Map();
const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS,
  },
});

function generateOtp() {
  return Math.floor(100000 + Math.random() * 900000).toString();
}

async function sendOtpEmail(email, otp) {
  await transporter.sendMail({
    from: process.env.EMAIL_USER,
    to: email,
    subject: 'Your OTP Code',
    text: `Your OTP code is: ${otp}`,
  });
}

// 📩 OTP routes
app.post('/api/send-otp', async (req, res) => {
  const { email } = req.body;
  if (!email) return res.status(400).json({ success: false });

  const otp = generateOtp();
  otpStore.set(email, otp);

  try {
    await sendOtpEmail(email, otp);
    res.json({ success: true });
  } catch {
    res.status(500).json({ success: false });
  }
});

app.post('/api/verify-otp', (req, res) => {
  const { email, otp } = req.body;
  const stored = otpStore.get(email);
  if (stored === otp) {
    otpStore.delete(email);
    res.json({ success: true });
  } else {
    res.json({ success: false });
  }
});

// 👤 Registration
app.post('/api/register', async (req, res) => {
  const { name, email, phone, password } = req.body;
  try {
    const existing = await usersCollection.findOne({ email });
    if (existing) {
      return res.json({ success: false, message: 'Email already exists' });
    }

    const hash = await bcrypt.hash(password, 10);
    await usersCollection.insertOne({ name, email, phone, password: hash, type: 'user' });

    res.json({ success: true });
  } catch {
    res.status(500).json({ success: false });
  }
});

// 🔐 Login (admin + user)
const ADMIN = {
  email: process.env.ADMIN_EMAIL,
  password: process.env.ADMIN_PASS,
};

app.post('/api/login', async (req, res) => {
  const { email, password, type } = req.body;

  if (type === 'admin') {
    if (email === ADMIN.email && password === ADMIN.password) {
      return res.json({
        success: true,
        user: { name: 'Admin', email, type: 'admin' }
      });
    } else {
      return res.status(401).json({ success: false, message: 'Invalid admin credentials' });
    }
  }

  if (type === 'user') {
    const user = await usersCollection.findOne({ email });
    if (!user || !(await bcrypt.compare(password, user.password))) {
      return res.status(401).json({ success: false, message: 'Invalid user credentials' });
    }

    return res.json({
      success: true,
      user: { name: user.name, email, type: 'user' }
    });
  }

  return res.status(400).json({ success: false, message: 'Invalid login type' });
});

// 📅 Schedule Call
app.post('/api/schedule-call', async (req, res) => {
  const { name, email, phone, date, time, reason } = req.body;

  if (!name || !email || !phone || !date || !time) {
    return res.status(400).json({ success: false, message: 'Missing required fields' });
  }

  try {
    await callsCollection.insertOne({
      name,
      email,
      phone,
      date,
      time,
      reason,
      attended: false
    });
    res.json({ success: true });
  } catch (err) {
    console.error('❌ Error scheduling call:', err);
    res.status(500).json({ success: false });
  }
});

// 📞 Admin view calls
app.get('/api/scheduled-calls', async (req, res) => {
  try {
    const calls = await callsCollection.find({}).toArray();
    res.json({ success: true, calls });
  } catch {
    res.status(500).json({ success: false });
  }
});

app.get('/api/admin/calls', async (req, res) => {
  try {
    const calls = await callsCollection.find({}).toArray();
    res.json({ success: true, calls });
  } catch {
    res.status(500).json({ success: false });
  }
});

app.post('/api/admin/calls/mark-attended', async (req, res) => {
  const { callId, attended } = req.body;
  try {
    await callsCollection.updateOne(
      { _id: new ObjectId(callId) },
      { $set: { attended } }
    );
    res.json({ success: true });
  } catch {
    res.status(500).json({ success: false });
  }
});

// 📨 Send message
app.post('/api/messages', async (req, res) => {
  const { name, email, message } = req.body;
  if (!name || !email || !message) {
    return res.status(400).json({ success: false, message: 'Missing fields' });
  }

  try {
    await messagesCollection.insertOne({
      name,
      email,
      message,
      timestamp: new Date()
    });
    res.json({ success: true });
  } catch {
    res.status(500).json({ success: false });
  }
});

// 📬 Admin view messages
app.get('/api/messages', async (req, res) => {
  try {
    const messages = await messagesCollection.find({}).toArray();
    res.json({ success: true, messages });
  } catch {
    res.status(500).json({ success: false });
  }
});

// 👋 Fallback
app.get('/', (req, res) => {
  res.send('🛡️ Legal Consultation API Running');
});
