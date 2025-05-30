import crypto from 'crypto';
import bcrypt from 'bcrypt';

// 🔒 안전한 암호화 유틸리티

// 🔒 강력한 해시 함수
export function secureHash(data) {
  return crypto.createHash('sha256').update(data).digest('hex');
}

// 🔒 안전한 난수 생성
export function generateSecureToken(length = 32) {
  return crypto.randomBytes(length).toString('hex');
}

// 🔒 안전한 패스워드 해싱
export async function hashPassword(password) {
  const saltRounds = 12;
  return await bcrypt.hash(password, saltRounds);
}

// 🔒 패스워드 검증
export async function verifyPassword(password, hash) {
  return await bcrypt.compare(password, hash);
}

// 🔒 HMAC 서명 생성
export function createHMACSignature(data, secret) {
  return crypto.createHmac('sha256', secret).update(data).digest('hex');
}

// 🔒 HMAC 서명 검증
export function verifyHMACSignature(data, signature, secret) {
  const expectedSignature = createHMACSignature(data, secret);
  return crypto.timingSafeEqual(
    Buffer.from(signature, 'hex'),
    Buffer.from(expectedSignature, 'hex')
  );
}

// 🔒 안전한 UUID 생성
export function generateSecureUUID() {
  return crypto.randomUUID();
}