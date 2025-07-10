const {SlashCommandBuilder, PermissionFlagsBits} = require('discord.js');
const {updateWhitelist, toggleEnabled} = require("../../configManager");

module.exports = {
    data: new SlashCommandBuilder()
        .setName('on/off')
        .setDescription('Toggle the bot on/off')
        .addStringOption(option =>
            option.setName('toggle')
                .setDescription('Choose on or off')
                .setRequired(true)
                .addChoices(
                    { name: 'On', value: 'on'},
                    { name: 'Off', value: 'off'}
                )
        )
        .setDefaultMemberPermissions(PermissionFlagsBits.Administrator),
    async execute(interaction) {
        const toggle = interaction.options.getString('toggle');

        if (toggle === 'on') {
            await toggleEnabled(interaction.guild.id, 'on');
        } else if (toggle === 'off') {
            await toggleEnabled(interaction.guild.id, 'off');
        }
    },
};