const express = require('express');
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const userRoutes = require('./routes/registrationRoute');
const loginRouter = require('./routes/loginRoutes');
const router = express.Router();
const eventRoutes = require('./routes/eventRoutes');
const deleteEvent = require('./routes/DeleteEventRoute');
const updateEvent = require('./routes/updateEventRoutes');
const getEvent = require('./routes/getAllEvents');
const image = require('./routes/imageRoute');
const generateOtp = require('./routes/generateOtpRoutes');
const verifyOtp = require('./routes/verify-OtpRoutes');
const getEventById = require('./routes/getEventByIdRoutes');
const formidableMiddleware = require('express-formidable');
const cors = require('cors');
const bodyParser = require('body-parser');
const searchEvents = require('./routes/searchEvent');

dotenv.config();

const app = express();
const PORT = process.env.PORT || 3000;

mongoose
  .connect(process.env.DATABASE_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    console.log('database is connected');
  })
  .catch((error) => {
    console.error('Database connection error:', error);
  });

app.use(cors({ origin: true, credentials: true }));
app.use(bodyParser.json());

app.use('/user', userRoutes);
app.use('/login', loginRouter);
app.use(verifyOtp);
app.use(generateOtp);
app.use(getEventById);
app.use(eventRoutes);
app.use(getEvent);
app.use(searchEvents);
app.use(deleteEvent);
app.use(updateEvent);
app.use(image);
app.use('/uploads', express.static('uploads'));

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
