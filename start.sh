PORT="$1"

kill -9 $(lsof -ti ":$PORT") 2>/dev/null
git pull
npm i
node index.js