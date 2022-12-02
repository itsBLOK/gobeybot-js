const { EmbedBuilder, ActionRowBuilder, ButtonBuilder, ButtonStyle } = require("discord.js");
const { EMBED_COLORS, SUPPORT_SERVER, DASHBOARD } = require("@root/config");
const { timeformat } = require("@helpers/Utils");
const os = require("os");
const { stripIndent } = require("common-tags");

/**
 * @param {import('@structures/BotClient')} client
 */
module.exports = (client) => {
  // STATS
  const guilds = client.guilds.cache.size;
  const channels = client.channels.cache.size;
  const users = client.guilds.cache.reduce((size, g) => size + g.memberCount, 0);

  // CPU
  const cores = os.cpus().length;
  const cpuUsage = `${(process.cpuUsage().user / 1024 / 1024).toFixed(2)} MB`;

  // RAM
  const botUsed = `${(process.memoryUsage().heapUsed / 1024 / 1024).toFixed(2)} MB`;
  const botAvailable = `${(os.totalmem() / 1024 / 1024 / 1024).toFixed(2)} GB`;
  const botUsage = `${((process.memoryUsage().heapUsed / os.totalmem()) * 100).toFixed(1)}%`;

  const overallUsed = `${((os.totalmem() - os.freemem()) / 1024 / 1024 / 1024).toFixed(2)} GB`;
  const overallAvailable = `${(os.totalmem() / 1024 / 1024 / 1024).toFixed(2)} GB`;
  const overallUsage = `${Math.floor(((os.totalmem() - os.freemem()) / os.totalmem()) * 100)}%`;

  const embed = new EmbedBuilder()
    .setTitle("Bot Information")
    .setColor(EMBED_COLORS.BOT_EMBED)
    .setThumbnail(client.user.displayAvatarURL())
    .setDescription(`Gobey is the advanced chatbot that has all the features you need to create the best chat experience for your audience.`)
    .addFields(
      {
        name: "CPU",
        value: stripIndent`
        ❯ **Cores:** ${cores}
        ❯ **Usage:** ${cpuUsage}
        `,
        inline: true,
      },
      {
        name: "Bot's RAM",
        value: stripIndent`
        ❯ **Used:** ${botUsed}
        ❯ **Available:** ${botAvailable}
        ❯ **Usage:** ${botUsage}
        `,
        inline: true,
      },
      {
        name: "Overall RAM",
        value: stripIndent`
        ❯ **Used:** ${overallUsed}
        ❯ **Available:** ${overallAvailable}
        ❯ **Usage:** ${overallUsage}
        `,
        inline: true,
      },
      {
        name: "Uptime",
        value: "```" + timeformat(process.uptime()) + "```",
        inline: false,
      })
      .setFooter({text: 'Gobey Bot • Copyright © 2022 Skyware Inc.',});

  // Buttons
  let components = [];
  
  if (DASHBOARD.enabled) {
    components.push(
      new ButtonBuilder().setLabel("Dashboard").setURL(DASHBOARD.baseURL).setStyle(ButtonStyle.Link).setDisabled(true)
    );
  }
  components.push(new ButtonBuilder().setLabel("Documentation").setEmoji("➡️").setURL("https://docs.gobeybot.xyz/getting-started").setStyle(ButtonStyle.Link).setDisabled(true));
  components.push(new ButtonBuilder().setLabel("Help Center").setEmoji("1008778395020185643").setURL("https://support.gobeybot.xyz/help/contact").setStyle(ButtonStyle.Link).setDisabled(true));
  if (SUPPORT_SERVER) {
    components.push(new ButtonBuilder().setLabel("Support Server").setEmoji("1006530589979062334").setURL(SUPPORT_SERVER).setStyle(ButtonStyle.Link));
  }
  
  let buttonsRow = new ActionRowBuilder().addComponents(components);

  return { embeds: [embed], components: [buttonsRow] };
};
