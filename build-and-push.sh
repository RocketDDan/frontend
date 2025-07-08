# 멀티 플랫폼 빌드 쉘

# chmod +x build-and-push.sh
# './build-and-push.sh' 로 실행
docker buildx create --use   # 처음 한 번만
docker buildx build \
  --platform linux/amd64 \
  -t hanol98/runners-hi-frontend:latest \
  --push .
