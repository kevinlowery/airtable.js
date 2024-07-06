require('dotenv').config();
const Airtable = require('airtable');

// Configure Airtable
Airtable.configure({
    endpointUrl: 'https://api.airtable.com',
    apiKey: process.env.AIRTABLE_API_KEY,
});
const base = Airtable.base(process.env.AIRTABLE_BASE_ID);

// Fetch and print schema
async function fetchSchema() {
    try {
        const tables = await base('Tasks').select({ maxRecords: 1 }).firstPage();
        if (tables.length > 0) {
            const record = tables[0];
            console.log('Schema for Tasks Table:');
            Object.keys(record.fields).forEach(fieldName => {
                console.log(`Field Name: ${fieldName}`);
            });
        } else {
            console.log('No records found in the Tasks table.');
        }
    } catch (error) {
        console.error('Error fetching schema:', error);
    }
}

fetchSchema();