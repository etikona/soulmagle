import bcrypt from "bcrypt";
export class User {
  constructor(db) {
    this.db = db;
  }
  async create(email, password) {
    const hashedPassword = await bcrypt.hash(password, 10);
    return this.db.query(
      "INSERT INTO users (email, password) VALUES ($1, $2) RETURNING *",
      [email, hashedPassword]
    );
  }
  async findByEmail(email) {
    return this.db.query("SELECT * FROM users WHERE email = $1", [email]);
  }
}
