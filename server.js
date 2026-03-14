const express = require('express');
const multer = require('multer');
const { execFile } = require('child_process');
const fs = require('fs');
const os = require('os');
const path = require('path');

const app = express();
const upload = multer({ dest: os.tmpdir() });

app.post('/obfuscate', upload.single('file'), (req, res) => {
    const preset = req.body.preset;
    const file = req.file;

    if (!preset || !file) return res.status(400).json({ error: 'Missing preset or file' });

    const inputPath = file.path;
    const outputPath = inputPath.replace('.lua', '_obf.lua');

    // Run Prometheus wrapper
    execFile('prometheus', [preset, inputPath, outputPath], (err) => {
        if (err) return res.status(500).json({ error: err.message });

        const obfCode = fs.readFileSync(outputPath, 'utf8');

        fs.unlinkSync(inputPath);
        fs.unlinkSync(outputPath);

        res.type('text/plain').send(obfCode);
    });
});

const PORT = process.env.PORT || 10000;
app.listen(PORT, () => console.log(`API running on port ${PORT}`));
