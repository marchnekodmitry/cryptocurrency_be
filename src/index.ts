import express from 'express';
import bodyParser from 'body-parser';

import CryptocurrencyController from '@/controllers/cryptocurrency';

import errorMiddleware from './middlewares/error';
import syntaxErrorMiddleware from './middlewares/syntaxError';
import Database from './database';
import CryptocurrencyRepository from './repositories/cryptocurrency';

const app = express();

const PORT = 3103;

const main = async () => {
  const db = await Database.init();
  await new CryptocurrencyRepository(db.connection).initTables();

  const cc = new CryptocurrencyController(db);

  app.use(bodyParser.json({
    limit: '100kb',
    type: '*/*'
  }));
  app.use(syntaxErrorMiddleware);

  app.use(cc.router);

  app.use(errorMiddleware);

  app.listen(PORT, () => {
    console.log(`App listening at http://localhost:${PORT}`);
  });
};

main();
