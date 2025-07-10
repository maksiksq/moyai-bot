const {SlashCommandBuilder, PermissionFlagsBits} = require('discord.js');
const {updateWhitelist, toggleEnabled, toggleRaremode} = require("../../configManager");

module.exports = {
    data: new SlashCommandBuilder()
        .setName('raremode')
        .setDescription('If raremode is enabled the bot will only send a message with a 1/1000 chance.')
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
            await toggleRaremode(interaction.guild.id, 'on');
            await interaction.reply('Enabled raremode, now raring alive.');
        } else if (toggle === 'off') {
            await toggleRaremode(interaction.guild.id, 'off');
            await interaction.reply('No more raremode for you.');
        }
    },
};