const AbstractRepository = require("./AbstractRepository");

class UserRepository extends AbstractRepository {
  constructor() {
    // Call the constructor of the parent class (AbstractRepository)
    // and pass the table name "item" as configuration
    super({ table: "users" });
  }

  create(user) {
    const { firstname, lastname, email, password, role, cv, address } = user;
    return this.database.query(
      `INSERT INTO users (firstname, lastname, email, password, role, cv, address) VALUES (?, ?, ?, ?, ?, ?, ?)`,
      [firstname, lastname, email, password, role, cv, address]
    );
  }

  findByEmail(email) {
    return this.database.query(`select * from ${this.table} where email = ?`, [email]);
  }

  addSkill(idUser, idSkill) {
    return this.database.query(`INSERT INTO user_skills (id_user, id_skill) VALUES (?, ?)`, [idUser, idSkill]);
  }

}

module.exports = UserRepository;