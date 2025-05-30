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

  const { message } = req.body;

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

  // 기본적인 입력 정리 (XSS 방지)
  const cleanMessage = message
    .trim()
    .replace(/[<>]/g, '') // 기본적인 HTML 태그 제거
    .substring(0, 100); // 추가 길이 제한

  // 안전한 응답
  const response = {
    message: `Safely processed: ${cleanMessage}`,
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