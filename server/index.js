const express = require('express');
const cors = require('cors');

const app = express();
const PORT = 5000;

app.use(cors());
app.use(express.json());

// Enhanced Mock Data
// Enhanced Mock Data - Empty to prioritize user creation
const groups = [];

app.get('/', (req, res) => {
  res.send('SaferSync API is Running');
});

const ecoStats = {
  co2Saved: 12.5, // kg
  fuelSaved: 5.2, // liters
  moneySaved: 450, // INR
  trees: 2, // equivalent
};

// Create Group Route
app.post('/api/groups', (req, res) => {
  const { from, to, date, time = '09:00 AM', womenOnly, mood, cost = 2500, language = 'English' } = req.body;
  const newGroup = {
    id: groups.length + 1,
    from,
    to,
    date,
    time,
    pooled: 1, // Start with just the creator
    total: 4,  // Default capacity
    womenOnly,
    mood,
    cost,
    language,
    safety: 'Standard', // Default
    vehicle: 'Pending',
    passengers: [
      { name: 'You (Creator)', gender: 'Female', mood: mood, language: 'English', safety: 'Verified', role: 'Admin' }
    ]
  };
  groups.push(newGroup);
  res.json(newGroup);
});

// Advanced Filtering Routes
app.get('/api/groups', (req, res) => {
  const {
    from, to, date,
    minCost, maxCost,
    minPool, maxPool,
    womenOnly, mood,
    language, safety
  } = req.query;

  let filtered = groups;

  // Filter Logic
  if (from) filtered = filtered.filter(g => g.from.toLowerCase().includes(from.toLowerCase()));
  if (to) filtered = filtered.filter(g => g.to.toLowerCase().includes(to.toLowerCase()));
  if (date) filtered = filtered.filter(g => g.date === date);
  if (minCost) filtered = filtered.filter(g => g.cost >= parseInt(minCost));
  if (maxCost) filtered = filtered.filter(g => g.cost <= parseInt(maxCost));
  if (minPool) filtered = filtered.filter(g => g.pooled >= parseInt(minPool));
  if (maxPool) filtered = filtered.filter(g => g.total <= parseInt(maxPool));
  if (womenOnly === 'true') filtered = filtered.filter(g => g.womenOnly);
  if (mood) filtered = filtered.filter(g => g.mood.toLowerCase() === mood.toLowerCase());
  if (language) filtered = filtered.filter(g => g.language.toLowerCase() === language.toLowerCase());
  if (safety) filtered = filtered.filter(g => g.safety.toLowerCase().includes(safety.toLowerCase()));

  res.json(filtered);
});

app.get('/api/trips/:id', (req, res) => {
  const trip = groups.find(g => g.id == req.params.id);
  if (trip) res.json(trip);
  else res.status(404).json({ message: 'Trip not found' });
});

app.get('/api/eco-impact', (req, res) => {
  res.json(ecoStats);
});

app.post('/api/payments/confirm', (req, res) => {
  const { tripId, amount } = req.body;
  res.json({ success: true, transactionId: 'TXN_' + Date.now(), amount });
});

// Mock Chat Data
let chatHistory = [
  { id: 1, text: "Hey everyone! Excited for the trip.", sender: "Alice", time: "10:00 AM", isUser: false },
  { id: 2, text: "Me too! See you at the pickup point.", sender: "Bob", time: "10:05 AM", isUser: false },
];

app.get('/api/trips/:id/chat', (req, res) => {
  res.json(chatHistory);
});

app.post('/api/trips/:id/chat', (req, res) => {
  const { text, sender } = req.body;
  const newMessage = {
    id: chatHistory.length + 1,
    text,
    sender: sender || "You",
    time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
    isUser: true
  };
  chatHistory.push(newMessage);

  // Simulate reply
  setTimeout(() => {
    chatHistory.push({
      id: chatHistory.length + 2,
      text: "Got it!",
      sender: "Driver",
      time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      isUser: false
    });
  }, 3000);

  res.json(newMessage);
});

// Live Trip Status Mock
app.get('/api/trips/:id/live', (req, res) => {
  res.json({
    status: 'In Progress',
    eta: '14 mins',
    distanceRemaining: '5.2 km',
    driverLocation: [12.9716, 77.5946], // Example coords
    driver: {
      name: 'Rajesh Kumar',
      rating: 4.8,
      vehicle: 'Toyota Innova (KA 05 MN 1234)',
      phone: '+91 98765 43210'
    },
    sosActive: false
  });
});

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
