// Upstash Redis via REST API (no npm packages needed)
const REDIS_URL = process.env.KV_REST_API_URL;
const REDIS_TOKEN = process.env.KV_REST_API_TOKEN;
const CACHE_KEY = 'alpha_cms_data';

const defaultData = {
    marqueeText: "24 HOUR SERVICE | 24 HOUR WITHDRAWAL | 24 HOUR REFILL 🔥 24/7 INSTANT WITHDRAWALS • 🏆 INDIA'S MOST TRUSTED GAMING PLATFORM • 🎰 EXCLUSIVE CASINO BONUSES • 👑 JOIN THE ELITE COMMUNITY NOW!",
    contactNumbers: ['8651381149', '7542943418', '8235817872', '9472194303'],
    emergencyNumber: '8651381149',
    countryCode: '91',
    startDeposit: 1000000,
    startWithdraw: 500000,
    logoUrl: 'assets/images/logo.png',
    headerCtaText: 'GET PREMIUM ID',
    copyrightText: '© 2011 - 2026 AlphaXchng. All Rights Reserved.',
    waButtons: [
        { icon: '🎯', title: 'GET ID 1', desc: 'Primary support line' },
        { icon: '⚡', title: 'GET ID 2', desc: 'Fast track service' },
        { icon: '🔄', title: 'GET ID 3', desc: 'Available agents' }
    ],
    sliderAssets: [
        { type: 'image', url: 'assets/images/banner-1.jpeg' },
        { type: 'image', url: 'assets/images/withdrawal-2.jpg' },
        { type: 'image', url: 'assets/images/withdrawal-3.webp' },
        { type: 'video', url: 'assets/videos/hero-cricket.mp4' }
    ],
    features: [
        { icon: '💰', title: '5% EVERY DEPOSIT', desc: 'INSTANT CREDIT' },
        { icon: '🎁', title: 'TOTAL 7% BONUS', desc: 'NEW USERS' },
        { icon: '💸', title: '2% CASH BACK', desc: 'EVERY WEEK' },
        { icon: '⚡', title: 'INSTANT WITHDRAWAL', desc: 'IN 5 MINUTES' },
        { icon: '🏏', title: '500+ GAMES', desc: 'CRICKET & MORE' },
        { icon: '🎰', title: 'LIVE CASINO', desc: '24/7 TABLES' }
    ]
};

async function redisGet(key) {
    const res = await fetch(REDIS_URL + '/get/' + key, {
        headers: { Authorization: 'Bearer ' + REDIS_TOKEN }
    });
    const json = await res.json();
    return json.result;
}

async function redisSet(key, value) {
    const res = await fetch(REDIS_URL, {
        method: 'POST',
        headers: {
            Authorization: 'Bearer ' + REDIS_TOKEN,
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(["SET", key, JSON.stringify(value)])
    });
    const json = await res.json();
    if (json.error) throw new Error(json.error);
}

module.exports.getData = async function () {
    try {
        const stored = await redisGet(CACHE_KEY);
        if (stored) {
            var parsed = typeof stored === 'string' ? JSON.parse(stored) : stored;
            return Object.assign({}, defaultData, parsed);
        }
    } catch (e) {
        console.error('Redis GET error:', e);
    }
    return JSON.parse(JSON.stringify(defaultData));
};

module.exports.updateData = async function (newData) {
    try {
        // Get existing data first
        var existing = JSON.parse(JSON.stringify(defaultData));
        try {
            var stored = await redisGet(CACHE_KEY);
            if (stored) {
                var parsed = typeof stored === 'string' ? JSON.parse(stored) : stored;
                existing = Object.assign({}, defaultData, parsed);
            }
        } catch (e) {}

        // Merge new data
        Object.keys(newData).forEach(function (key) {
            if (newData[key] !== undefined && newData[key] !== null) {
                existing[key] = newData[key];
            }
        });

        // Save to Redis
        await redisSet(CACHE_KEY, existing);
        return existing;
    } catch (e) {
        console.error('Redis SET error:', e);
        throw e;
    }
};
