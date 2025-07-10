const {SlashCommandBuilder, PermissionFlagsBits} = require('discord.js');
const {getServerConfig} = require("../../configManager");

module.exports = {
    data: new SlashCommandBuilder()
        .setName('list')
        .setDescription('List all whitelisted channels')
        .setDefaultMemberPermissions(PermissionFlagsBits.Administrator),
    async execute(interaction) {
        const config = getServerConfig(interaction.guild.id);

        if (!config.whitelist.length) {
            interaction.reply('No channels whitelisted, it\'s anarchy out there.')
        }

        interaction.reply(config.whitelist)

        const channels = config.whitelist.map(id => `<#${id}>`).join('\n');
        await interaction.reply(`📋 **Whitelisted channels:**\n${channels}`);
    },
};