import * as React from "react";
import { useState, useEffect } from "react";
import { Route, Routes } from "react-router-dom";
import Login from './Login';
import Home from './Home';
import Chats from './Chats';
import Contacts from './Contacts';
import Profile from './Profile';
import SignUp from "./SignUp";

function Main({ user, setUser }) {
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
            {user ? (
                <Routes>
                    <Route path="/" element={<Home />} />
                    <Route path="/chats" element={<Chats user={user} convoData={convoData} />} />
                    <Route path="/login" element={<Login user={user} setUser={setUser} />} />
                    <Route path="/contacts" element={<Contacts />} />
                    <Route path="/profile" element={<Profile user={user} />} />
                </Routes>
            ) : (
                <Routes>
                    <Route path="/signup" element={<SignUp setUser={setUser} />} />
                    <Route path="/login" element={<Login user={user} setUser={setUser} getConversations={getConversations} />} />
                    <Route path="/" element={<Home />} />
                </Routes>
            )
            }
        </main>
    )
};

export default Main;