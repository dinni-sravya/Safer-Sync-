import React, { useState, useEffect, useRef } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { ArrowLeft, Send, MoreVertical, Phone } from 'lucide-react';

const ChatPage = () => {
    const navigate = useNavigate();
    const { id } = useParams();
    const [messages, setMessages] = useState([
        { id: 1, text: "Hey everyone! Where are we meeting?", sender: "Ananya", time: "08:45 AM", isMe: false },
        { id: 2, text: "I'm at the main entrance.", sender: "Ramesh (Driver)", time: "08:48 AM", isMe: false, isDriver: true },
        { id: 3, text: "On my way, 5 mins!", sender: "You", time: "08:50 AM", isMe: true },
    ]);
    const [newMessage, setNewMessage] = useState("");
    const messagesEndRef = useRef(null);

    const scrollToBottom = () => {
        messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
    };

    useEffect(() => {
        scrollToBottom();
    }, [messages]);

    const handleSend = (e) => {
        e.preventDefault();
        if (!newMessage.trim()) return;

        const msg = {
            id: messages.length + 1,
            text: newMessage,
            sender: "You",
            time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
            isMe: true
        };
        setMessages([...messages, msg]);
        setNewMessage("");

        // Mock reply
        setTimeout(() => {
            const reply = {
                id: messages.length + 2,
                text: "Got it, see you soon!",
                sender: "Ananya",
                time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
                isMe: false
            };
            setMessages(prev => [...prev, reply]);
        }, 2000);
    };

    return (
        <div className="flex flex-col h-[85vh] max-w-2xl mx-auto">
            {/* Header */}
            <div className="glass-card p-4 flex items-center justify-between mb-4 sticky top-0 z-10 bg-[#0F0F13]/80 backdrop-blur-md">
                <div className="flex items-center gap-3">
                    <button onClick={() => navigate(-1)} className="p-2 hover:bg-white/10 rounded-full">
                        <ArrowLeft size={20} />
                    </button>
                    <div>
                        <h2 className="font-bold">Trip #{id} Group</h2>
                        <p className="text-xs text-green-400">4 Online</p>
                    </div>
                </div>
                <div className="flex items-center gap-2">
                    <button className="p-2 hover:bg-white/10 rounded-full"><Phone size={20} /></button>
                    <button className="p-2 hover:bg-white/10 rounded-full"><MoreVertical size={20} /></button>
                </div>
            </div>

            {/* Chat Area */}
            <div className="flex-1 overflow-y-auto space-y-4 p-2 custom-scrollbar">
                {messages.map((msg) => (
                    <div key={msg.id} className={`flex flex-col ${msg.isMe ? 'items-end' : 'items-start'}`}>
                        {!msg.isMe && <span className="text-[10px] text-gray-400 ml-2 mb-1">{msg.sender}</span>}
                        <div className={`max-w-[80%] px-4 py-3 rounded-2xl ${msg.isMe
                                ? 'bg-secondary text-white rounded-br-none'
                                : msg.isDriver
                                    ? 'bg-yellow-500/20 text-yellow-200 border border-yellow-500/30 rounded-bl-none'
                                    : 'bg-white/10 rounded-bl-none'
                            }`}>
                            <p className="text-sm">{msg.text}</p>
                        </div>
                        <span className="text-[10px] text-gray-500 mt-1 mx-2">{msg.time}</span>
                    </div>
                ))}
                <div ref={messagesEndRef} />
            </div>

            {/* Input Area */}
            <form onSubmit={handleSend} className="glass-card p-3 mt-4 flex items-center gap-2 sticky bottom-0 z-10 bg-[#0F0F13]/80 backdrop-blur-md">
                <input
                    type="text"
                    placeholder="Type a message..."
                    className="flex-1 bg-white/5 border border-white/10 rounded-full px-4 py-2 outline-none focus:border-secondary"
                    value={newMessage}
                    onChange={(e) => setNewMessage(e.target.value)}
                />
                <button type="submit" className="p-3 bg-secondary rounded-full hover:bg-secondary/80 transition-colors">
                    <Send size={18} />
                </button>
            </form>
        </div>
    );
};

export default ChatPage;
