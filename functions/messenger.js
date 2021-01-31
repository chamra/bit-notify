const {admin,  db} = require('./helpers/admin')


const broadcastNotification = async (announcement, id) => {

    let snapShop = await db.collection('subscriptions').get()

    console.log("on create", announcement);

    let registrationTokens = []

    snapShop.forEach(sub => registrationTokens.push(sub.data().deviceId))

    console.log(registrationTokens);

    let sent = await admin.messaging().sendToDevice(registrationTokens, {
        notification: {
            title: '"BIT NOTIFY : New Announcement"',
            body: announcement.title,
            icon: "/logo512.png"
        },
    })

    console.log(sent);

    await db.collection("announcements").doc(id).update({
        broadcasted: true
    })

}

module.exports = {
    broadcastNotification
}