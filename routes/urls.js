const express = require('express');
const router = express();
const ShortURL = require("../models/urlDb");
const validUrl = require('valid-url');

// Create a shortened URL
router.post('/shorten', async (req, res) => {
    try {
        const { longURL } = req.body;
        if (!validUrl.isWebUri(longURL)) {
            return res.status(400).json({ error: 'Invalid URL' });
        }

        const existingURL = await ShortURL.findOne({ longURL });
        if (existingURL) {
            res.json({ shortURL: req.protocol + '://' + req.get('host') + '/api/' + existingURL.shortURL }); // //! I can ise hee {req.hostname}/ req.headers.host
        } else {
            const shortURL = new ShortURL({ longURL });
            await shortURL.save();
            res.json({ shortURL: req.protocol + '://' + req.get('host') + '/api/' + shortURL.shortURL });
        }
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Failed to shorten URL' });
    }
});



// Redirect to the original URL
router.get('/:shortURL', async (req, res) => {
    const { shortURL } = req.params;
    try {
        const url = await ShortURL.findOne({ shortURL });
        if (url) {
            res.redirect(url.longURL);
        } else {
            res.status(404).json({ error: 'URL not found' });
        }
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Failed to redirect' });
    }
});

module.exports = router;