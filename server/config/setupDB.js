import pool from "./db.js";

const createTables = async () => {
  try {
    const usersTable = `
      CREATE TABLE IF NOT EXISTS users (
        id SERIAL PRIMARY KEY,
        username VARCHAR(50) NOT NULL,
        email VARCHAR(100) UNIQUE NOT NULL,
        password VARCHAR(255) NOT NULL,
        profile_picture TEXT,
        interests VECTOR(1536),
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
      );
    `;

    const matchesTable = `
      CREATE TABLE IF NOT EXISTS matches (
        id SERIAL PRIMARY KEY,
        user1_id INT REFERENCES users(id) ON DELETE CASCADE,
        user2_id INT REFERENCES users(id) ON DELETE CASCADE,
        matched_on TIMESTAMP DEFAULT CURRENT_TIMESTAMP
      );
    `;

    const chatsTable = `
      CREATE TABLE IF NOT EXISTS chats (
        id SERIAL PRIMARY KEY,
        match_id INT REFERENCES matches(id) ON DELETE CASCADE,
        sender_id INT REFERENCES users(id) ON DELETE CASCADE,
        message TEXT NOT NULL,
        sent_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
      );
    `;

    const audioTraitsTable = `
      CREATE TABLE IF NOT EXISTS audio_traits (
        id SERIAL PRIMARY KEY,
        user_id INT REFERENCES users(id) ON DELETE CASCADE,
        audio_vector VECTOR(1536),
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
      );
    `;

    // Execute table creation queries
    await pool.query(usersTable);
    await pool.query(matchesTable);
    await pool.query(chatsTable);
    await pool.query(audioTraitsTable);

    console.log("✅ Database tables created successfully");
  } catch (err) {
    console.error("❌ Database setup error:", err);
  } finally {
    pool.end(); // Close the connection after running the script
  }
};

// Run the function
createTables();
