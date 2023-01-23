import * as React from "react";
import { useState, useEffect } from "react";
import { Route, Routes } from "react-router-dom";
import Login from './sign-in-login/Login'
import Home from './Home';
import Chats from './chatbox/Chats';
import Contacts from './contacts/Contacts';
import Profile from './profile/Profile';
import SignUp from "./sign-in-login/SignUp";

function Main({ user, setUser, autoLogin, setNotifications, counter }) {
    const [convoData, setConvoData] = useState({});

    useEffect(() => getConversations(), [user])

    function getConversations() {
        if (user) {
            fetch(`/myconversations`)
                .then(res => res.json())
                .then(data => {
                    setConvoData(data)
                    //console.log("MyConvos:", data)
                })
                .catch(e => console.error(e))
        } else {
            setConvoData({}) // If user is not set, then clear convoData state
        }
    }

    return (
        <main>
            <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/chats" element={<Chats
                    user={user}
                    autoLogin={autoLogin}
                    convoData={convoData}
                    getConversations={getConversations}
                    counter={counter}
                />} />
                <Route path="/login" element={<Login
                    user={user}
                    setUser={setUser}
                    getConversations={getConversations} />} />
                <Route path="/signup" element={<SignUp setUser={setUser} />} />
                <Route path="/contacts" element={<Contacts user={user}
                    autoLogin={autoLogin}
                    getConversations={getConversations}
                    setNotifications={setNotifications}
                />} />
                <Route path="/profile" element={<Profile user={user} setUser={setUser} autoLogin={autoLogin} />} />

            </Routes>
        </main>
    )
};

export default Main;