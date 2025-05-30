import React from 'react';
import { sanitizeHTML } from '../utils/validation';

// 🔒 XSS 방지가 적용된 안전한 React 컴포넌트
function SecureComponent({ userContent }) {
  
  // 🔒 안전한 방식으로 사용자 콘텐츠 렌더링
  const safeContent = sanitizeHTML(userContent);
  
  return (
    <div style={{ marginTop: '20px', padding: '15px', border: '1px solid #ccc' }}>
      <h3>🔒 Secure User Content Rendering</h3>
      
      {/* 🔒 텍스트로만 렌더링 (HTML 실행 방지) */}
      <div>
        <strong>Raw input (safe text rendering):</strong>
        <p style={{ backgroundColor: '#f5f5f5', padding: '10px' }}>
          {userContent}
        </p>
      </div>
      
      {/* 🔒 sanitized HTML (안전하게 처리된 경우에만) */}
      {safeContent && (
        <div>
          <strong>Sanitized content:</strong>
          <div 
            style={{ backgroundColor: '#e8f5e8', padding: '10px' }}
            dangerouslySetInnerHTML={{ __html: safeContent }} 
          />
        </div>
      )}
      
      <p style={{ fontSize: '12px', color: '#666' }}>
        ✅ This component safely handles user input and prevents XSS attacks.
      </p>
    </div>
  );
}

export default SecureComponent;