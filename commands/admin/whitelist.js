const { SlashCommandBuilder, PermissionFlagsBits } = require('discord.js');
const {updateWhitelist} = require("../../configManager");

module.exports = {
    data: new SlashCommandBuilder()
        .setName('whitelist')
        .setDescription('Adds allowed channels for moaificiation')
        .addChannelOption(option =>
            option.setName('channel').setDescription('The channel to whitelist').setRequired(true))
        .setDefaultMemberPermissions(PermissionFlagsBits.Administrator),
    async execute(interaction) {
        const channel = interaction.options.getChannel('channel');
        const channelID = channel.id;

        updateWhitelist(interaction.guild.id, channelID);
        await interaction.reply(`Whitelist updated with ${channel}\n`);
    },
};