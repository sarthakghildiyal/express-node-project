const express = require('express');
const path = require('path');
const app = express();
const port = 3000;

// Serve static files from the 'public' folder
app.use(express.static('public'));

// Basic GET route to serve the index.html
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

// Calculator functionality for addition
app.get('/calculate', (req, res) => {
    const num1 = parseFloat(req.query.num1);
    const num2 = parseFloat(req.query.num2);
    const operation = req.query.operation;

    if (isNaN(num1) || isNaN(num2)) {
        return res.status(400).send('Invalid input. Please provide two numbers.');
    }

    let result;

    switch (operation) {
        case 'add':
            result = num1 + num2;
            break;
        case 'subtract':
            result = num1 - num2;
            break;
        case 'multiply':
            result = num1 * num2;
            break;
        case 'divide':
            if (num2 === 0) {
                return res.status(400).send('Cannot divide by zero.');
            }
            result = num1 / num2;
            break;
        default:
            return res.status(400).send('Invalid operation. Use add, subtract, multiply, or divide.');
    }

    res.send(`The result of ${operation} ${num1} and ${num2} is ${result}`);
});

// Start the server
app.listen(port, () => {
    console.log(`Server running at http://localhost:${port}`);
});
