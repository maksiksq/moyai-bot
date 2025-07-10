const { SlashCommandBuilder } = require('discord.js');
const {removeChannelFromWhitelist} = require("../../configManager");

module.exports = {
    data: new SlashCommandBuilder()
        .setName('unwhitelist')
        .setDescription('Removes allowed channels for moaificiation')
        .addChannelOption(option =>
            option.setName('channel').setDescription('The channel to banish').setRequired(true)),
    async execute(interaction) {
        const channel = interaction.options.getChannel('channel');
        const channelID = channel.id;

        removeChannelFromWhitelist(interaction.guild.id, channelID);
        await interaction.reply(`Banished ${channel}\n`);
    },
};