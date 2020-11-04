//robotsTxtBuild.js - separate from webpack, generates robots.txt
require('dotenv').config(); // make sure you have '.env' file in pwd
const fs = require('fs');

const writeValue = `
Sitemap: ${process.env.NEXT_PUBLIC_DOMAIN}/sitemap.xml

User-agent: *
Allow: /*
`;

fs.writeFileSync('./public/robots.txt', writeValue);
