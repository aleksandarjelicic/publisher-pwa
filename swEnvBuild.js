//swEnvBuild.js - script that is separate from webpack
require('dotenv').config(); // make sure you have '.env' file in pwd
const fs = require('fs');

const writeValue = `const process = {
  env: {
    NEXT_PUBLIC_FIREBASE_APIKEY: "${process.env.NEXT_PUBLIC_FIREBASE_APIKEY}",
    NEXT_PUBLIC_FIREBASE_APPID: "${process.env.NEXT_PUBLIC_FIREBASE_APPID}",
    NEXT_PUBLIC_FIREBASE_PROJECTID: "${process.env.NEXT_PUBLIC_FIREBASE_PROJECTID}",
    NEXT_PUBLIC_FIREBASE_SENDERID: "${process.env.NEXT_PUBLIC_FIREBASE_SENDERID}"
  }
};`;

fs.writeFileSync('./static/swenv.js', writeValue);

