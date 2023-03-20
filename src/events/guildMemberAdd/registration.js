module.exports = (client, WL_Member) => {
  try {
    if (WL_Member.guild.id === "941349087905738832") {
      const FunWS = client.guilds.cache.get("1006185918769672242");
      const WL = client.guilds.cache.get("941349087905738832");
      const getGuildRole = (guild, roleName) => {
        const role = guild.roles.cache.find((role) => role.name === roleName);
        return role;
      };
      const message = `
  Привет, ${WL_Member.user.username}! Ты попал на сервер Warspear Ladder. Здесь ты можешь принять участие в различных активностях, которые оргнанизуют такие же любители пвп, как и ты. Продвигайся по рейтингу, сражайся в турнирных или приватных боях, учавствуй в конкурсах, зарабатывай золото на ставках!
  Первым делом загляни в каналы "как начать", "правила" и "новости", чтобы подробнее узнать о сервере.`;
      FunWS.members
        .fetch(WL_Member.id)
        .then(async (member) => {
          await WL_Member.send(message);

          member.roles.cache.each(async (role) => {
            if (role.name != "@everyone") {
              const WL_Role = getGuildRole(WL, role.name);
              await WL_Member.roles.add(WL_Role);
            }
          });
          const DB_user = await client.Users.findOne({ userId: WL_Member.id });
          if (DB_user == null) {
            const newUser = new client.Users({
              nickname: member.nickname,
              userId: WL_Member.id,
              rating2v2: 1200,
              rating3v3: 1200,
              rank: "FreshBlood",
              k2v2: 40,
              k3v3: 40,
              defeats2v2: 0,
              victories2v2: 0,
              winrate2v2: 0,
              defeats3v3: 0,
              victories3v3: 0,
              winrate3v3: 0,
            });
            newUser.save();
          }
          const FreshBloodRole = getGuildRole(WL, "FreshBlood");

          await WL_Member.roles.add(FreshBloodRole);
          await WL_Member.setNickname(member.nickname);
        })
        .catch((error) => {
          console.log(
            `зашел челик, который не зареган на fanWs - ${WL_Member.user.username}`
          );
          if (error.message == "Unknown Member") {
            const additionalMessage = `Ты читаешь это сообщение, потому что не зарегистрирован в Ладдере. Чтобы сделать это, тебе нужно сперва зарегистрироваться на сервере Fan Warspear Online(сделать это можно в канале "авторизация") - https://discord.gg/fan-ws-ru. После чего, выйди из сервера Warspear Ladder и зайди в него снова, твой профиль будет создан автоматически. В противном случае, ты не сможешь пользоваться функционалом Ладдера. Если тебе что-то непонятно, задай вопрос в чате или лично Helnex#0201`;
            WL_Member.send(additionalMessage);
          }
        });
    }
  } catch (error) {
    // WL.members.fetch(WL_Member.id).then((member) => {
    //   console.log(member);
    // });
    console.log(error);
  }
};
