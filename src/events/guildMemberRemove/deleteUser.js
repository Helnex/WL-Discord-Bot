module.exports = async (client, member) => {
  try {
    const userId = member.id;

    await client.Users.deleteOne({ userId: userId });
  } catch (error) {
    console.log(error);
  }
};
