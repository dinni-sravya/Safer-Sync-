
import React, { useState, useEffect, useRef } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { ArrowLeft, Send, ShieldCheck, ShieldAlert, Phone } from 'lucide-react';
import { motion } from 'framer-motion';

const GroupChat = () => {
    const navigate = useNavigate();
    const { id } = useParams();
    const [messages, setMessages] = useState([]);
    const [inputText, setInputText] = useState('');
    const messagesEndRef = useRef(null);
    const [isPanicMode, setIsPanicMode] = useState(false);

    const scrollToBottom = () => {
        messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
    };

    useEffect(() => {
        // Fetch initial chat history
        fetch(`http://localhost:5000/api/trips/${id}/chat`)
            .then(res => res.json())
            .then(data => {
                setMessages(data);
                scrollToBottom();
            })
            .catch(err => console.error(err));
    }, [id]);

    useEffect(() => {
        scrollToBottom();
    }, [messages]);

    const handleSend = async () => {
        if (!inputText.trim()) return;

        try {
            const res = await fetch(`http://localhost:5000/api/trips/${id}/chat`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ text: inputText, sender: "You" })
            });
            const newMsg = await res.json();
            setMessages(prev => [...prev, newMsg]);
            setInputText('');

            // Poll for Reply (Simulated websocket)
            // In a real app, socket.on('message') would handle this
            setTimeout(() => {
                // Re-fetch to see if driver replied (mock backend does this)
                fetch(`http://localhost:5000/api/trips/${id}/chat`)
                    .then(res => res.json())
                    .then(data => setMessages(data));
            }, 3500);

        } catch (err) {
            console.error("Failed to send", err);
        }
    };

    return (
        <div className="h-screen flex flex-col bg-black text-white">
            {/* Header / Safety Center */}
            <div className="p-4 glass-card rounded-none border-b border-white/10 flex justify-between items-center z-10 relative">
                <button onClick={() => navigate(-1)} className="p-2 rounded-full hover:bg-white/10">
                    <ArrowLeft size={24} />
                </button>
                <div className="flex flex-col items-center">
                    <span className="font-bold">Group Chat</span>
                    <div className="flex items-center gap-1 text-[10px] text-green-400 bg-green-500/10 px-2 py-0.5 rounded-full border border-green-500/20">
                        <ShieldCheck size={10} />
                        <span>Verified Group</span>
                    </div>
                </div>
                <button
                    onClick={() => setIsPanicMode(!isPanicMode)}
                    className={`p-2 rounded-full ${isPanicMode ? 'bg-red-500 text-white animate-pulse' : 'bg-red-500/10 text-red-500'}`}
                >
                    <ShieldAlert size={24} />
                </button>
            </div>

            {/* Panic Mode Overlay */}
            {isPanicMode && (
                <motion.div
                    initial={{ height: 0 }}
                    animate={{ height: 'auto' }}
                    className="bg-red-900/20 border-b border-red-500/50 p-4"
                >
                    <div className="flex gap-4 overflow-x-auto">
                        <button className="flex-1 bg-red-600 p-3 rounded-lg flex items-center justify-center gap-2 font-bold text-sm whitespace-nowrap">
                            <Phone size={16} /> Call Police
                        </button>
                        <button className="flex-1 bg-white/10 p-3 rounded-lg flex items-center justify-center gap-2 font-bold text-sm whitespace-nowrap">
                            <Phone size={16} /> Emergency Contact
                        </button>
                    </div>
                    <p className="text-xs text-red-300 mt-2 text-center">Location sharing is ACTIVE</p>
                </motion.div>
            )}

            {/* Chat Area */}
            <div className="flex-1 overflow-y-auto p-4 space-y-4 bg-gradient-to-b from-black to-gray-900">
                {messages.map((msg) => (
                    <motion.div
                        key={msg.id}
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        className={`flex flex-col ${msg.isUser ? 'items-end' : 'items-start'}`}
                    >
                        <div className={`max-w-[80%] p-3 rounded-2xl ${msg.isUser
                                ? 'bg-gradient-to-br from-secondary to-primary text-black rounded-tr-none'
                                : 'glass-card border border-white/10 text-gray-200 rounded-tl-none'
                            }`}>
                            <p className="text-sm">{msg.text}</p>
                        </div>
                        <span className="text-[10px] text-gray-500 mt-1 px-1">
                            {msg.sender} • {msg.time}
                        </span>
                    </motion.div>
                ))}
                <div ref={messagesEndRef} />
            </div>

            {/* Input Area */}
            <div className="p-4 bg-black/80 backdrop-blur-md border-t border-white/10">
                <div className="flex gap-2">
                    <input
                        type="text"
                        value={inputText}
                        onChange={(e) => setInputText(e.target.value)}
                        onKeyPress={(e) => e.key === 'Enter' && handleSend()}
                        placeholder="Type a message..."
                        className="flex-1 bg-white/5 border border-white/10 rounded-full px-4 py-3 text-sm focus:outline-none focus:border-secondary transition-colors"
                    />
                    <button
                        onClick={handleSend}
                        className="p-3 bg-secondary rounded-full text-black hover:bg-secondary/90 transition-colors"
                    >
                        <Send size={20} />
                    </button>
                </div>
            </div>
        </div>
    );
};

export default GroupChat;
