const { MongoClient } = require('mongodb');

// Şifreli bağlantı linkimizi Vercel üzerinden güvenli şekilde çekeceğiz
const uri = process.env.MONGODB_URI;

module.exports = async (req, res) => {
    try {
        const client = new MongoClient(uri);
        await client.connect();
        
        const db = client.db('AuraLeagueDB');
        const collection = db.collection('MatchResults');
        
        // Veritabanındaki en yeni (timestamp'e göre ters sıralı) 10 maçı çekiyoruz
        const matches = await collection.find({}).sort({ timestamp: -1 }).limit(10).toArray();
        
        res.status(200).json(matches);
    } catch (error) {
        res.status(500).json({ error: "Veritabanı hatası oluştu." });
    }
};