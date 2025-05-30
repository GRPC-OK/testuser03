# TestUser03 - Security Best Practices Application

✅ **이 저장소는 보안 모범사례를 적용한 안전한 애플리케이션입니다.**

## 보안 강화 요소들

### 🔒 Secure Coding
- ✅ 입력 검증 및 정리 (XSS 방지)
- ✅ 적절한 오류 처리
- ✅ HTTP 메서드 검증
- ✅ Content-Type 검증
- ✅ 길이 제한

### 🐳 Container Security
- ✅ 최신 Node.js 20 이미지
- ✅ Non-root 사용자 실행
- ✅ 멀티스테이지 빌드
- ✅ 최소한의 공격 표면

### 📦 Dependencies
- ✅ 최신 안전한 버전만 사용
- ✅ 최소한의 의존성
- ✅ 정기적인 보안 업데이트

## 사용법
```bash
npm install
npm run dev