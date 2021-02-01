import React from 'react'
import "./Header.css"
import {
    Navbar,
    NavbarBrand,
    NavbarText
} from 'reactstrap';

import bell from './bell.png';
import firebase from 'firebase/app'
import 'firebase/messaging'
import axios from 'axios';
import Notifications, {notify} from 'react-notify-toast';



const firebaseConfig = {
    apiKey: "AIzaSyA_FVvvqm0I6YS7qSeRnrwyE08VGPA3JX4",
    authDomain: "bit-notify.firebaseapp.com",
    projectId: "bit-notify",
    storageBucket: "bit-notify.appspot.com",
    messagingSenderId: "758732043846",
    appId: "1:758732043846:web:12ac60f0a0571a2f74bc47",
    measurementId: "G-V5579995CH"
};




const Header = (props) => {


    async function  subscribe () {

        let myColor = {
            background: '#6c757d',
            text: "#FFFFFF"
        };
        
        
        firebase.initializeApp(firebaseConfig);

        const messaging = firebase.messaging();

        try {

            let token = await messaging.getToken({
                vapidKey: "BLk3S9e7cU4uTwrd5lNkQfdd22J8rXGWx754FwVZOrsAdA2_QwAyuFS8hne1GFD5TQvahnTZ-Vdw2QkbZ_fchnM"
            })

            await axios.post("https://europe-west1-bit-notify.cloudfunctions.net/api/subscribe", {
                deviceId: token
            })

            notify.show("subscribed", "custom", 5000, myColor);
            
        } catch (error) {
            console.log(error);
            notify.show("whoops something is wrong", "error", 5000, myColor);
        }

        

    }

    return (
        <div>
            <Notifications  options={{zIndex: -200, top: '50px', fontSize : '5erm'}}  />
            <Navbar color="dark" className="Nav">
                <NavbarBrand href="/">
                    BIT NOTIFY
                </NavbarBrand>
                <NavbarText onClick={() => subscribe()}>
                    <img  src={bell} alt="subscribe" className="bell" title="subscribe to get notifications" />
                </NavbarText>
            </Navbar>
        </div>
    )
}


export default Header
