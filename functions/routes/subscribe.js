const {db} = require('../helpers/admin')

const subscribe = async (req, res) => {

    let deviceId = req.body.deviceId;

    if (deviceId === undefined && deviceId.length >= 120) {
        return res.status(401).json({"message" : "device id not valid"})
    }

    let isDeviceExist = await db.collection('subscriptions').where('deviceId', '=', deviceId).get()

    if (!isDeviceExist.empty) return res.status(200).json({"message" : "subscribed already"})

    await db.collection('subscriptions').add({deviceId : deviceId})

    return res.status(200).json({"message" : "subscribed"})

}

const  isValidDeviceID = (deviceId) => {
  
    //TODO
}

module.exports = {
    subscribe
}