# 🔒 보안 강화된 멀티스테이지 빌드
FROM node:20-alpine AS base

# 🔒 보안 업데이트 설치
RUN apk update && apk upgrade && apk add --no-cache dumb-init

# 🔒 non-root 사용자 생성
RUN addgroup -g 1001 -S nodejs
RUN adduser -S nextjs -u 1001

# 의존성 설치 단계
FROM base AS deps
WORKDIR /app

# 🔒 package files만 먼저 복사 (레이어 캐싱 최적화)
COPY package*.json ./
RUN npm ci --only=production && npm cache clean --force

# 빌드 단계
FROM base AS builder
WORKDIR /app

COPY package*.json ./
RUN npm ci

COPY . .
RUN npm run build

# 🔒 프로덕션 이미지
FROM base AS runner
WORKDIR /app

# 🔒 프로덕션 환경 설정
ENV NODE_ENV=production
ENV NEXT_TELEMETRY_DISABLED=1

# 🔒 non-root 사용자로 전환
USER nextjs

# 🔒 필요한 파일만 복사
COPY --from=builder --chown=nextjs:nodejs /app/.next/standalone ./
COPY --from=builder --chown=nextjs:nodejs /app/.next/static ./.next/static
COPY --from=builder --chown=nextjs:nodejs /app/public ./public

# 🔒 헬스체크 추가
COPY --chown=nextjs:nodejs healthcheck.js ./
HEALTHCHECK --interval=30s --timeout=3s --start-period=5s --retries=3 \
  CMD node healthcheck.js

# 🔒 포트 명시
EXPOSE 3000

# 🔒 dumb-init으로 안전한 프로세스 관리
ENTRYPOINT ["dumb-init", "--"]
CMD ["node", "server.js"]
