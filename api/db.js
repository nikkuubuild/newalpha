// Default data structure
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

let memoryDb = null;

export async function getData() {
    if (!memoryDb) {
        memoryDb = JSON.parse(JSON.stringify(defaultData));
    }
    return memoryDb;
}

export async function updateData(newData) {
    // Merge instead of replace so partial saves don't wipe fields
    if (!memoryDb) {
        memoryDb = JSON.parse(JSON.stringify(defaultData));
    }
    Object.keys(newData).forEach(key => {
        if (newData[key] !== undefined && newData[key] !== null) {
            memoryDb[key] = newData[key];
        }
    });
    return memoryDb;
}
