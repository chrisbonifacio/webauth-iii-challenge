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

function add(user) {
  return db("users")
    .insert(user)
    .then(() => {
      return findByUserName(user.username);
    });
}
