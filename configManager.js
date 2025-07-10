const fs = require("fs");
const path = require("path");

const configPath = path.join(__dirname, 'storage/serverConfig.json');

const defaultConfig = {enabled: true, allowedChannels: []};

const loadConfig = () => {
    if (!fs.existsSync(configPath)) return {};
    return JSON.parse(fs.readFileSync(configPath, 'utf8'));
}

const saveConfig = (config) => {
    fs.writeFileSync(configPath, JSON.stringify(config, null, 2));
}

const getServerConfig = (guildID) => {
    const config = loadConfig();
    return config[guildID] || defaultConfig;
}

const updateServerConfig = (guildID, update) => {
    const config = loadConfig();
    const current = config[guildID] || defaultConfig;
    config[guildID] = {...current, ...update};
    saveConfig(config)
}

module.exports = {
    getServerConfig: getServerConfig,
    updateServerConfig: updateServerConfig
}