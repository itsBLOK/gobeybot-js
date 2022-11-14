const { EmbedBuilder, ApplicationCommandOptionType } = require("discord.js");
const { EMBED_COLORS } = require("@root/config.js");
const { postToBin } = require("@helpers/HttpUtils");

/**
 * @type {import("@structures/Command")}
 */
module.exports = {
  name: "paste",
  description: "paste something in sourceb.in",
  cooldown: 5,
  category: "UTILITY",
  botPermissions: ["EmbedLinks"],
  command: {
    enabled: true,
    minArgsCount: 2,
    usage: "<title> <content>",
  },
  slashCommand: {
    enabled: true,
    options: [
      {
        name: "title",
        description: "title for your content",
        required: true,
        type: ApplicationCommandOptionType.String,
      },
      {
        name: "content",
        description: "content to be posted to bin",
        type: ApplicationCommandOptionType.String,
        required: true,
      },
    ],
  },

  async messageRun(message, args) {
    const title = args.shift();
    const content = args.join(" ");
    const response = await paste(content, title);
    await message.safeReply(response);
  },

  async interactionRun(interaction) {
    const title = interaction.options.getString("title");
    const content = interaction.options.getString("content");
    const response = await paste(content, title);
    await interaction.followUp(response);
  },
};
const embedError = new EmbedBuilder()
  .setColor(EMBED_COLORS.ERROR)
  .setDescription(`<:redTick:862442953447440414> **Something went wrong**`)

async function paste(content, title) {
  const response = await postToBin(content, title);
  if (!response) return { embeds: [embedError] };

  const embed = new EmbedBuilder()
    .setAuthor({ name: "Paste links" })
    .setDescription(`🔸 Normal: ${response.url}\n🔹 Raw: ${response.raw}`);

  return { embeds: [embed] };
}
