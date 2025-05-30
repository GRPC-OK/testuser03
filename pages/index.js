import { useState } from 'react';

export default function Home() {
  const [input, setInput] = useState('');
  const [result, setResult] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    // 클라이언트 측 기본 검증
    if (!input.trim()) {
      setResult('Please enter a message');
      return;
    }

    try {
      const response = await fetch('/api/secure', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ message: input })
      });
      
      if (!response.ok) {
        throw new Error('Request failed');
      }
      
      const data = await response.json();
      setResult(data.message);
    } catch (error) {
      setResult('An error occurred');
    }
  };

  return (
    <div style={{ 
      padding: '20px', 
      fontFamily: 'Arial, sans-serif',
      maxWidth: '600px',
      margin: '0 auto'
    }}>
      <h1>🔒 TestUser03 - Secure Application</h1>
      
      <div style={{ marginBottom: '20px' }}>
        <h2>Security Features:</h2>
        <ul>
          <li>✅ Latest dependencies (no vulnerabilities)</li>
          <li>✅ Input validation and sanitization</li>
          <li>✅ Proper error handling</li>
          <li>✅ Secure Docker configuration</li>
          <li>✅ Non-root container user</li>
          <li>✅ Multi-stage build</li>
        </ul>
      </div>

      <div style={{ marginBottom: '20px' }}>
        <h3>Test Secure Input:</h3>
        <form onSubmit={handleSubmit}>
          <div style={{ marginBottom: '10px' }}>
            <input
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder="Enter a message (max 100 chars)"
              maxLength={100}
              style={{ 
                padding: '8px', 
                width: '300px',
                border: '1px solid #ccc',
                borderRadius: '4px'
              }}
            />
          </div>
          <button 
            type="submit"
            style={{
              padding: '8px 16px',
              backgroundColor: '#007bff',
              color: 'white',
              border: 'none',
              borderRadius: '4px',
              cursor: 'pointer'
            }}
          >
            Submit Safely
          </button>
        </form>
        
        {result && (
          <div style={{ 
            marginTop: '15px', 
            padding: '10px',
            backgroundColor: '#f8f9fa',
            border: '1px solid #dee2e6',
            borderRadius: '4px'
          }}>
            <strong>Response:</strong> {result}
          </div>
        )}
      </div>

      <div style={{ 
        marginTop: '30px',
        padding: '15px',
        backgroundColor: '#d4edda',
        border: '1px solid #c3e6cb',
        borderRadius: '4px'
      }}>
        <h4>✅ This application demonstrates:</h4>
        <ul>
          <li>Secure coding practices</li>
          <li>Input validation on both client and server</li>
          <li>Proper error handling</li>
          <li>Latest security updates</li>
          <li>Container security best practices</li>
        </ul>
      </div>
    </div>
  );
}