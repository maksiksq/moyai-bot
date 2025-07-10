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
        // await message.channel.send('🗿🍷‎');
        if (Math.floor(Math.random()* 20) === 1) {
            await message.channel.send(`<:12561803841992171941:1392900883951390901>🍷‎`);
        } else {
            await message.channel.send(`🗿🍷‎`);;
        }
    },
};