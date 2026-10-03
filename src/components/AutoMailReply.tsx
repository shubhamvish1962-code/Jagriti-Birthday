'use client';
import { useState } from 'react';
import confetti from 'canvas-confetti';
import { Send, Heart, Sparkles, CheckCircle2, MessageSquareHeart } from 'lucide-react';

const QUICK_REPLIES = [
  "Thank you so much Shubham! This is the most magical birthday surprise ever 🥺💖",
  "The rain theme + Tum Tak song made me so emotional! Loved every single bit of it 🌧️✨",
  "Baarish, chai, and this adorable website... You made my birthday unforgettable 🍃☕",
  "You're the sweetest! Thank you for putting so much love into this 🌸🎂",
];

export default function AutoMailReply() {
  const [selectedMessage, setSelectedMessage] = useState<string>(QUICK_REPLIES[0]);
  const [customNote, setCustomNote] = useState<string>('');
  const [isSent, setIsSent] = useState(false);

  const finalMessage = customNote.trim() ? customNote : selectedMessage;

  const handleSendMail = (e: React.FormEvent) => {
    e.preventDefault();

    // Trigger celebratory confetti
    try {
      confetti({
        particleCount: 80,
        spread: 70,
        origin: { y: 0.7 },
        colors: ['#f472b6', '#fbcfe8', '#74c69d', '#fbbf24'],
      });
    } catch {
      // safe fallback
    }

    setIsSent(true);

    const subject = encodeURIComponent('Birthday Reply from Jagriti 🌸🎂');
    const body = encodeURIComponent(
      `${finalMessage}\n\n` +
      `-------------------------------------------\n` +
      `🍃 Sent with love from Jagriti's Birthday Website\n` +
      `🌧️ Rainy Greenery & Baby Pink Experience\n` +
      `📅 ${new Date().toLocaleDateString('en-IN', { dateStyle: 'full' })}`
    );

    // Open user's default email client (Gmail / iOS Mail / etc.)
    const mailtoUrl = `mailto:shubhamvish1962@gmail.com?subject=${subject}&body=${body}`;
    window.location.href = mailtoUrl;

    setTimeout(() => {
      setIsSent(false);
    }, 6000);
  };

  return (
    <div
      id="reply-section"
      style={{
        marginTop: '3.5rem',
        padding: 'clamp(1.8rem, 4.5vw, 3rem)',
        borderRadius: '28px',
        background: 'linear-gradient(145deg, rgba(16, 28, 22, 0.88), rgba(8, 16, 12, 0.94))',
        border: '1.5px solid rgba(244, 114, 182, 0.35)',
        boxShadow: '0 20px 50px rgba(0,0,0,0.6), 0 0 35px rgba(244, 114, 182, 0.12)',
        backdropFilter: 'blur(24px)',
        WebkitBackdropFilter: 'blur(24px)',
        textAlign: 'left',
        width: '100%',
        maxWidth: '720px',
        margin: '3.5rem auto 0 auto',
      }}
    >
      {/* Header */}
      <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', marginBottom: '1rem' }}>
        <div
          style={{
            width: '42px',
            height: '42px',
            borderRadius: '50%',
            background: 'rgba(244, 114, 182, 0.15)',
            border: '1px solid rgba(244, 114, 182, 0.4)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            color: '#f472b6',
          }}
        >
          <MessageSquareHeart size={22} />
        </div>
        <div>
          <h3
            className="font-display"
            style={{
              fontSize: 'clamp(1.3rem, 2.8vw, 1.85rem)',
              color: '#fce7f3',
              lineHeight: 1.2,
            }}
          >
            Send a Birthday Reply to Shubham 💌
          </h3>
          <p style={{ fontSize: '0.78rem', color: '#b7e4c7', opacity: 0.85, marginTop: '2px' }}>
            To: <span style={{ color: '#fbcfe8', fontWeight: 600 }}>shubhamvish1962@gmail.com</span>
          </p>
        </div>
      </div>

      <p style={{ fontSize: '0.88rem', color: 'rgba(232, 245, 233, 0.85)', lineHeight: 1.5, marginBottom: '1.4rem' }}>
        Tap a quick response below or write your own note. Tapping <strong>Send Reply</strong> will launch your email with everything ready!
      </p>

      {/* Quick response pills */}
      <div style={{ display: 'flex', flexDirection: 'column', gap: '0.65rem', marginBottom: '1.4rem' }}>
        {QUICK_REPLIES.map((reply, idx) => {
          const isSelected = selectedMessage === reply && !customNote.trim();
          return (
            <button
              key={idx}
              type="button"
              onClick={() => {
                setSelectedMessage(reply);
                setCustomNote('');
              }}
              style={{
                textAlign: 'left',
                padding: '0.75rem 1.1rem',
                borderRadius: '16px',
                background: isSelected
                  ? 'linear-gradient(135deg, rgba(244, 114, 182, 0.25), rgba(45, 106, 79, 0.35))'
                  : 'rgba(14, 24, 18, 0.6)',
                border: isSelected
                  ? '1.5px solid #f472b6'
                  : '1px solid rgba(82, 183, 136, 0.25)',
                color: isSelected ? '#ffffff' : '#b7e4c7',
                fontSize: '0.84rem',
                lineHeight: 1.45,
                cursor: 'pointer',
                transition: 'all 0.2s ease',
                display: 'flex',
                alignItems: 'center',
                gap: '0.65rem',
              }}
            >
              <Heart
                size={14}
                color={isSelected ? '#f472b6' : 'rgba(183, 228, 199, 0.4)'}
                fill={isSelected ? '#f472b6' : 'none'}
                style={{ flexShrink: 0 }}
              />
              <span>{reply}</span>
            </button>
          );
        })}
      </div>

      {/* Custom Note Input */}
      <div style={{ marginBottom: '1.5rem' }}>
        <label
          htmlFor="customNote"
          style={{
            display: 'block',
            fontSize: '0.78rem',
            letterSpacing: '0.12em',
            textTransform: 'uppercase',
            color: '#fbcfe8',
            marginBottom: '0.5rem',
            fontWeight: 600,
          }}
        >
          Or type your personal reply:
        </label>
        <textarea
          id="customNote"
          rows={3}
          value={customNote}
          onChange={(e) => setCustomNote(e.target.value)}
          placeholder="Write your sweet words for Shubham here... 🍃✨"
          style={{
            width: '100%',
            padding: '0.85rem 1rem',
            borderRadius: '16px',
            background: 'rgba(9, 17, 13, 0.85)',
            border: '1px solid rgba(244, 114, 182, 0.3)',
            color: '#fce7f3',
            fontSize: '0.88rem',
            fontFamily: 'inherit',
            resize: 'vertical',
            outline: 'none',
            boxShadow: 'inset 0 2px 6px rgba(0,0,0,0.5)',
          }}
          onFocus={(e) => {
            e.currentTarget.style.borderColor = '#f472b6';
            e.currentTarget.style.boxShadow = '0 0 15px rgba(244, 114, 182, 0.25)';
          }}
          onBlur={(e) => {
            e.currentTarget.style.borderColor = 'rgba(244, 114, 182, 0.3)';
            e.currentTarget.style.boxShadow = 'inset 0 2px 6px rgba(0,0,0,0.5)';
          }}
        />
      </div>

      {/* Submit Button */}
      <button
        type="button"
        onClick={handleSendMail}
        style={{
          width: '100%',
          padding: '0.95rem 1.8rem',
          borderRadius: '50px',
          background: 'linear-gradient(135deg, #f472b6 0%, #db2777 50%, #2d6a4f 100%)',
          border: 'none',
          color: '#ffffff',
          fontWeight: 700,
          fontSize: '0.95rem',
          letterSpacing: '0.08em',
          cursor: 'pointer',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          gap: '0.65rem',
          boxShadow: '0 10px 30px rgba(244, 114, 182, 0.45)',
          transition: 'all 0.25s ease',
        }}
        onMouseEnter={(e) => {
          e.currentTarget.style.transform = 'translateY(-2px) scale(1.02)';
          e.currentTarget.style.boxShadow = '0 14px 40px rgba(244, 114, 182, 0.65)';
        }}
        onMouseLeave={(e) => {
          e.currentTarget.style.transform = 'translateY(0px) scale(1)';
          e.currentTarget.style.boxShadow = '0 10px 30px rgba(244, 114, 182, 0.45)';
        }}
      >
        <Send size={18} />
        <span>Send Birthday Reply via Email 💌</span>
        <Sparkles size={16} />
      </button>

      {/* Feedback Toast */}
      {isSent && (
        <div
          style={{
            marginTop: '1.2rem',
            padding: '0.85rem 1.2rem',
            borderRadius: '16px',
            background: 'rgba(45, 106, 79, 0.45)',
            border: '1px solid #74c69d',
            display: 'flex',
            alignItems: 'center',
            gap: '0.65rem',
            color: '#e8f5e9',
            fontSize: '0.85rem',
            animation: 'fadeIn 0.3s ease',
          }}
        >
          <CheckCircle2 size={18} color="#74c69d" />
          <span>Opening your email client... Shubham will receive your birthday love! 💖</span>
        </div>
      )}
    </div>
  );
}
