git pull
pnpm install
pnpm exec pm2 restart moyai-bot || pnpm exec pm2 start index.js --name "moyai-bot" --update-env