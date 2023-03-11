const mongoose = require("mongoose");
const schema = mongoose.Schema;

const BattleLogsSchema = new schema({
  matchNumber: Number,
});

const BattleLogsModel2v2 = mongoose.model("2v2BattleLogs", BattleLogsSchema);
module.exports = { BattleLogsModel2v2 };
