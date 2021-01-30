const functions = require('firebase-functions');

const {
    getAnnouncements
} = require('./routes');
const {
    init
} = require('./crawler')
const app = require('express')();


app.post('/announcements', getAnnouncements);

exports.api = functions.region('europe-west1').https.onRequest(app);

exports.crawler = functions.runWith({
    timeoutSeconds: 150,
    memory: '1GB'
}).pubsub.schedule('0 */6 * * *').onRun(async (context) => {
    await init();
    return null;
});