import React, { useState } from 'react';

const VerifyPage = () => {
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [code, setCode] = useState('');
  const [status, setStatus] = useState(null);
  const [message, setMessage] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (code.length !== 9) return alert("Please enter the 9-character code.");

    setIsLoading(true);
    setStatus(null);

    try {
      const response = await fetch('/api/auth/verify', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name: name,
          phone: phone,
          code: code
        })
      });

      const data = await response.json();
      setStatus(data.status);
      setMessage(data.message);
    } catch (error) {
      setStatus("invalid");
      setMessage("Server error. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  const handleCodeChange = (e) => {
    const cleanValue = e.target.value.replace(/[^a-zA-Z0-9]/g, '');
    setCode(cleanValue.toUpperCase());
  };

  const getStyles = () => {
    // Solid colors for the result boxes so they are easy to read over the image
    if (status === 'valid') return { bg: '#28a745', color: '#ffffff', icon: '✅' };
    if (status === 'invalid') return { bg: '#dc3545', color: '#ffffff', icon: '❌' };
    return null;
  };

  const styles = getStyles();

  return (
    <div style={{
      minHeight: '100vh',
      backgroundImage: "url('/1.png')",
      backgroundSize: 'cover',
      backgroundPosition: 'center',
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      fontFamily: "'Segoe UI', Tahoma, Geneva, Verdana, sans-serif",
      padding: '20px'
    }}>

      {/* COMPLETELY TRANSPARENT CARD (No blur, just a tiny dark tint so text pops) */}
      <div style={{
        backgroundColor: 'rgba(0, 0, 0, 0.2)', // 20% transparent black
        padding: '40px',
        borderRadius: '20px',
        width: '100%',
        maxWidth: '420px',
        border: '1px solid rgba(255, 255, 255, 0.3)'
      }}>

        {/* BRIGHT WHITE TEXT WITH SHADOW FOR MAXIMUM CLARITY */}
        <div style={{ textAlign: 'center', marginBottom: '25px' }}>
          <h1 style={{
            margin: '0 0 5px 0',
            color: '#ffffff',
            fontSize: '28px',
            fontWeight: '800',
            letterSpacing: '1px',
            textShadow: '0px 2px 8px rgba(0,0,0,1)' // Strong black shadow behind white text
          }}>
            X AXE BREAKER
          </h1>
          <p style={{
            margin: 0,
            color: '#dddddd',
            fontSize: '14px',
            textTransform: 'uppercase',
            letterSpacing: '2px',
            textShadow: '0px 1px 4px rgba(0,0,0,1)'
          }}>
            Product Authentication
          </p>
        </div>

        {status !== 'valid' && (
          <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '15px' }}>

            <div>
              <label style={labelStyle}>FULL NAME</label>
              {/* SOLID WHITE INPUT BOXES FOR PERFECT READABILITY */}
              <input
                type="text"
                required
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="Enter your full name"
                style={inputStyle}
              />
            </div>

            <div>
              <label style={labelStyle}>PHONE NUMBER</label>
              <input
                type="tel"
                required
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                placeholder="Enter your phone number"
                style={inputStyle}
              />
            </div>

            <div>
              <label style={labelStyle}>SCRATCH CODE (9 DIGITS)</label>
              <input
                type="text"
                maxLength="9"
                required
                value={code}
                onChange={handleCodeChange}
                placeholder="e.g., 213jnk443"
                style={{ ...inputStyle, letterSpacing: '3px', fontWeight: 'bold' }}
                disabled={isLoading}
              />
            </div>

            {/* SOLID WHITE BUTTON */}
            <button
              type="submit"
              disabled={isLoading || code.length !== 9}
              style={{
                width: '100%',
                padding: '16px',
                backgroundColor: (isLoading || code.length !== 9) ? 'rgba(255,255,255,0.5)' : '#ffffff',
                color: '#111111',
                border: 'none',
                borderRadius: '10px',
                fontSize: '16px',
                fontWeight: '700',
                letterSpacing: '1px',
                cursor: (isLoading || code.length !== 9) ? 'not-allowed' : 'pointer',
                marginTop: '10px'
              }}
            >
              {isLoading ? 'Verifying...' : 'VERIFY PRODUCT'}
            </button>
          </form>
        )}

        {styles && (
          <div style={{
            marginTop: '25px',
            padding: '15px',
            backgroundColor: styles.bg,
            color: styles.color,
            borderRadius: '12px',
            fontWeight: '600',
            fontSize: '15px',
            textAlign: 'center',
            boxShadow: '0 4px 15px rgba(0,0,0,0.5)' // Shadow on result box so it doesn't blend into background
          }}>
            {styles.icon} {message}
          </div>
        )}

        <div style={{
          marginTop: '25px',
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          gap: '6px',
          fontSize: '11px',
          color: 'rgba(255, 255, 255, 0.8)',
          textShadow: '0px 1px 3px black'
        }}>
          <span>🔒</span> End-to-End Encrypted & Secured
        </div>

      </div>
    </div>
  );
};

// White text labels with black shadow
const labelStyle = {
  display: 'block',
  fontSize: '13px',
  fontWeight: '600',
  color: '#ffffff',
  marginBottom: '8px',
  textShadow: '0px 1px 4px rgba(0,0,0,1)'
};

// Solid white boxes with black text (Easiest to read and type in!)
const inputStyle = {
  width: '100%',
  boxSizing: 'border-box',
  padding: '14px 15px',
  border: 'none',
  borderRadius: '10px',
  fontSize: '15px',
  outline: 'none',
  backgroundColor: '#ffffff', // Solid white background
  color: '#000000' // Black typing text
};

export default VerifyPage;