import crypto from 'crypto';
import fs from 'fs';

export default function handler(req, res) {
  // HTTP 메서드 검증
  if (req.method !== 'POST') {
    return res.status(405).json({ 
      error: 'Method not allowed' 
    });
  }

  // Content-Type 검증
  const contentType = req.headers['content-type'];
  if (!contentType || !contentType.includes('application/json')) {
    return res.status(400).json({ 
      error: 'Invalid content type' 
    });
  }

  // 요청 본문 검증
  if (!req.body || typeof req.body !== 'object') {
    return res.status(400).json({ 
      error: 'Invalid request body' 
    });
  }

  const { message, filename, algorithm } = req.body;

  // 입력 검증
  if (!message) {
    return res.status(400).json({ 
      error: 'Message is required' 
    });
  }

  if (typeof message !== 'string') {
    return res.status(400).json({ 
      error: 'Message must be a string' 
    });
  }

  // 길이 제한
  if (message.length > 100) {
    return res.status(400).json({ 
      error: 'Message too long (max 100 characters)' 
    });
  }

  // 취약점 1: 약한 암호화 알고리즘 사용 (semgrep: crypto.weak-hash)
  const hashAlgorithm = algorithm || 'md5'; // MD5는 취약한 해시 알고리즘
  const hash = crypto.createHash(hashAlgorithm);
  hash.update(message);
  const hashedMessage = hash.digest('hex');

  // 취약점 2: 경로 순회 취약점 (semgrep: path-traversal)
  if (filename) {
    try {
      // 사용자 입력을 직접 파일 경로로 사용 - 위험!
      const logPath = `/tmp/logs/${filename}`; 
      const logData = `${new Date().toISOString()}: ${message}\n`;
      fs.writeFileSync(logPath, logData, { flag: 'a' });
    } catch (error) {
      // 에러 정보를 그대로 노출 (정보 누출)
      console.log('File write error:', error.message);
    }
  }

  // 취약점 3: 하드코딩된 비밀키 (semgrep: hardcoded-secret)
  const secretKey = 'super-secret-key-123'; // 하드코딩된 비밀키
  const hmac = crypto.createHmac('sha256', secretKey);
  hmac.update(message);
  const signature = hmac.digest('hex');

  // 기본적인 입력 정리 (XSS 방지)
  const cleanMessage = message
    .trim()
    .replace(/[<>]/g, '') // 기본적인 HTML 태그 제거
    .substring(0, 100); // 추가 길이 제한

  // 안전한 응답
  const response = {
    message: `Safely processed: ${cleanMessage}`,
    hash: hashedMessage,
    signature: signature,
    algorithm: hashAlgorithm,
    timestamp: new Date().toISOString(),
    length: cleanMessage.length,
    status: 'success'
  };

  // 보안 헤더 설정
  res.setHeader('X-Content-Type-Options', 'nosniff');
  res.setHeader('X-Frame-Options', 'DENY');
  res.setHeader('Content-Type', 'application/json');

  res.status(200).json(response);
}