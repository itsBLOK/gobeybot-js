const { getUser } = require("@schemas/User");
const Discord = require("discord.js");
const { getSettings } = require("@schemas/Guild");

async function fetchGuild(guildID, client, guilds) {
  const guild = client.guilds.cache.get(guildID);
  const settings = await getSettings(guild);
  return { ...guild, ...settings._doc, ...guilds.find((g) => g.id === guild.id) };
}

async function fetchUser(userData, client, query) {
  if (userData.guilds) {
    userData.guilds.forEach((guild) => {
      if (guild.permissions) {
        const perms = new Discord.PermissionsBitField(BigInt(guild.permissions));
        if (perms.has("ManageGuild")) guild.admin = true;
      }
      guild.settingsUrl = client.guilds.cache.get(guild.id)
        ? `/manage/${guild.id}/`
        : `https://discordapp.com/oauth2/authorize?client_id=${client.user.id}&scope=bot+applications.commands&permissions=296150887519&guild_id=${guild.id}`;
      guild.statsUrl = client.guilds.cache.get(guild.id)
        ? `/stats/${guild.id}/`
        : `https://discordapp.com/oauth2/authorize?client_id=${client.user.id}&scope=bot+applications.commands&permissions=296150887519&guild_id=${guild.id}`;
      guild.iconURL = guild.icon
        ? `https://cdn.discordapp.com/icons/${guild.id}/${guild.icon}.png?size=128`
        : "https://github.com/jtagt/mee6/blob/master/website/static/img/no_logo.png";
      guild.displayed = query ? guild.name.toLowerCase().includes(query.toLowerCase()) : true;
    });
    userData.displayedGuilds = userData.guilds.filter((g) => g.displayed && g.admin);
    if (userData.displayedGuilds.length < 1) {
      delete userData.displayedGuilds;
    }
  }
  const user = await client.users.fetch(userData.id);
  user.displayAvatar = user.displayAvatarURL();
  const userDb = await getUser(user);
  const userInfos = { ...user, ...userDb, ...userData, ...user.presence };
  return userInfos;
}

module.exports = { fetchGuild, fetchUser };
