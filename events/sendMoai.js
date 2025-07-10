const { Events } = require('discord.js');

const cooldowns = new Map();

module.exports = {
    name: Events.MessageCreate,
    async execute(message) {
        if (message.author.bot) return;

        const cooldownTime = 300;
        const now = Date.now();
        const channelId = message.channel.id;

        if (cooldowns.has(channelId)) {
            const lastTime = cooldowns.get(channelId);
            if (now - lastTime < cooldownTime) {
                // get rate limited weakling
                return;
            }
        }

        cooldowns.set(channelId, now);
        await message.channel.send('Hiyaaaaaaaaaa');
    },
};