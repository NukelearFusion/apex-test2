require('dotenv').config();
const express = require('express');
const cors = require('cors');
const { google } = require('googleapis');
const bodyParser = require('body-parser');

const app = express();

app.use(bodyParser.json());

app.use(cors({
    origin: 'https://bejewelled-kashata-2949b6.netlify.app'
}));

const oAuth2Client = new google.auth.OAuth2(
    process.env.CLIENT_ID,
    process.env.CLIENT_SECRET,
    process.env.REDIRECT_URI
);
oAuth2Client.setCredentials({ refresh_token: process.env.REFRESH_TOKEN });
const gmail = google.gmail({ version: 'v1', auth: oAuth2Client });

function makeEmail(to, cc, subject, message) {
    const emailLines = [];
    emailLines.push(`To: ${to}`);
    if (cc) {
        emailLines.push(`Cc: ${cc}`);
    }
    emailLines.push('Content-Type: text/plain; charset=utf-8');
    emailLines.push('MIME-Version: 1.0');
    emailLines.push(`Subject: ${subject}`);
    emailLines.push('');
    emailLines.push(message);

    return Buffer.from(emailLines.join('\n'))
        .toString('base64')
        .replace(/\+/g, '-')
        .replace(/\//g, '_')
        .replace(/=+$/, '');
}

app.post('/send-email', async (req, res) => {
    const { fullName, email, phone, car, description, date, time } = req.body;

    const mailText = `
Jauns ieraksts no vietnes!

Vārds un uzvārds: ${fullName || ''}
E-pasts: ${email || ''}
Telefona numurs: ${phone || ''}
Auto marka: ${car || ''}
Īss situācijas apraksts: ${description || ''}
Datums: ${date || ''}
Laiks: ${time || ''}
  `.trim();

    // Pass the CC address to the helper function
    // Ensure you have CC_EMAIL defined in your .env file
    const raw = makeEmail(
        process.env.DEST_EMAIL,
        process.env.CC_EMAIL,
        'Jauns ieraksts!',
        mailText
    );

    try {
        await gmail.users.messages.send({
            userId: 'me',
            requestBody: { raw }
        });
        res.json({ message: 'E-pasts veiksmīgi nosūtīts.' });
    } catch (err) {
        console.error('Kļūda sūtīšanas laikā:', err);
        res.status(500).json({ error: 'Kļūda sūtīšanas laikā.' });
    }
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, '0.0.0.0', () => {
    console.log(`Server listening on port ${PORT}`);
});
console.log("Полученные данные:", { date, time });