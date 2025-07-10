const { Events } = require('discord.js');
const {getServerConfig} = require("../configManager");

const cooldowns = new Map();

module.exports = {
    name: Events.MessageCreate,
    async execute(message) {
        if (message.author.bot) return;

        const channelId = message.channel.id;
        const config = getServerConfig(message.guild.id);

        if (!config.enabled) return; {}

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

        const sendNormal = async () => {
            await message.channel.send(`🗿🍷‎`);
        }

        const sendCool = async () => {
            await message.channel.send(`<:12561803841992171941:1392900883951390901>🍷‎`);
        }

        if (config.raremode && Math.floor(Math.random()* 1000) !== 1) {
            return;
        }

        const roll = Math.floor(Math.random()* 10) === 1;
        if (roll) {
            await sendCool();
        } else {
            await sendNormal();
        }
    },
};