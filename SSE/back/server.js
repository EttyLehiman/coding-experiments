const express = require('express');
const app = express();
const cors = require('cors');

const PORT = 3000;

app.use(cors());

app.get('/time', (req, res) => {
    // קביעת כותרות SSE
    res.setHeader('Content-Type', 'text/event-stream');
    res.setHeader('Cache-Control', 'no-cache');
    res.setHeader('Connection', 'keep-alive');

    // שליחת הזמן הנוכחי בכל שניה
    const interval = setInterval(() => {
        const currentTime = new Date().toLocaleTimeString();
        res.write(`data: ${currentTime}\n\n`);
    }, 1000);

    // ניתוק הלקוח יפסיק את השליחה
    req.on('close', () => {
        clearInterval(interval);
        res.end();
    });
});

app.listen(PORT, () => {
    console.log(`Server is running at http://localhost:${PORT}`);
});
