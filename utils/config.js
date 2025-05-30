import dotenv from 'dotenv';

// 🔒 환경변수 안전 로딩
dotenv.config();

export function getSecureConfig() {
  const requiredEnvVars = [
    'JWT_SECRET',
    'DATABASE_URL'
  ];

  // 🔒 필수 환경변수 검증
  for (const envVar of requiredEnvVars) {
    if (!process.env[envVar]) {
      throw new Error(`Missing required environment variable: ${envVar}`);
    }
  }

  return {
    JWT_SECRET: process.env.JWT_SECRET,
    DATABASE_URL: process.env.DATABASE_URL,
    NODE_ENV: process.env.NODE_ENV || 'development',
    PORT: parseInt(process.env.PORT || '3000', 10),
    RATE_LIMIT_WINDOW: parseInt(process.env.RATE_LIMIT_WINDOW || '900000', 10), // 15분
    RATE_LIMIT_MAX: parseInt(process.env.RATE_LIMIT_MAX || '100', 10)
  };
}