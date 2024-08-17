const mongoose = require('mongoose');
const bcrypt = require('bcrypt');

// Replace with your MongoDB connection string
const mongoURI = 'mongodb+srv://sreejithsali93:sree2496@cluster0.qcjzg.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0';

// Admin details
const adminName = 'sreejith';
const adminPassword = 'sree2496'; // Plain text password

// Connect to MongoDB
mongoose.connect(mongoURI, {
    useNewUrlParser: true,
    useUnifiedTopology: true
})
.then(async () => {
    console.log('MongoDB connected...');

    // Hash the admin password
    const hashedPassword = await bcrypt.hash(adminPassword, 10);

    // Admin model
    const adminSchema = new mongoose.Schema({
        name: { type: String, required: true },
        password: { type: String, required: true }
    });

    const Admin = mongoose.model('Admin', adminSchema);

    // Insert admin
    const admin = new Admin({
        name: adminName,
        password: hashedPassword
    });

    await admin.save();
    console.log('Admin inserted successfully!');

    // Close the connection
    mongoose.connection.close();
})
.catch(err => {
    console.error('Error connecting to MongoDB:', err);
});
