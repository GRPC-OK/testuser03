# TestUser03 - Security Best Practices Application

✅ **이 저장소는 보안 모범사례를 적용한 안전한 애플리케이션입니다.**

## 보안 강화 요소들

### 🔒 Secure Coding
- ✅ Parameterized queries (SQL Injection 방지)
- ✅ Input validation & sanitization (XSS 방지)
- ✅ Secure cryptography (bcrypt, crypto.randomBytes)
- ✅ XSS prevention (DOMPurify 사용)
- ✅ Path traversal protection
- ✅ CSRF protection
- ✅ Rate limiting

### 🐳 Container Security
- ✅ Latest stable images
- ✅ Non-root user
- ✅ Multi-stage builds
- ✅ Minimal attack surface
- ✅ Health checks
- ✅ Security headers

### 📦 Dependencies
- ✅ Latest secure versions
- ✅ Regular security audits
- ✅ Minimal dependencies
- ✅ Automated vulnerability scanning

## 사용법
```bash
npm install
npm run dev