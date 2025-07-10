const { Events } = require('discord.js');
const {getServerConfig} = require("../configManager");

const cooldowns = new Map();

module.exports = {
    name: Events.MessageCreate,
    async execute(message) {
        if (message.author.bot) return;


        const channelId = message.channel.id;
        const config = getServerConfig(message.guild.id);

        if (config.whitelist.length > 0 && !config.whitelist.includes(channelId)) {
            return;
        }

        const cooldownTime = 300;
        const now = Date.now();

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