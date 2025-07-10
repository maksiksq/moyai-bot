const { SlashCommandBuilder } = require('discord.js');
const {updateServerConfig} = require("../../configManager");

module.exports = {
    data: new SlashCommandBuilder()
        .setName('whitelist')
        .setDescription('Sets allowed channels for moaificiation')
        .addChannelOption(option =>
            option.setName('channel').setDescription('Add a whitelisted channel').setRequired(true)),
    async execute(interaction) {
        const channel = interaction.options.getChannel('channel');

        updateServerConfig(channel);
        await interaction.reply(`Whitelist updated with ${channel}\n`);
    },
};