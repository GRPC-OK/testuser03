import { useState } from 'react';

export default function Home() {
  const [input, setInput] = useState('');
  const [result, setResult] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!input.trim()) {
      setResult('Please enter a message');
      return;
    }

    try {
      const response = await fetch('/api/secure', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ message: input })
      });
      
      if (!response.ok) throw new Error('Request failed');
      
      const data = await response.json();
      setResult(data.message);
    } catch (error) {
      setResult('An error occurred');
    }
  };

  return (
    <div style={{ 
      backgroundColor: '#0d1117',
      color: '#fff',
      minHeight: '100vh',
      fontFamily: 'Segoe UI, Arial, sans-serif'
    }}>
      {/* Header */}
      <header style={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        padding: '1rem 2rem',
        borderBottom: '1px solid #30363d'
      }}>
        <div style={{ fontWeight: 'bold', fontSize: '1.25rem', color: '#ff8c00' }}>
          Intellisia🥕
        </div>
        <div style={{
          width: '3rem',
          height: '3rem',
          borderRadius: '50%',
          background: '#373c47'
        }}></div>
      </header>

      {/* Main Content */}
      <div style={{ maxWidth: '1200px', margin: '0 auto', padding: '2rem' }}>
        
        {/* Deployment Success Banner */}
        <div style={{
          background: '#238636',
          padding: '1rem 2rem',
          borderRadius: '8px',
          marginBottom: '2rem',
          display: 'flex',
          alignItems: 'center',
          gap: '1rem'
        }}>
          <div style={{ fontSize: '1.5rem' }}>✅</div>
          <div>
            <h2 style={{ margin: 0, fontSize: '1.2rem' }}>배포 완료!</h2>
            <p style={{ margin: '0.25rem 0 0 0', opacity: 0.9 }}>
              testuser03가 성공적으로 배포되었습니다. 모든 보안 검사를 통과했습니다.
            </p>
          </div>
        </div>

        {/* App Title */}
        <h1 style={{ fontSize: '2rem', marginBottom: '1rem' }}>
          🔒 TestUser03 - Secure Application
        </h1>
        
        {/* Security Status Cards */}
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))',
          gap: '1rem',
          marginBottom: '2rem'
        }}>
          <div style={{
            background: '#161b22',
            border: '1px solid #30363d',
            borderRadius: '8px',
            padding: '1.5rem'
          }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '1rem' }}>
              <span style={{ color: '#238636', fontSize: '1.2rem' }}>✅</span>
              <h3 style={{ margin: 0, fontSize: '1rem' }}>코드 정적 분석</h3>
            </div>
            <p style={{ margin: 0, color: '#8b949e', fontSize: '0.9rem' }}>
              SQL Injection, XSS 등 보안 취약점 없음
            </p>
            <div style={{
              marginTop: '0.5rem',
              padding: '0.25rem 0.75rem',
              background: '#238636',
              borderRadius: '12px',
              fontSize: '0.8rem',
              display: 'inline-block'
            }}>
              PASS
            </div>
          </div>

          <div style={{
            background: '#161b22',
            border: '1px solid #30363d',
            borderRadius: '8px',
            padding: '1.5rem'
          }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '1rem' }}>
              <span style={{ color: '#238636', fontSize: '1.2rem' }}>✅</span>
              <h3 style={{ margin: 0, fontSize: '1rem' }}>이미지 취약점 스캔</h3>
            </div>
            <p style={{ margin: 0, color: '#8b949e', fontSize: '0.9rem' }}>
              최신 안전한 의존성 사용, 1개 저위험 이슈
            </p>
            <div style={{
              marginTop: '0.5rem',
              padding: '0.25rem 0.75rem',
              background: '#238636',
              borderRadius: '12px',
              fontSize: '0.8rem',
              display: 'inline-block'
            }}>
              PASS
            </div>
          </div>

          <div style={{
            background: '#161b22',
            border: '1px solid #30363d',
            borderRadius: '8px',
            padding: '1.5rem'
          }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '1rem' }}>
              <span style={{ color: '#238636', fontSize: '1.2rem' }}>✅</span>
              <h3 style={{ margin: 0, fontSize: '1rem' }}>컨테이너 보안</h3>
            </div>
            <p style={{ margin: 0, color: '#8b949e', fontSize: '0.9rem' }}>
              Non-root 사용자, 멀티스테이지 빌드 적용
            </p>
            <div style={{
              marginTop: '0.5rem',
              padding: '0.25rem 0.75rem',
              background: '#238636',
              borderRadius: '12px',
              fontSize: '0.8rem',
              display: 'inline-block'
            }}>
              PASS
            </div>
          </div>
        </div>

        {/* Test Input Section */}
        <div style={{
          background: '#161b22',
          border: '1px solid #30363d',
          borderRadius: '8px',
          padding: '1.5rem'
        }}>
          <h3 style={{ margin: '0 0 1rem 0' }}>🧪 보안 기능 테스트</h3>
          <p style={{ color: '#8b949e', marginBottom: '1rem' }}>
            입력 검증 및 XSS 방지 기능을 테스트해보세요
          </p>
          
          <form onSubmit={handleSubmit}>
            <div style={{ marginBottom: '1rem' }}>
              <input
                type="text"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                placeholder="메시지를 입력하세요 (예: <script>alert('test')</script>)"
                maxLength={100}
                style={{
                  width: '100%',
                  padding: '0.75rem',
                  backgroundColor: '#0d1117',
                  border: '1px solid #30363d',
                  borderRadius: '6px',
                  color: '#fff',
                  fontSize: '1rem'
                }}
              />
            </div>
            <button 
              type="submit"
              style={{
                backgroundColor: '#238636',
                color: 'white',
                border: 'none',
                borderRadius: '6px',
                padding: '0.75rem 1.5rem',
                fontSize: '1rem',
                cursor: 'pointer'
              }}
            >
              안전하게 전송
            </button>
          </form>
          
          {result && (
            <div style={{
              marginTop: '1rem',
              padding: '1rem',
              backgroundColor: '#0d1117',
              border: '1px solid #30363d',
              borderRadius: '6px'
            }}>
              <strong>응답:</strong> {result}
            </div>
          )}
        </div>
      </div>

      {/* Footer */}
      <footer style={{
        backgroundColor: '#0d1117',
        color: '#8b949e',
        padding: '20px',
        fontSize: '14px',
        textAlign: 'center',
        borderTop: '1px solid #30363d',
        marginTop: '3rem'
      }}>
        <div style={{ marginBottom: '8px' }}>
          <span>© 2025 Intellisia, Inc.</span>
        </div>
      </footer>
    </div>
  );
}