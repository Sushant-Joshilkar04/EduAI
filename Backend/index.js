const express = require('express');
const dotenv = require('dotenv');
const connectDB = require('./utils/config');
dotenv.config();

const userRoutes = require('./routes/user')
const pdfRoutes = require('./routes/pdfRoutes')
const chatRoutes = require('./routes/chatRoutes')
const studyRoutes = require('./routes/studyRoutes')
const speechRoutes = require('./routes/speechRoutes')

const app = express();
const PORT = process.env.PORT || 3000;
const cors = require("cors");


app.use(cors({
  origin: process.env.CLIENT_URL || "http://localhost:3000",
  credentials: true,
}));


// app.use(cors());
app.use(express.json());

connectDB();

app.use('/api/user',userRoutes);
app.use('/api/pdf',pdfRoutes);
app.use('/api/chat',chatRoutes);
app.use('/api/study',studyRoutes);
app.use('/api/speech',speechRoutes);

app.get('/', (req, res)=> {
    res.send('Welcome to Backend')
})

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});