import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import { validateEmail, validatePassword } from '../../utils/validation';
import { getSecureConfig } from '../../utils/config';

// 🔒 안전한 인증 API
export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  const { email, password } = req.body;

  // 🔒 입력 검증
  if (!validateEmail(email) || !validatePassword(password)) {
    return res.status(400).json({ error: 'Invalid credentials format' });
  }

  try {
    // 🔒 안전한 패스워드 해싱 비교 (실제로는 DB에서 가져와야 함)
    const hashedPassword = '$2b$12$LQv3c1yqBWVHxkd0LHAkCOYz6TtxMQJqhN8/LeM5K/z7qF9.rQ2.S'; // "password123"
    const isValid = await bcrypt.compare(password, hashedPassword);

    if (!isValid || email !== 'admin@example.com') {
      return res.status(401).json({ error: 'Invalid credentials' });
    }

    // 🔒 안전한 JWT 토큰 생성
    const config = getSecureConfig();
    const token = jwt.sign(
      { 
        userId: 1, 
        email: email,
        iat: Math.floor(Date.now() / 1000)
      },
      config.JWT_SECRET,
      { 
        expiresIn: '1h',
        issuer: 'secure-app',
        audience: 'secure-app-users'
      }
    );

    // 🔒 보안 헤더와 함께 응답
    res.setHeader('X-Content-Type-Options', 'nosniff');
    res.status(200).json({ 
      success: true, 
      token,
      expiresIn: 3600
    });

  } catch (error) {
    res.status(500).json({ error: 'Authentication failed' });
  }
}