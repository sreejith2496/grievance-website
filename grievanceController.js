const Grievance = require('./grievanceModel');
const User = require('./userModel'); // Import User model for retrieving user information
const nodemailer = require('nodemailer');
const config = require('./config'); // Ensure this file exists and is configured correctly

// Create a transport for sending emails
const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        user: config.EMAIL_USER,
        pass: config.EMAIL_PASS
    }
});

async function submitGrievance(req, res) {
    const { type, description } = req.body;
    const userId = req.user.id;

    try {
        // Save the grievance
        const grievance = new Grievance({
            user: userId,
            type,
            description
        });
        await grievance.save();

        // Retrieve user information to include in the email
        const user = await User.findById(userId);

        // Send email notification about the grievance
        await transporter.sendMail({
            from: config.EMAIL_USER,
            to: config.ADMIN_EMAIL,
            subject: 'New Grievance Submitted',
            text: `A new grievance has been submitted.\n\nUser Email: ${user.email}\nUser ID: ${userId}\n\nType: ${type}\nDescription: ${description}`
        });

        res.redirect('/grievance?message=' + encodeURIComponent('Grievance submitted successfully.'));
    } catch (err) {
        console.error('Error submitting grievance:', err);
        res.redirect('/grievance?message=' + encodeURIComponent('Error submitting grievance. Please try again.'));
    }
}

async function getGrievances(req, res) {
    try {
        const grievances = await Grievance.find().populate('user', 'username email');
        res.render('adminDashboard', { grievances, message: {} });
    } catch (err) {
        console.error('Error retrieving grievances:', err);
        res.render('adminDashboard', { grievances: [], message: { type: 'error', text: 'Error retrieving grievances. Please try again later.' } });
    }
}

module.exports = { submitGrievance, getGrievances };
