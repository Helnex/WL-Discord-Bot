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
      const additionalMessage = `Ты читаешь это сообщение, потому что не зарегистрирован в Ладдере. Чтобы сделать это, тебе нужно сперва зарегистрироваться на сервере Fan Warspear Online(сделать это можно в канале "авторизация") - <https://discord.gg/ws-hanktemp>. После чего, тебе нужно будет подождать какое-то время, твой профиль будет создан автоматически. В противном случае, ты не сможешь пользоваться функционалом Ладдера. Если тебе что-то непонятно, задай вопрос в чате или лично Helnex#0201`;
      FunWS.members
        .fetch(WL_Member.id)
        .then(async (member) => {
          if (member.nickname == null) {
            await WL_Member.send(additionalMessage).catch((error) => {
              client.channels
                .fetch("941350867813171210") //пришедшие
                .then((channel) => {
                  channel.send(
                    `Привет, <@${WL_Member.id}>. Из-за того, что у тебя закрыта личка, я не смог отправить тебе инструкцию по регистрации в Ладдере, поэтому ищи ее в канале *как-начать*.`
                  );
                  console.log(
                    `Зашел челик у которого закрыт лс и он не зареган на fanWs - ${WL_Member.user.username}`
                  );
                })
                .catch(console.log((error) => console.log(error)));
            });
          } else {
            await WL_Member.send(message).catch((error) => {
              console.log(
                `Зашел челик у которого закрыт лс но он зареган на fanWs - ${WL_Member.user.username}`
              );
            });

            member.roles.cache.each(async (role) => {
              if (role.name != "@everyone") {
                const WL_Role = getGuildRole(WL, role.name);
                if (WL_Role != undefined) {
                  await WL_Member.roles.add(WL_Role);
                }
              }
            });
            const DB_user = await client.Users.findOne({
              userId: WL_Member.id,
            });
            if (DB_user == null) {
              const newUser = new client.Users({
                nickname: member.nickname,
                userId: WL_Member.id,
                rating1v1: 1200,
                rating2v2: 1200,
                rating3v3: 1200,
                rank: "FreshBlood",
                k1v1: 40,
                k2v2: 40,
                k3v3: 40,
                defeats1v1: 0,
                victories1v1: 0,
                winrate1v1: 0,
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
          }
        })
        .catch((error) => {
          console.log(
            `зашел челик, который не зареган на fanWs - ${WL_Member.user.username}`
          );
          if (error.message == "Unknown Member") {
            WL_Member.send(additionalMessage).catch((error) => {
              client.channels
                .fetch("941350867813171210") //пришедшие
                .then((channel) => {
                  channel.send(
                    `Привет, <@${WL_Member.id}>. Из-за того, что у тебя закрыта личка, я не смог отправить тебе инструкцию по регистрации в Ладдере, поэтому ищи ее в канале *как-начать*.`
                  );
                })
                .catch(console.log((error) => console.log(error)));
            });
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
