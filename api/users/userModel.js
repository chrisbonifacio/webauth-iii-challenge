const knex = require("knex");
const knexConfig = require("../../knexfile");
const db = knex(knexConfig.development);

module.exports = {
  find,
  findBy,
  add
};

function find(id) {
  if (id) {
    return db("users")
      .select("*")
      .first()
      .where({ id: id });
  } else {
    return db("users");
  }
}

function findBy(filter) {
  return db("users")
    .select("*")
    .first()
    .where(filter);
}

async function add(user) {
  const { username } = user;

  try {
    await db("users").insert(user);
    return findBy({ username });
  } catch (error) {
    return { error: "username is already taken" };
  }
}
