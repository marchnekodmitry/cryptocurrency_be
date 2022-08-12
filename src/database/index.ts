import mysql from 'mysql2/promise';

class Database {
  public connection: mysql.Connection;

  private constructor(connection: mysql.Connection) {
    this.connection = connection;
  }

  static init = async (): Promise<Database> => {
    const connection = await mysql.createConnection({
      host: process.env.HOST,
      user: process.env.USER,
      password: process.env.PASSWORD,
      database: process.env.DATABASE,
    });

    console.log('Database connected');

    return new Database(connection);
  };
}

export default Database;
