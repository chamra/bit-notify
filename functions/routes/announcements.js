const {db} = require('../helpers/admin');

const limit = 5


const getAnnouncements = async (req, res) => {

    console.log("this is startwith", req.body.startWith);

    if (req.body.startAt) {
        
        let doc = await db.collection('announcements').doc(req.body.startAt).get();

        if (!doc.exists) return res.status(404).json('doc id not found')
        
        return startAnnouncementsAt(res, doc)
    }
        
    return startAnnouncementsAt(res);
}

const startAnnouncementsAt = async (res, doc = null) => {

    let snapShot = await db.collection('announcements').orderBy('createAt', 'DESC').limit(limit).get();

    if (doc !== null) snapShot = await db.collection('announcements').orderBy('createAt', 'DESC').startAfter(doc).limit(limit).get();

    return res.json(formatAnnouncements(snapShot));
}


const formatAnnouncements = (snapShot) => {

    let announcements = [];


    snapShot.forEach(e => {

        let {createAt, link, postDate, title} = e.data()

        announcements.push({
            id : e.id,
            createAt,
            link,
            postDate,
            title
        })
    })

    return announcements;

}

module.exports = {
    getAnnouncements
}