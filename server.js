const express = require('express');
const fs = require('fs');
const path = require('path');
const app = express();

app.use(express.json());
app.use(express.static('./'));

// 读取记录
app.get('/api/records', (req, res) => {
    try {
        if (!fs.existsSync('record.txt')) {
            fs.writeFileSync('record.txt', '');
        }
        const data = fs.readFileSync('record.txt', 'utf8');
        const records = data.split('\n')
            .filter(line => line.trim())
            .map(line => {
                const [date, duration, activity] = line.split(' - ');
                return { date, duration, activity };
            });
        res.json(records);
    } catch (error) {
        res.status(500).json({ error: '读取记录失败' });
    }
});

// 保存记录
app.post('/api/records', (req, res) => {
    try {
        const { record } = req.body;
        fs.appendFileSync('record.txt', record + '\n');
        res.json({ message: '保存成功' });
    } catch (error) {
        res.status(500).json({ error: '保存记录失败' });
    }
});

const PORT = 3000;
app.listen(PORT, () => {
    console.log(`服务器运行在 http://localhost:${PORT}`);
}); 