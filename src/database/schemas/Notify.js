const mongoose =require("mongoose");

const Schema = new mongoose.Schema({
    guild_id: reqString,
    twitch: {
        enable: Boolean,
        channel: String,
        twitchChannelName: String,
    },
    youtube: {
        enable: Boolean,
        channel: String,
        youtubeChannelID: String
    },
    reddit: {
        enable: Boolean,
        channel: String,
        subredditName: String
    }
})

const Model = mongoose.model("giveaways", Schema);
module.exports = Model;