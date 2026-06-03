import { getData, updateData } from './db.js';

export default async function handler(req, res) {
    // Add CORS headers
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS');
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');

    if (req.method === 'OPTIONS') {
        return res.status(200).end();
    }

    if (req.method === 'GET') {
        const data = await getData();
        return res.status(200).json(data);
    }

    if (req.method === 'POST') {
        const { auth, newData } = req.body;

        // Simple Admin Auth (Password: admin123)
        // In production, use process.env.ADMIN_PASSWORD
        if (auth !== 'admin123') {
            return res.status(401).json({ error: 'Unauthorized' });
        }

        const updated = await updateData(newData);
        return res.status(200).json({ success: true, data: updated });
    }

    return res.status(405).json({ error: 'Method not allowed' });
}
