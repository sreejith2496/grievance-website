const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const Admin = require('./adminModel');
const config = require('./config');

mongoose.connect('mongodb+srv://sreejithsali93:sree2496@cluster0.qcjzg.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0', {
    useNewUrlParser: true,
    useUnifiedTopology: true,
})
.then(async () => {
    console.log('MongoDB Connected...');
    
    // Admin credentials
    const adminName = 'appu'; // Replace with your admin name
    const adminPassword = 'appu123'; // Replace with your admin password

    // Hash the password
    const hashedPassword = await bcrypt.hash(adminPassword, 10);

    // Create a new admin
    const admin = new Admin({
        name: adminName,
        password: hashedPassword
    });

    // Save the admin
    await admin.save();
    console.log('Admin user created with hashed password.');
    mongoose.connection.close();
})
.catch(err => console.log('MongoDB connection error:', err));
