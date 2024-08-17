const bcrypt = require('bcrypt');
const User = require('./userModel');
const Admin = require('./adminModel'); // Import the Admin model
const nodemailer = require('nodemailer');
const config = require('./config'); // Ensure this file exists and is configured correctly

const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        user: config.EMAIL_USER,
        pass: config.EMAIL_PASS
    }
});

async function registerUser(req, res) {
    const { name, email, password } = req.body;
    try {
        const hashedPassword = await bcrypt.hash(password, 10);
        const user = new User({ name, email, password: hashedPassword });
        await user.save();
        // Send email notification to admin
        await transporter.sendMail({
            from: config.EMAIL_USER,
            to: config.ADMIN_EMAIL,
            subject: 'New User Registration',
            text: `A new user has registered with the email: ${email}.`
        });
        // Redirect with a success message
        res.redirect('/?message=' + encodeURIComponent('Registration successful!'));
    } catch (err) {
        console.error('Error during registration:', err);
        res.redirect('/?message=' + encodeURIComponent('Error registering user. Please try again.'));
    }
}

async function loginUser(req, res) {
    const { email, password } = req.body;
    try {
        const user = await User.findOne({ email });
        if (!user) {
            console.error('User not found');
            return null;
        }
        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            console.error('Password mismatch');
            return null;
        }
        return user;
    } catch (error) {
        console.error('Error during user login:', error);
        return null;
    }
}

// Mock adminLogin function
async function adminLogin(req, res) {
    const { name, password } = req.body;
    console.log('Admin login attempt:', { name, password });

    if (name === 'appu' && password === 'appu123') {
        return { _id: '66bf9a975466322204ada6e6' }; // Mock admin object
    }
    return null;
}

module.exports = { registerUser, loginUser, adminLogin };
