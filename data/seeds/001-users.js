const bcrypt = require("bcrypt");

exports.seed = function(knex) {
  // Deletes ALL existing entries
  return knex("users")
    .del()
    .then(function() {
      // Inserts seed entries
      return knex("users").insert([
        {
          username: "chrisbonifacio",
          password: bcrypt.hashSync("newyork", 8),
          department: "Web Dev"
        },
        {
          username: "marymairena",
          password: bcrypt.hashSync("miami", 8),
          department: "Physics"
        },
        {
          username: "kenneth",
          password: bcrypt.hashSync("connecticut", 8),
          department: "Music"
        },
        {
          username: "daniel",
          password: bcrypt.hashSync("newyork", 8),
          department: "Music"
        }
      ]);
    });
};
