require('dotenv').config();
const { google } = require('googleapis');

console.log(process.env.CLIENT_ID);
console.log(process.env.CLIENT_SECRET);
console.log(process.env.REDIRECT_URI);

const oAuth2Client = new google.auth.OAuth2(
    process.env.CLIENT_ID,
    process.env.CLIENT_SECRET,
    process.env.REDIRECT_URI
);

oAuth2Client.getToken('4/0Ab32j92I6eFVavhAHy9VFKGzAaOi9ZJE0_ZwVFZKM3miJR9oUqIEqqDgXMTtE2CTs_gyBA').then(({ tokens }) => {
    console.log(tokens);
}).catch(console.error);
