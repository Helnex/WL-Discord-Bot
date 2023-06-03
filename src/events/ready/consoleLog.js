module.exports = async (client) => {
  console.log(`${client.user.tag} заработал`);
  const Tkilla = client.guilds.cache.get("467176165027610634"); //ткила
  const FunWS = client.guilds.cache.get("1006185918769672242");

  // dbUsers.sort((a, b) => (a.nickname > b.nickname ? 1 : -1));
  // console.log(dbUsers);

  // const FunWS = client.guilds.cache.get("1006185918769672242");
  // FunWS.members.fetch().then((members) => {
  //   a = [];
  //   for (member of members) {
  //     const nickname = member[1].nickname;

  //     if (nickname != null && nickname.includes("[TkillaBoom]")) {
  //       a.push(nickname);
  //       console.log(nickname);
  //     }
  //   }
  //   console.log(a.length);
  // });

  // low - арена шмот
  // medium +9
  // god - фул вела
  // let members = [
  //   {
  //     name: "Helnex",
  //     class: "priest",
  //     items: "medium",
  //   },
  //   {
  //     name: "Abobus",
  //     class: "bd",
  //     items: "medium",
  //   },
  //   {
  //     name: "Tvin",
  //     class: "pal",
  //     items: "medium",
  //   },
  //   {
  //     name: "vidarr",
  //     class: "mag",
  //     items: "medium",
  //   },
  //   {
  //     name: "goga",
  //     class: "rei",
  //     items: "medium",
  //   },
  //   {
  //     name: "yakut",
  //     class: "mag",
  //     items: "medium",
  //   },
  //   {
  //     name: "solnyshko",
  //     class: "mag",
  //     items: "strong",
  //   },
  //   {
  //     name: "hibgi",
  //     class: "priest",
  //     items: "strong",
  //   },
  //   {
  //     name: "low",
  //     class: "druid",
  //     items: "strong",
  //   },
  //   {
  //     name: "stas",
  //     class: "pal",
  //     items: "strong",
  //   },
  //   {
  //     name: "gnida",
  //     class: "bd",
  //     items: "strong",
  //   },
  // ];
  // let party = [];
  // // в interaction должно быть что-то типа: prior1: '', prior2: '', prior3: '', prior4: '', leader's_nickname: '', group_strength: 'god/medium'
  // let p1 = "druid";
  // let p2 = "mag";
  // let p3 = "bd";
  // let p4 = "mag";
  // group_strength = "strong";

  // const isPrior = (userClass) => {
  //   if (userClass == p1) {
  //     p1 = "";
  //     return true;
  //   } else if (userClass == p2) {
  //     p2 = "";
  //     return true;
  //   } else if (userClass == p3) {
  //     p3 = "";
  //     return true;
  //   } else if (userClass == p4) {
  //     p4 = "";
  //     return true;
  //   }
  // };
  // const dontduble = (arr, element) => {
  //   flag = true;
  //   for (let i = 0; i < arr.length; i++) {
  //     if (element == arr[i]) {
  //       flag = false;
  //     }
  //   }
  //   return flag;
  // };
  // for (let i = 0; i < members.length; i++) {
  //   if (party.length != 4) {
  //     if (members[i].items == "strong") {
  //       if (isPrior(members[i].class) && dontduble(party, members[i])) {
  //         party.push(members[i]);
  //       }
  //     }
  //   } else {
  //     break;
  //   }
  // }

  // if (members.length != 4) {
  //   for (let i = 0; i < members.length; i++) {
  //     if (members[i].items == "medium") {
  //       if (isPrior(members[i].class) && dontduble(party, members[i])) {
  //         party.push(members[i]);
  //       }
  //     }
  //   }
  // }

  // console.log(p1, p2, p3, p4);
  // console.log(party);
};
