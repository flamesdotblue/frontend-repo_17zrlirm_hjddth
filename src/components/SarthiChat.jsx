import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { MessageCircle, Send, X, Sprout } from 'lucide-react';

export default function SarthiChat() {
  const [open, setOpen] = useState(false);
  const [input, setInput] = useState('');
  const [messages, setMessages] = useState([
    { role: 'assistant', content: 'Namaste! I am Sarthi, your farm guide. Ask me anything about your oilseed crop.' },
  ]);

  const sendMessage = () => {
    const text = input.trim();
    if (!text) return;
    const userMsg = { role: 'user', content: text };
    const reply = {
      role: 'assistant',
      content:
        'Thanks for sharing. Based on current weather and growth stage, a light irrigation this evening is recommended. Would you like step-by-step guidance?',
    };
    setMessages((prev) => [...prev, userMsg, reply]);
    setInput('');
  };

  return (
    <div className="fixed bottom-4 right-4 z-40">
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 10 }}
            className="mb-3 w-[88vw] max-w-md rounded-2xl border border-slate-200 bg-white shadow-xl overflow-hidden"
          >
            <div className="flex items-center justify-between bg-gradient-to-r from-[#1e40af] to-[#0f2b7a] px-4 py-3 text-white">
              <div className="flex items-center gap-2">
                <Sprout className="w-5 h-5 text-emerald-300" />
                <div className="font-semibold">Sarthi</div>
                <div className="ml-2 text-xs text-white/80">Online</div>
              </div>
              <button onClick={() => setOpen(false)} className="text-white/80 hover:text-white">
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="max-h-80 overflow-y-auto px-4 py-3 space-y-3 bg-[#fef7ed]">
              {messages.map((m, i) => (
                <div key={i} className={`flex ${m.role === 'user' ? 'justify-end' : 'justify-start'}`}>
                  <div
                    className={`max-w-[80%] rounded-xl px-3 py-2 text-sm shadow ${
                      m.role === 'user'
                        ? 'bg-[#1e40af] text-white rounded-br-sm'
                        : 'bg-white text-slate-800 border border-slate-200 rounded-bl-sm'
                    }`}
                  >
                    {m.content}
                  </div>
                </div>
              ))}
            </div>

            <div className="flex items-center gap-2 p-3 bg-white">
              <input
                value={input}
                onChange={(e) => setInput(e.target.value)}
                placeholder="Ask in English, Hindi, Telugu..."
                className="flex-1 rounded-lg border border-slate-200 px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-[#1e40af]/30"
                onKeyDown={(e) => {
                  if (e.key === 'Enter') sendMessage();
                }}
              />
              <motion.button
                whileHover={{ scale: 1.03 }}
                whileTap={{ scale: 0.97 }}
                onClick={sendMessage}
                className="inline-flex items-center gap-2 rounded-lg bg-[#16a34a] hover:bg-[#149441] text-white px-3 py-2 text-sm font-medium shadow"
              >
                <Send className="w-4 h-4" /> Send
              </motion.button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {!open && (
        <motion.button
          initial={{ scale: 0.9, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          whileHover={{ scale: 1.06 }}
          whileTap={{ scale: 0.96 }}
          onClick={() => setOpen(true)}
          className="flex items-center gap-2 rounded-full bg-[#1e40af] text-white px-4 py-3 shadow-lg"
        >
          <MessageCircle className="w-5 h-5" /> Chat with Sarthi
        </motion.button>
      )}
    </div>
  );
}
