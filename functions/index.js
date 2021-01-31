const functions = require('firebase-functions');
const cors = require('cors');
const {
    getAnnouncements,
    subscribe
} = require('./routes');
const {
    init
} = require('./crawler');
const { broadcastNotification } = require('./messenger');


const app = require('express')();
app.use(cors({
    'Access-Control-Allow-Origin': 'http://localhost:3000'
}))

app.post('/announcements', getAnnouncements);
app.post('/subscribe', subscribe);

exports.api = functions.region('europe-west1').https.onRequest(app);

exports.crawler = functions.runWith({
    timeoutSeconds: 150,
    memory: '1GB'
}).pubsub.schedule('0 */6 * * *').onRun(async (context) => {
    await init();
    return null;
});

exports.onAnnouncementCreate = functions.firestore.document("announcements/{announcementsId}").onCreate(async (snap, context) => {
    await broadcastNotification(snap.data(), context.params.announcementsId)
})