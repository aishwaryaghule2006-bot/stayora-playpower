import { useState } from "react";
import { BadgeCheck, MessageCircle, X, Send } from "lucide-react";

export default function HostSection({ property }) {
  const [modalOpen, setModalOpen] = useState(false);
  const [message, setMessage] = useState("");
  const [sent, setSent] = useState(false);
  const [sending, setSending] = useState(false);
  const host = property.host;

  async function sendMessage(e) {
    e.preventDefault();
    if (!message.trim()) return;
    setSending(true);
    try {
      await fetch("/api/contact-host", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ propertyId: property.id, message }),
      });
    } catch (err) {
      // ignore network errors in demo mode
    }
    setSending(false);
    setSent(true);
    setTimeout(() => {
      setSent(false);
      setModalOpen(false);
      setMessage("");
    }, 1500);
  }

  return (
    <div className="border-b border-gray-200 py-8">
      <h3 className="text-xl font-semibold mb-5">Meet your host</h3>
      <div className="flex items-center gap-6 flex-wrap">
        <div className="border border-gray-200 rounded-2xl p-6 flex flex-col items-center gap-2 shadow-sm w-full sm:w-64">
          <img src={host.avatar} alt={host.name} className="w-20 h-20 rounded-full object-cover" />
          <p className="font-semibold text-lg">{host.name}</p>
          {host.isSuperhost && (
            <span className="flex items-center gap-1 text-xs font-medium text-gray-600">
              <BadgeCheck size={14} /> Superhost
            </span>
          )}
          <div className="grid grid-cols-2 gap-4 w-full mt-3 text-center border-t border-gray-200 pt-3">
            <div>
              <p className="font-semibold">{host.reviews}</p>
              <p className="text-xs text-gray-500">Reviews</p>
            </div>
            <div>
              <p className="font-semibold">{host.rating}★</p>
              <p className="text-xs text-gray-500">Rating</p>
            </div>
          </div>
        </div>

        <div className="flex-1 min-w-[220px] space-y-3 text-sm">
          <p><span className="font-semibold">Hosting since</span> {host.since}</p>
          <p><span className="font-semibold">Response rate:</span> {host.responseRate}%</p>
          <p><span className="font-semibold">Responds</span> {host.responseTime}</p>
          <p><span className="font-semibold">Languages:</span> {host.languages.join(", ")}</p>

          <div className="flex gap-3 pt-3">
            <button
              onClick={() => setModalOpen(true)}
              className="border border-black rounded-lg px-5 py-2.5 text-sm font-semibold hover:bg-gray-100 flex items-center gap-2"
            >
              <MessageCircle size={16} /> Message host
            </button>
            <a
              href="#contact"
              onClick={(e) => {
                e.preventDefault();
                setModalOpen(true);
              }}
              className="border border-gray-300 rounded-lg px-5 py-2.5 text-sm font-semibold hover:bg-gray-100"
            >
              Contact host
            </a>
          </div>
        </div>
      </div>

      {modalOpen && (
        <div
          className="fixed inset-0 z-[100] bg-black/50 flex items-end sm:items-center justify-center"
          onClick={() => setModalOpen(false)}
        >
          <div
            className="bg-white rounded-t-2xl sm:rounded-2xl w-full sm:max-w-md max-h-[85vh] overflow-y-auto"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex items-center justify-between px-5 py-4 border-b">
              <div className="flex items-center gap-3">
                <img src={host.avatar} alt={host.name} className="w-9 h-9 rounded-full object-cover" />
                <p className="font-semibold">{host.name}</p>
              </div>
              <button onClick={() => setModalOpen(false)} className="p-2 hover:bg-gray-100 rounded-full">
                <X size={18} />
              </button>
            </div>
            <div className="px-5 py-4 min-h-[160px] flex flex-col justify-end">
              {sent && (
                <div className="bg-green-50 text-green-700 text-sm rounded-lg px-4 py-3 mb-3">
                  Message sent to {host.name}! They usually respond {host.responseTime}.
                </div>
              )}
              <div className="bg-gray-100 rounded-2xl rounded-bl-sm px-4 py-3 text-sm max-w-[85%] mb-2">
                Hi! Thanks for your interest in our place. Feel free to ask me anything about the stay.
              </div>
            </div>
            <form onSubmit={sendMessage} className="flex items-center gap-2 px-4 py-3 border-t">
              <input
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                placeholder="Write a message..."
                className="flex-1 border border-gray-300 rounded-full px-4 py-2.5 text-sm outline-none focus:border-black"
              />
              <button
                type="submit"
                disabled={sending}
                className="brand-btn rounded-full p-2.5 disabled:opacity-60"
                aria-label="Send message"
              >
                <Send size={16} />
              </button>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
