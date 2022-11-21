const config = require("@root/config");

module.exports = {
  ADMIN: {
    name: "Admin",
    image: "https://cdn-icons-png.flaticon.com/512/5803/5803307.png",
    emoji: "⚙️",
  },
  AUTOMOD: {
    name: "Automod",
    enabled: config.AUTOMOD.ENABLED,
    image: "https://assets-global.website-files.com/5f9072399b2640f14d6a2bf4/632a24dc0918d34459738418_AutoMod-Final-Blog-Author-p-500.png",
    emoji: "🤖",
  },
  ECONOMY: {
    name: "Economy",
    enabled: config.ECONOMY.ENABLED,
    image: "https://cdn-icons-png.flaticon.com/512/845/845703.png",
    emoji: "🪙",
  },
  FUN: {
    name: "Fun",
    image: "https://cdn-icons-png.flaticon.com/512/6359/6359280.png",
    emoji: "😂",
  },
  GIVEAWAY: {
    name: "Giveaway",
    enabled: config.GIVEAWAYS.ENABLED,
    image: "https://cdn-icons-png.flaticon.com/512/864/864763.png",
    emoji: "🎉",
  },
  IMAGE: {
    name: "Image",
    enabled: config.IMAGE.ENABLED,
    image: "https://cdn-icons-png.flaticon.com/512/1829/1829589.png",
    emoji: "🖼️",
  },
  INFORMATION: {
    name: "Information",
    image: "https://icons.iconarchive.com/icons/graphicloads/100-flat/128/information-icon.png",
    emoji: "🪧",
  },
  MODERATION: {
    name: "Moderation",
    enabled: config.MODERATION.ENABLED,
    image: "https://cdn-icons-png.flaticon.com/512/1659/1659091.png",
    emoji: "🔨",
  },
  MUSIC: {
    name: "Music",
    enabled: config.MUSIC.ENABLED,
    image: "https://cdn-icons-png.flaticon.com/512/875/875590.png",
    emoji: "🎵",
  },
   OWNER: {
     name: "Owner",
     image: "https://cdn-icons-png.flaticon.com/512/1877/1877263.png",
     emoji: "🔑",
   },
  SOCIAL: {
    name: "Social",
    image: "https://cdn-icons-png.flaticon.com/512/8946/8946707.png",
    emoji: "🫂",
  },
  STATS: {
    name: "Statistics",
    enabled: config.STATS.ENABLED,
    image: "https://cdn-icons-png.flaticon.com/512/893/893220.png",
    emoji: "📈",
  },
  SUGGESTION: {
    name: "Suggestion",
    enabled: config.SUGGESTIONS.ENABLED,
    image: "https://cdn-icons-png.flaticon.com/512/2190/2190538.png",
    emoji: "📝",
  },
  TICKET: {
    name: "Ticket Module",
    enabled: config.TICKET.ENABLED,
    image: "https://cdn-icons-png.flaticon.com/512/2067/2067153.png",
    emoji: "🎫",
  },
  ANNOUNCEMENT: {
    name: "Announcement",
    enabled: config.ANNOUNCEMENT.ENABLED,
    image: "https://cdn-icons-png.flaticon.com/512/1040/1040216.png",
    emoji: "📢",
  },
  UTILITY: {
    name: "Utility",
    image: "https://cdn-icons-png.flaticon.com/512/2965/2965333.png",
    emoji: "🛠",
  },
};
