import express from 'express';
import 'express-async-errors';
import cors from 'cors';
import routes from './routes';
import routeErros from './errors';
const app = express();
app.use(cors());
app.use(express.json());
app.use(routes);
app.use(routeErros);

export default app;
