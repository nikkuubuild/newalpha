const { getData, updateData } = require('./db.js');

module.exports = async function handler(req, res) {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS');
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

    if (req.method === 'OPTIONS') {
        return res.status(200).end();
    }

    if (req.method === 'GET') {
        try {
            const data = await getData();
            return res.status(200).json(data);
        } catch (e) {
            return res.status(500).json({ error: 'Failed to load data' });
        }
    }

    if (req.method === 'POST') {
        const { auth, newData } = req.body;
        if (auth !== 'admin123') {
            return res.status(401).json({ error: 'Unauthorized' });
        }
        try {
            const updated = await updateData(newData);
            return res.status(200).json({ success: true, data: updated });
        } catch (e) {
            console.error('Save error:', e);
            return res.status(500).json({ error: 'Failed to save data', detail: e.message });
        }
    }

    return res.status(405).json({ error: 'Method not allowed' });
};
