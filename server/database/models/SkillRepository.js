const AbstractRepository = require("./AbstractRepository");

class SkillRepository extends AbstractRepository {
  constructor() {
    // Call the constructor of the parent class (AbstractRepository)
    // and pass the table name "item" as configuration
    super({ table: "skills" });
  }

  create(skill) {
    const { name, type, level } = skill;
    return this.database.query(
      `INSERT INTO skills (name, type, level) VALUES (?, ?, ?)`,
      [name, type, level]
    );
  }

}

module.exports = SkillRepository;
