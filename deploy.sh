# deploy using docker compose

cd ~/lms-public

git pull

if curl http://localhost:3000; then
  docker compose down
fi

docker compose up -d --build "api-server" "web-server"

echo "Deployment done!"
