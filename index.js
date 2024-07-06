require('dotenv').config();
const express = require('express');
const Airtable = require('airtable');
const app = express();
const port = process.env.PORT || 3000;

// Configure Airtable
Airtable.configure({
    endpointUrl: 'https://api.airtable.com',
    apiKey: process.env.AIRTABLE_API_KEY,
});
const base = Airtable.base(process.env.AIRTABLE_BASE_ID);

// Middleware to parse JSON
app.use(express.json());

console.log('Starting server...');

// Example route to fetch records from the 'Tasks' table
app.get('/tasks', async (req, res) => {
    console.log('Received GET request on /tasks');
    try {
        const records = await base('Tasks').select({}).firstPage();
        console.log('Fetched records:', records);
        res.json(records);
    } catch (error) {
        console.error('Error fetching records:', error);
        res.status(500).json({ error: error.message });
    }
});

// Example route to create a new record in the 'Tasks' table
app.post('/tasks', async (req, res) => {
    console.log('Received POST request on /tasks');
    console.log('Request headers:', req.headers);
    console.log('Request body:', req.body);
    try {
        const record = await base('Tasks').create([{ fields: req.body }]);
        console.log('Created record:', record);
        res.json(record);
    } catch (error) {
        console.error('Error creating record:', error);
        res.status(500).json({ error: error.message });
    }
});

app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});