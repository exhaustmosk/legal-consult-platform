const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const nodemailer = require('nodemailer');
const bcrypt = require('bcryptjs');
const { MongoClient, ObjectId } = require('mongodb');

const app = express();
app.use(cors());
app.use(bodyParser.json());

const PORT = 5000;
const mongoUrl = '***REMOVED***1code2blasphemy@cluster0.hamrflp.mongodb.net/?retryWrites=true&w=majority';
const client = new MongoClient(mongoUrl, { useUnifiedTopology: true });

let usersCollection;
let callsCollection;
let messagesCollection; // ✅ added

client.connect()
  .then(() => {
    const db = client.db('legal_consultation');
    usersCollection = db.collection('users');
    callsCollection = db.collection('calls');
    messagesCollection = db.collection('messages'); // ✅ initialized
    console.log('✅ MongoDB connected');
    app.listen(PORT, () => console.log(`🚀 Server at http://localhost:${PORT}`));
  })
  .catch(err => console.error('❌ DB error', err));

// OTP logic
const otpStore = new Map();
const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: '***REMOVED***',
    pass: '***REMOVED***',
  },
});

function generateOtp() {
  return Math.floor(100000 + Math.random() * 900000).toString();
}

async function sendOtpEmail(email, otp) {
  await transporter.sendMail({
    from: '***REMOVED***',
    to: email,
    subject: 'Your OTP Code',
    text: `Your OTP code is: ${otp}`,
  });
}

// OTP endpoints
app.post('/api/send-otp', async (req, res) => {
  const { email } = req.body;
  if (!email) return res.status(400).json({ success: false });

  const otp = generateOtp();
  otpStore.set(email, otp);

  try {
    await sendOtpEmail(email, otp);
    return res.json({ success: true });
  } catch {
    return res.status(500).json({ success: false });
  }
});

app.post('/api/verify-otp', (req, res) => {
  const { email, otp } = req.body;
  const stored = otpStore.get(email);
  if (stored === otp) {
    otpStore.delete(email);
    return res.json({ success: true });
  }
  return res.json({ success: false });
});

// Registration
app.post('/api/register', async (req, res) => {
  const { name, email, phone, password } = req.body;
  try {
    const existing = await usersCollection.findOne({ email });
    if (existing) {
      return res.json({ success: false, message: 'Email already exists' });
    }

    const hash = await bcrypt.hash(password, 10);
    await usersCollection.insertOne({ name, email, phone, password: hash, type: 'user' });

    return res.json({ success: true });
  } catch {
    return res.status(500).json({ success: false });
  }
});

// Admin login
const ADMIN = { email: 'a', password: 'admin123' };

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
  } else if (type === 'user') {
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

// 🗓️ Schedule Call
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
    return res.json({ success: true });
  } catch (err) {
    console.error('Error scheduling call:', err);
    return res.status(500).json({ success: false, message: 'Internal server error' });
  }
});

// 📞 Get Scheduled Calls (Admin)
app.get('/api/scheduled-calls', async (req, res) => {
  try {
    const allCalls = await callsCollection.find({}).toArray();
    return res.json({ success: true, calls: allCalls });
  } catch (err) {
    console.error('Error fetching scheduled calls:', err);
    return res.status(500).json({ success: false, message: 'Internal server error' });
  }
});

// 📞 Admin View All Calls
app.get('/api/admin/calls', async (req, res) => {
  try {
    const calls = await callsCollection.find({}).toArray();
    res.json({ success: true, calls });
  } catch (err) {
    res.status(500).json({ success: false, message: 'Failed to fetch calls' });
  }
});

// ✅ Mark Call as Attended
app.post('/api/admin/calls/mark-attended', async (req, res) => {
  const { callId, attended } = req.body;
  try {
    await callsCollection.updateOne(
      { _id: new ObjectId(callId) },
      { $set: { attended } }
    );
    res.json({ success: true });
  } catch (err) {
    res.status(500).json({ success: false, message: 'Failed to update status' });
  }
});

// 📝 Submit Message
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
    return res.json({ success: true });
  } catch (err) {
    console.error('Error saving message:', err);
    return res.status(500).json({ success: false, message: 'Server error' });
  }
});

// 📄 Admin View All Messages
app.get('/api/messages', async (req, res) => {
  try {
    const allMessages = await messagesCollection.find({}).toArray();
    return res.json({ success: true, messages: allMessages });
  } catch (err) {
    console.error('Error fetching messages:', err);
    return res.status(500).json({ success: false, message: 'Internal server error' });
  }
});
