import mysql from 'mysql2/promise';

class Database {
  public connection: mysql.Connection;

  private constructor(connection: mysql.Connection) {
    this.connection = connection;
  }

  static init = async (): Promise<Database> => {
    const connection = await mysql.createConnection({
      host: process.env.DB_HOST,
      user: process.env.DB_USER,
      password: process.env.DB_PASSWORD,
      database: process.env.DB_NAME,
    });

    console.log('Database connected');

    return new Database(connection);
  };
}

export default Database;
