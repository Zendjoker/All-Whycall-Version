import "./messenger.css";
import Conversation from "../../components/conversations/Conversation";
import Message from "../../components/message/Message";
import ChatOnline from "../../components/chatOnline/ChatOnline";
import { useContext, useEffect, useRef, useState } from "react";
import { AuthContext } from "../../context/AuthContext";
import axios from "axios";
import { io } from "socket.io-client";
import { Search} from "@material-ui/icons";
import "../../Font/FontAwesome/fontAwesome"
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome'
import {
  EmojiEmotions,
} from "@material-ui/icons";
import Picker from "emoji-picker-react";
import Topbar from "../../components/topbar/Topbar";

export default function Messenger() {
  const [showPicker, setShowPicker] = useState(false);
  const [conversations, setConversations] = useState([]);
  const [currentChat, setCurrentChat] = useState(null);
  const [messages, setMessages] = useState([]);
  const [newMessage, setNewMessage] = useState("");
  const [arrivalMessage, setArrivalMessage] = useState(null);
  const [onlineUsers, setOnlineUsers] = useState([]);
  const socket = useRef();
  const { user } = useContext(AuthContext);
  const scrollRef = useRef();

  useEffect(() => {
    socket.current = io("ws://localhost:8900");
    socket.current.on("getMessage", (data) => {
      setArrivalMessage({
        sender: data.senderId,
        text: data.text,
        createdAt: Date.now(),
      });
    });
  }, []);

  useEffect(() => {
    arrivalMessage &&
      currentChat?.members.includes(arrivalMessage.sender) &&
      setMessages((prev) => [...prev, arrivalMessage]);
  }, [arrivalMessage, currentChat]);

  useEffect(() => {
    socket.current.emit("addUser", user._id);
    socket.current.on("getUsers", (users) => {
      setOnlineUsers(
        user.followings.filter((f) => users.some((u) => u.userId === f))
      );
    });
  }, [user]);

  useEffect(() => {
    const getConversations = async () => {
      try {
        const res = await axios.get("/conversations/" + user._id);
        setConversations(res.data);
      } catch (err) {
        console.log(err);
      }
    };
    getConversations();
  }, [user._id]);

  useEffect(() => {
    const getMessages = async () => {
      try {
        const res = await axios.get("/messages/" + currentChat?._id);
        setMessages(res.data);
      } catch (err) {
        console.log(err);
      }
    };
    getMessages();
  }, [currentChat]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const message = {
      sender: user._id,
      text: newMessage,
      conversationId: currentChat._id,
    };

    const receiverId = currentChat.members.find(
      (member) => member !== user._id
    );

    socket.current.emit("sendMessage", {
      senderId: user._id,
      receiverId,
      text: newMessage,
    });

    try {
      const res = await axios.post("/messages", message);
      setMessages([...messages, res.data]);
      setNewMessage("");
      setShowPicker(false);
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    scrollRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  const PF = process.env.REACT_APP_PUBLIC_FOLDER;
  const togglePicker = () => {
    setShowPicker(!showPicker);
  };
  const addEmoji = (e, emoji) => {
    setNewMessage(messages + emoji.emoji);
  };
  return (
    <>
    <Topbar />
    <div className="allmessenger">
      {/*<div className="headerr">
      
            <ChatOnline
              onlineUsers={onlineUsers}
              currentId={user._id}
              setCurrentChat={setCurrentChat}
            />
      </div>  */} 
      <div className="messenger">
        <div className="chatMenu">
          <div className="chatMenuWrapper">
      <div className="Icondiscussions">
<h3 className="Usernnamee">@{user.username}</h3>
<FontAwesomeIcon icon="chevron-down" className="iconLeftbar" />
</div>
          <div className="searchbarr">
          <Search className="searchicon" /> 
          <input
            placeholder="Search for friends ..."
            className="searchinput"
          />
        </div>
            {conversations.map((c) => (
              <div className="directmessage" onClick={() => setCurrentChat(c)}>   
              <Conversation conversation={c} currentUser={user} /> 
              </div>
            ))}
          </div>
        </div>
        <div className="chatBox">
          <div className="chatBoxWrapper">
            {currentChat ? (
              <>
              <div className="topchatind">
                
              <h5 currentUser={user}>{user?.username}</h5>
              </div>
              
                <div className="chatBoxTop">
                  {messages.map((m) => (
                    <div ref={scrollRef}>
                      <Message message={m} own={m.sender === user._id} />
                    </div>
                  ))}
                  
                </div>
                
                <div className="emojiss">{showPicker && <Picker className="emojiss" onEmojiClick={addEmoji} />}</div>
                <div className="chatBoxBottom">
                
                <EmojiEmotions onClick={togglePicker} htmlColor="goldenrod" className="shareIcon" />
                
                  <textarea 
                    className="chatMessageInput"
                    placeholder="Type a message"
                    onChange={(e) => setNewMessage(e.target.value)}
                    value={newMessage}
                  ></textarea>

                  <FontAwesomeIcon className="photovideomess" icon="photo-video"/>   
                  
                  <button className="directtmessage" onClick={handleSubmit}>
                 
                  <FontAwesomeIcon icon="paper-plane" />
                 
                  </button>
                  
                </div>


              </>
            ) : (
              <>
              <FontAwesomeIcon icon="comments" className="openconv" />
              <span className="noConversationText">
                Open a conversation to start a chat.
              </span>
              </>
            )}
          </div>
        </div>
      </div>
      </div>
    </>
  );
}