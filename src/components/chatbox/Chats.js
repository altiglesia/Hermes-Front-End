import React, { useEffect, useState } from "react";
import ConvoFrame from "./ConvoFrame";
import ChatSideBar from "./ChatSideBar";
import useResponsive from "../hooks/useResponsive";
import { createConsumer } from "@rails/actioncable";

function Chats({ user, autoLogin, convoData, getConversations }) {
  const mdUp = useResponsive('up', 'md');
  const [selectedChat, setSelectedChat] = useState(convoData[0]);

  useEffect(() => autoLogin(), [selectedChat])
  // useEffect(() => getConversations(), [user])

  useEffect(() => {
    getConversations()
    // 1. create the connection to the backend
    const cable = createConsumer("ws://localhost:3000/cable")
    // 2. subscribe to the specific channel I care about

    const params = {
      channel: "MessageFeedChannel",
      user_id: user.id,
    }

    const handlers = {
      received(data) {
        console.log(data)
      },
      connected() {
        console.log('connected!')
      },
      disconnected() {
        console.log('disconnected!')
      },  
    }

    cable.subscriptions.create(params, handlers)
    // 3. figure out how to add a new message from that channel
    // when a new one comes in
    // 4. unsubscribe from the channel when my component is done
  }, [user.id]);

  function renderConversation(selectedConvoId) {
    const selectedConvo = convoData.find(convo => (convo.id === selectedConvoId))
    setSelectedChat(selectedConvo)
  }

  function sendNewMessage(message) {
    fetch("/messages", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
      },
      body: JSON.stringify({
        conversation_id: selectedChat.id,
        content: message,
      }),
    }).then(res => res.json())
      .then(newMessage => {
        setSelectedChat({ ...selectedChat, messages: [...selectedChat.messages, newMessage] })
      })
      .catch(err => console.error(err));
  }

  function deleteMessage(deletedMsgID) {
    fetch(`/messages/${deletedMsgID}`, { method: "DELETE" })
    setSelectedChat({
      ...selectedChat,
      messages: selectedChat.messages.filter(msg => msg.id !== deletedMsgID)
    })
  }

  function postUpdatedMessage(updatedMsg) {
    fetch(`/messages/${updatedMsg.id}`, {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        content: updatedMsg.content
      })
    })
      .then(r => r.json())
      .then(resMsg => {
        setSelectedChat({
          ...selectedChat,
          messages: selectedChat.messages.map(msgObj => {
            return msgObj.id === updatedMsg.id ? updatedMsg : msgObj
          })
        })
      })
  }

  return (
    <div>
      <aside style={{
        float: "left",
        // backgroundColor: "red"
      }}>
        {mdUp &&
          <ChatSideBar convoData={convoData} user={user} renderConversation={renderConversation} />
        }
      </aside>
      <ConvoFrame
        user={user}
        selectedChat={selectedChat}
        setSelectedChat={setSelectedChat}
        sendNewMessage={sendNewMessage}
        deleteMessage={deleteMessage}
        postUpdatedMessage={postUpdatedMessage}
      />
    </div>
  );
}

export default Chats;
