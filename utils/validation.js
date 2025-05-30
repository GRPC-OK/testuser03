import validator from 'validator';
import DOMPurify from 'dompurify';

// 🔒 포괄적인 입력 검증 유틸리티

// 🔒 이메일 검증
export function validateEmail(email) {
  if (!email || typeof email !== 'string') {
    return false;
  }
  return validator.isEmail(email) && email.length <= 254;
}

// 🔒 패스워드 검증
export function validatePassword(password) {
  if (!password || typeof password !== 'string') {
    return false;
  }
  
  // 최소 8자, 대문자, 소문자, 숫자, 특수문자 포함
  const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;
  return passwordRegex.test(password) && password.length <= 128;
}

// 🔒 일반 입력 검증
export function validateInput(input) {
  if (!input || typeof input !== 'string') {
    return false;
  }
  
  // 길이 제한 및 기본 검증
  if (input.length > 1000) {
    return false;
  }
  
  // 위험한 패턴 검사
  const dangerousPatterns = [
    /<script/i,
    /javascript:/i,
    /on\w+\s*=/i,
    /eval\(/i,
    /expression\(/i
  ];
  
  return !dangerousPatterns.some(pattern => pattern.test(input));
}

// 🔒 입력 sanitization
export function sanitizeInput(input) {
  if (!input || typeof input !== 'string') {
    return '';
  }
  
  // HTML 태그 제거 및 특수문자 이스케이프
  let sanitized = validator.escape(input);
  sanitized = sanitized.trim();
  sanitized = sanitized.substring(0, 1000); // 길이 제한
  
  return sanitized;
}

// 🔒 HTML 콘텐츠 sanitization (브라우저 환경에서만)
export function sanitizeHTML(html) {
  if (typeof window !== 'undefined' && DOMPurify) {
    return DOMPurify.sanitize(html);
  }
  return '';
}

// 🔒 파일명 검증
export function validateFilename(filename) {
  if (!filename || typeof filename !== 'string') {
    return false;
  }
  
  // 위험한 경로 문자 및 패턴 검사
  const dangerousPatterns = [
    /\.\./,
    /\//,
    /\\/,
    /:/,
    /\*/,
    /\?/,
    /"/,
    /</,
    />/,
    /\|/
  ];
  
  return !dangerousPatterns.some(pattern => pattern.test(filename)) && 
         filename.length <= 255;
}