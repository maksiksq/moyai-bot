const fs = require("fs");
const path = require("path");

const configPath = path.join(__dirname, 'storage/serverConfig.json');

const defaultConfig = {enabled: true, raremode: false, whitelist: []};

const loadConfig = () => {
    if (!fs.existsSync(configPath)) return {};
    return JSON.parse(fs.readFileSync(configPath, 'utf8'));
}

const saveConfig = (config) => {
    // something is wrong, it crashed the bot once.
    // Not going to spend time finding out what tho,
    // but here's some duct tape maybe it helps
    if (typeof config !== 'object' || config === null) {
        console.error("saveConfig: Refused to save invalid config:", config);
        return;
    }

    fs.writeFileSync(configPath, JSON.stringify(config, null, 2));
}

const getServerConfig = (guildID) => {
    const config = loadConfig();
    return config[guildID] || defaultConfig;
}

const toggleEnabled = (guildID, value) => {
    const config = loadConfig();

    if (!config[guildID]) {
        config[guildID] = { ...defaultConfig };
    }

    config[guildID].enabled = value === 'on';

    saveConfig(config);
}

const updateWhitelist = (guildID, channelID) => {
    const config = loadConfig();

    if (!config[guildID]) {
        config[guildID] = { ...defaultConfig };
    }

    if (!config[guildID].whitelist.includes(channelID)) {
        config[guildID].whitelist.push(channelID);
    }

    saveConfig(config)
}

const removeChannelFromWhitelist = (guildID, channelID) => {
    const config = loadConfig();

    if (!config[guildID]) return;

    config[guildID].whitelist = config[guildID].whitelist.filter(whitelist => whitelist !== channelID);

    saveConfig(config);
}

const toggleRaremode = (guildID, value) => {
    const config = loadConfig();

    if (!config[guildID]) {
        config[guildID] = { ...defaultConfig };
    }

    config[guildID].raremode = value === 'on';

    saveConfig(config);
}

module.exports = {
    getServerConfig: getServerConfig,
    updateWhitelist: updateWhitelist,
    removeChannelFromWhitelist: removeChannelFromWhitelist,
    toggleEnabled: toggleEnabled,
    toggleRaremode: toggleRaremode
}