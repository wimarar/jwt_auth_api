const express = require('express');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const bodyParser = require('body-parser');

const app = express();
const port = process.env.PORT || 3000;

app.use(bodyParser.json());

// Secret key for JWT, keep this secret!
const secretKey = 'your_secret_key';

// In-memory database for demonstration purposes (replace with a database in a real app).
const users = [];

// Middleware to check if a request has a valid JWT token.
function authenticateToken(req, res, next) {
    const token = req.header('Authorization');
    if (!token) return res.status(401).json({ message: 'Access denied' });

    jwt.verify(token, secretKey, (err, user) => {
        if (err) return res.status(403).json({ message: 'Invalid token' });
        req.user = user;
        next();
    });
}

// Register a user
    app.post('/register', async (req, res) => {
        try {
            const { username, password } = req.body;
    
            // Check if the username already exists
            if (users.find(user => user.username === username)) {
                return res.status(400).json({ message: 'Username already exists' });
            }
    
            const hashedPassword = await bcrypt.hash(password, 10);
            const user = { username, password: hashedPassword };
            users.push(user);
            res.status(201).json({ message: 'User registered' });
        } catch (error) {
            console.error(error);
            res.status(500).json({ message: 'Failed to register user' });
        }
});

// Login and generate a JWT token
app.post('/login', async (req, res) => {
    const user = users.find(user => user.username === req.body.username);
    if (user == null) return res.status(400).json({ message: 'User not found' });

    try {
        if (await bcrypt.compare(req.body.password, user.password)) {
            const token = jwt.sign({ username: user.username }, secretKey);
            res.json({ token });
        } else {
            res.status(401).json({ message: 'Invalid password' });
        }
    } catch {
        res.status(500).json({ message: 'Login failed' });
    }
});

// Protected route that requires a valid token
app.get('/protected', authenticateToken, (req, res) => {
    res.json({ message: 'This is a protected route', user: req.user });
});

app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});
