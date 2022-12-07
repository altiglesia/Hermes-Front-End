import * as React from "react";
import { useState, useEffect } from "react";
import { Route, Routes } from "react-router-dom";
import Login from './Login';
import Home from './Home';
import Chats from './Chats';
import Contacts from './Contacts';
import Profile from './Profile';
import SignUp from "./SignUp";

function Main({ user, setUser, autoLogin }) {
    const [convoData, setConvoData] = useState({});


    function getConversations(user) {
        fetch(`/myconversations`)
            .then(res => res.json())
            .then(data => {
                setConvoData(data)
                console.log(data)
            })
            .catch(e => console.error(e))
    }

    return (
        <main>
            <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/chats" element={<Chats user={user} convoData={convoData} getConversations={getConversations}/>} />
                <Route path="/login" element={<Login
                    user={user}
                    setUser={setUser}
                    getConversations={getConversations} />} />
                <Route path="/signup" element={<SignUp setUser={setUser} />} />
                <Route path="/contacts" element={<Contacts user={user}/>} />
                <Route path="/profile" element={<Profile user={user} setUser={setUser} autoLogin={autoLogin}/>} />
            </Routes>
        </main>
    )
};

export default Main;