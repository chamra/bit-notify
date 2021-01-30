const puppeteer = require('puppeteer');
const crypto = require('crypto')
const {db} = require('./helpers/admin')

const getTextContent = async (el, seletor) => {

    return await el.$eval(seletor, nestedEl => nestedEl.innerText)

}

const announcementData = async (elements) => {

    let data = []

    for (let index = 0; index < elements.length; index++) {
        const element = elements[index];

        let announcement = {
            title: "",
            postDate: "",
            link: "",
            hash: "",
            createAt: new Date().toISOString(),
            broadcasted : false
        }


        announcement.title = await getTextContent(element, '.menu-link')
        announcement.postDate = await getTextContent(element, '.post-date')
        announcement.link = await element.$eval('.menu-link', el => el.getAttribute('href'))
        announcement.hash = crypto.createHash('sha1').update(`${announcement.title}${announcement.postDate}${announcement.link}`).digest('hex');

        data.push(announcement)
        
    }


    return data
}

const saveAnnouncement = async (announcements) => {

    console.log('saving announcements');

    let batch = db.batch();
    

    try {

        for (let index = 0; index < announcements.length; index++) {
            const announcement = announcements[index];

            let isExists  = await db.collection('announcements').where('hash', '==' ,announcement.hash).get();


            if (isExists.empty) {
                let docRef = db.collection('announcements').doc();
                batch.set(docRef, announcement);
            }
            
        } 

        batch.commit();

    } catch (error) {
        console.error(error);
    }

};

const init = async () => {

    try {
        console.log('started');
        const browser = await puppeteer.launch({
            args: ['--no-sandbox']
        });
        console.log('launch');
        const page = await browser.newPage();
        console.log('new page');
        await page.goto('http://www.bit.lk/');
        console.log('visit web site');

        console.log('get news');
        const announcementsEls = await page.$$('.announcement .new');

        const announcements = await announcementData(announcementsEls);

        await browser.close();

        console.log('save news');
        await saveAnnouncement(announcements);
        console.log('end');

    } catch (error) {

        console.error(error);
        
    }
    
    

}

module.exports = {
    init
}