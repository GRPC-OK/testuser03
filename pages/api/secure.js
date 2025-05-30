import { validateInput, sanitizeInput } from '../../utils/validation';
import { applyRateLimit } from '../../middleware/rateLimit';

// 🔒 보안 강화된 API 엔드포인트
export default async function handler(req, res) {
  
  // 🔒 Rate limiting 적용
  try {
    await applyRateLimit(req, res);
  } catch {
    return res.status(429).json({ error: 'Too many requests' });
  }

  // 🔒 HTTP 메서드 검증
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  // 🔒 Content-Type 검증
  if (req.headers['content-type'] !== 'application/json') {
    return res.status(400).json({ error: 'Invalid content type' });
  }

  const { message } = req.body;

  // 🔒 입력 검증
  if (!validateInput(message)) {
    return res.status(400).json({ error: 'Invalid input' });
  }

  // 🔒 입력 sanitization
  const sanitizedMessage = sanitizeInput(message);

  // 🔒 안전한 응답
  const safeResponse = {
    message: `Safely processed: ${sanitizedMessage}`,
    timestamp: new Date().toISOString(),
    status: 'success'
  };

  // 🔒 보안 헤더 설정
  res.setHeader('X-Content-Type-Options', 'nosniff');
  res.setHeader('X-Frame-Options', 'DENY');
  res.setHeader('X-XSS-Protection', '1; mode=block');
  res.setHeader('Content-Type', 'application/json');

  res.status(200).json(safeResponse);
}