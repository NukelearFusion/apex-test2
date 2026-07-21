require('dotenv').config();
const express = require('express');
const cors = require('cors');
const { google } = require('googleapis');
const bodyParser = require('body-parser');
const multer = require('multer'); // Добавили multer для работы с файлами

const app = express();

app.use(bodyParser.json());

app.use(cors({
    origin: ['https://bejewelled-kashata-2949b6.netlify.app', 'http://localhost:3000', 'http://localhost:3001']
}));

// Настраиваем Multer для хранения загруженных файлов в оперативной памяти (buffer)
const upload = multer({ storage: multer.memoryStorage() });

const oAuth2Client = new google.auth.OAuth2(
    process.env.CLIENT_ID,
    process.env.CLIENT_SECRET,
    process.env.REDIRECT_URI
);
oAuth2Client.setCredentials({ refresh_token: process.env.REFRESH_TOKEN });
const gmail = google.gmail({ version: 'v1', auth: oAuth2Client });

// Обновленная функция, которая умеет отправлять письма с вложениями
function makeEmail(to, cc, subject, message, file = null) {
    const boundary = '----=_NextPart_Boundary_' + Date.now().toString(16);
    const emailLines = [];

    emailLines.push(`To: ${to}`);
    if (cc) {
        emailLines.push(`Cc: ${cc}`);
    }
    emailLines.push('MIME-Version: 1.0');
    emailLines.push(`Subject: ${subject}`);
    emailLines.push(`Content-Type: multipart/mixed; boundary="${boundary}"`);
    emailLines.push('');

    // Текстовая часть письма
    emailLines.push(`--${boundary}`);
    emailLines.push('Content-Type: text/plain; charset=utf-8');
    emailLines.push('');
    emailLines.push(message);
    emailLines.push('');

    // Если есть файл, добавляем его как вложение
    if (file) {
        emailLines.push(`--${boundary}`);
        emailLines.push(`Content-Type: ${file.mimetype}; name="${file.originalname}"`);
        emailLines.push('Content-Transfer-Encoding: base64');
        emailLines.push(`Content-Disposition: attachment; filename="${file.originalname}"`);
        emailLines.push('');
        emailLines.push(file.buffer.toString('base64')); // Кодируем сам файл
        emailLines.push('');
    }

    emailLines.push(`--${boundary}--`);

    return Buffer.from(emailLines.join('\r\n'))
        .toString('base64')
        .replace(/\+/g, '-')
        .replace(/\//g, '_')
        .replace(/=+$/, '');
}

// Старый маршрут для формы записи (без изменений)
app.post('/send-email', async (req, res) => {
    const { fullName, email, phone, car, description, date, time } = req.body;
    console.log("Полученные данные:", { date, time });

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

// НОВЫЙ маршрут для формы продажи авто (с картинкой)
app.post('/send-shop', upload.single('photo'), async (req, res) => {
    try {
        const { name, phone, carInfo, description } = req.body;
        const photo = req.file; // Файл из формы

        const mailText = `
Jauns auto uzpirkšanas piedāvājums no vietnes!

Vārds un uzvārds: ${name || ''}
Telefona numurs: ${phone || ''}
Auto marka, modelis un gads: ${carInfo || ''}
Apraksts: ${description || ''}
  `.trim();

        const raw = makeEmail(
            process.env.DEST_EMAIL,
            process.env.CC_EMAIL,
            'Piedāvāt auto uzpirkšanai!',
            mailText,
            photo // Передаем картинку в функцию создания письма
        );

        await gmail.users.messages.send({
            userId: 'me',
            requestBody: { raw }
        });

        res.status(200).json({ message: 'Veiksmīgi nosūtīts!' });
    } catch (err) {
        console.error('Kļūda sūtot datus:', err);
        res.status(500).json({ error: 'Servera kļūda' });
    }
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, '0.0.0.0', () => {
    console.log(`Server listening on port ${PORT}`);
});