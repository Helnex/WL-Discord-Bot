const mongoose = require("mongoose");
const schema = mongoose.Schema;

const GuildMemberSchema = new schema({
  nickname: String,
  id: String,
  absence: Number,
  normBuffs: Number,
  govnoBuffs: Number,
});

const GuildMemberModel = mongoose.model("GuildMember", GuildMemberSchema);
module.exports = { GuildMemberModel };
