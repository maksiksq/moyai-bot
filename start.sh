git pull
pnpm install
npx pm2 restart moyai-bot || npx pm2 start index.js --name "moyai-bot" --update-env