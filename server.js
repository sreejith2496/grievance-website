const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const jwt = require('jsonwebtoken');
const { registerUser, loginUser, adminLogin } = require('./userController');
const { submitGrievance, getGrievances } = require('./grievanceController');
const authMiddleware = require('./authMiddleware');
const config = require('./config'); // Ensure this file exists and is configured correctly

const app = express();

// Middleware
app.use(bodyParser.urlencoded({ extended: true })); // Parses URL-encoded data
app.use(bodyParser.json()); // Parses JSON data
app.use(cookieParser());
app.use(express.static(__dirname)); // Serve static files from the root directory

// Set the view engine to ejs
app.set('view engine', 'ejs');
app.set('views', __dirname); // Set views directory to the root folder

// MongoDB connection
mongoose.connect('mongodb+srv://sreejithsali93:sree2496@cluster0.qcjzg.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0', {
    useNewUrlParser: true,
    useUnifiedTopology: true,
})
.then(() => console.log('MongoDB Connected...'))
.catch(err => console.log('MongoDB connection error:', err));

// Route handlers
app.get('/', (req, res) => {
    const message = req.query.message ? decodeURIComponent(req.query.message) : '';
    res.render('index', { message: { type: message.includes('successful') ? 'success' : 'error', text: message } });
});

app.post('/register', async (req, res) => {
    try {
        await registerUser(req, res);
    } catch (error) {
        console.error('Error during registration:', error);
        res.render('index', { message: { type: 'error', text: 'Error registering user. Please try again.' } });
    }
});

app.post('/login', async (req, res) => {
    try {
        const user = await loginUser(req, res);
        if (user) {
            const token = jwt.sign({ id: user._id }, config.JWT_SECRET, { expiresIn: '1h' });
            res.cookie('token', token, { httpOnly: true });
            res.redirect('/grievance');
        } else {
            res.render('index', { message: { type: 'error', text: 'Invalid email or password.' } });
        }
    } catch (error) {
        console.error('Error during user login:', error);
        res.render('index', { message: { type: 'error', text: 'Error logging in. Please try again.' } });
    }
});

app.post('/admin/login', async (req, res) => {
    try {
        const admin = await adminLogin(req, res);
        if (admin) {
            const token = jwt.sign({ id: admin._id }, config.JWT_SECRET, { expiresIn: '1h' });
            res.cookie('token', token, { httpOnly: true });
            res.redirect('/admin/dashboard');
        } else {
            res.render('index', { message: { type: 'error', text: 'Invalid admin credentials.' } });
        }
    } catch (error) {
        console.error('Error during admin login:', error);
        res.render('index', { message: { type: 'error', text: 'Error logging in as admin. Please try again.' } });
    }
});

app.get('/grievance', authMiddleware, (req, res) => {
    const messageText = req.query.message ? decodeURIComponent(req.query.message) : '';
    const messageType = messageText.includes('successfully') ? 'success' : 'error';
    res.render('grievance', { message: { type: messageType, text: messageText } });
});

app.post('/submit-grievance', authMiddleware, submitGrievance);

app.get('/admin/dashboard', authMiddleware, getGrievances);

app.get('/logout', (req, res) => {
    res.clearCookie('token');
    res.redirect('/');
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
