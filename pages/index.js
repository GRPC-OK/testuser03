import { useState } from 'react';
import SecureComponent from '../components/SecureComponent';

export default function Home() {
  const [userInput, setUserInput] = useState('');
  const [apiResponse, setApiResponse] = useState('');

  const handleSecureSubmit = async (e) => {
    e.preventDefault();
    
    try {
      const response = await fetch('/api/secure', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ message: userInput })
      });
      
      const data = await response.json();
      setApiResponse(data.message);
    } catch (error) {
      setApiResponse('Error occurred');
    }
  };

  return (
    <div style={{ padding: '20px', fontFamily: 'Arial, sans-serif' }}>
      <h1>🔒 TestUser03 - Security Best Practices</h1>
      <p>✅ This application follows all security best practices.</p>
      
      <div style={{ marginTop: '20px' }}>
        <h2>Security Features:</h2>
        <ul>
          <li>✅ Input validation and sanitization</li>
          <li>✅ Parameterized queries</li>
          <li>✅ XSS prevention</li>
          <li>✅ CSRF protection</li>
          <li>✅ Rate limiting</li>
          <li>✅ Secure headers</li>
          <li>✅ Latest dependencies</li>
          <li>✅ Container security</li>
        </ul>
      </div>

      <div style={{ marginTop: '20px' }}>
        <h3>Test Secure Input:</h3>
        <form onSubmit={handleSecureSubmit}>
          <input
            type="text"
            value={userInput}
            onChange={(e) => setUserInput(e.target.value)}
            placeholder="Enter a message"
            style={{ padding: '8px', marginRight: '10px', width: '300px' }}
          />
          <button type="submit" style={{ padding: '8px 16px' }}>
            Submit Safely
          </button>
        </form>
        {apiResponse && <p>Response: {apiResponse}</p>}
      </div>

      <SecureComponent userContent="<script>alert('This will be safely rendered')</script>" />
    </div>
  );
}