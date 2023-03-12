module.exports = (client, member) => {
  try {
    member.roles.set(["953699608821907456"]);
  } catch (error) {
    console.log(error);
  }
};
