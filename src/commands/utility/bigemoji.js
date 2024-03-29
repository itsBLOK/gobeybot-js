const { parseEmoji, EmbedBuilder, ApplicationCommandOptionType } = require("discord.js");
const { EMBED_COLORS } = require("@root/config.js");
const { parse } = require("twemoji-parser");

/**
 * @type {import("@structures/Command")}
 */
module.exports = {
  name: "bigemoji",
  description: "Enlarge an emoji",
  category: "UTILITY",
  botPermissions: ["EmbedLinks"],
  command: {
    enabled: true,
    usage: "<emoji>",
    aliases: ["enlarge"],
    minArgsCount: 1,
  },
  slashCommand: {
    enabled: true,
    options: [
      {
        name: "emoji",
        description: "Emoji to enlarge",
        type: ApplicationCommandOptionType.String,
        required: true,
      },
    ],
  },

  async messageRun(message, args) {
    const emoji = args[0];
    const response = getEmoji(message.author, emoji);
    await message.safeReply(response);
  },

  async interactionRun(interaction) {
    const emoji = interaction.options.getString("emoji");
    const response = getEmoji(interaction.user, emoji);
    await interaction.followUp(response);
  },
};

function getEmoji(user, emoji) {
  const custom = parseEmoji(emoji);

  const embed = new EmbedBuilder()
    .setColor(EMBED_COLORS.BOT_EMBED)
    .setFooter({ text: `Requested by ${user.tag} • ${user.id}` });

  if (custom.id) {
    embed.setImage(`https://cdn.discordapp.com/emojis/${custom.id}.${custom.animated ? "gif" : "png"}`);
    return { embeds: [embed] };
  }

  const embedError = new EmbedBuilder()
    .setColor(EMBED_COLORS.ERROR)
    .setDescription('<:redTick:862442953447440414> **Not a valid emoji**')

  const parsed = parse(emoji, { assetType: "png" });
  if (!parsed[0]) return { embeds: [embedError] };

  embed.setImage(parsed[0].url);
  return { embeds: [embed] };
}
