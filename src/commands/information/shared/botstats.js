const { EmbedBuilder, ActionRowBuilder, ButtonBuilder, ButtonStyle } = require("discord.js");
const { EMBED_COLORS, SUPPORT_SERVER, DASHBOARD } = require("@root/config");
const { timeformat } = require("@helpers/Utils");
const os = require("os");
const { stripIndent } = require("common-tags");

/**
 * @param {import('@structures/BotClient')} client
 */
module.exports = (client) => {
  const totalShards = `423`
  const usedShards = `${Math.floor(((os.totalmem() - os.freemem()) / os.totalmem()) * 100)}`;

  const embed = new EmbedBuilder()
    .setTitle("Bot Information")
    .setColor(EMBED_COLORS.BOT_EMBED)
    .setThumbnail(client.user.displayAvatarURL())
    .setDescription(`Gobey is an advanced chatbot that has all the features you need to create the best chat experience for your audience.`)
    .addFields(
      {
        name: "Verison",
        value: stripIndent`
        ❒  **Gobey:** v1.10.5-beta
        ❒  **Gobey API:** v1.0.0 
        ❒  **Go:** v1.19.4
        ❒  **discordgo:** v0.26.1(modified)
        `,
        inline: true,
      },
      {
        name: "Shard Info",
        value: stripIndent`
        ❒  **Used Shard:** ${usedShards}
        ❒  **Shard Latency**: ${client.ws.ping} ms
        ❒  **Available Shards:** ${totalShards}
        `,
        inline: true,
      },
      {
        name: "Licenses",
        value: "Gobey ❤️ Open Source\n https://oss.gobeybot.xyz/licenses",
        inline: false,
      },
      {
        name: "Uptime",
        value: "```" + timeformat(process.uptime()) + "```",
        inline: false,
      })
      .setTimestamp()
      .setFooter({text: 'via Gobey Bot Status API',});

  // Buttons
  let components = [];
  
  if (DASHBOARD.enabled) {
    components.push(
      new ButtonBuilder().setLabel("Dashboard").setURL(DASHBOARD.baseURL).setStyle(ButtonStyle.Link).setDisabled(true)
    );
  }
  components.push(new ButtonBuilder().setLabel("Documentation").setEmoji("➡️").setURL("https://docs.gobeybot.xyz/getting-started").setStyle(ButtonStyle.Link).setDisabled(true));
  components.push(new ButtonBuilder().setLabel("Status Page").setEmoji("📶").setURL("https://status.gobeybot.xyz/").setStyle(ButtonStyle.Link).setDisabled(true));
  components.push(new ButtonBuilder().setLabel("Help Center").setEmoji("1008778395020185643").setURL("https://support.gobeybot.xyz/hc/contact").setStyle(ButtonStyle.Link).setDisabled(true));
  if (SUPPORT_SERVER) {
    components.push(new ButtonBuilder().setLabel("Support Server").setEmoji("1006530589979062334").setURL(SUPPORT_SERVER).setStyle(ButtonStyle.Link));
  }
  
  let buttonsRow = new ActionRowBuilder().addComponents(components);

  return { embeds: [embed], components: [buttonsRow] };
};
