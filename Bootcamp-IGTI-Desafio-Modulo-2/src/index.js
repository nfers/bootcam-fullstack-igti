import express from 'express';
import routes from './routes/index.js';
import swaggerUi from 'swagger-ui-express';
import { swaggerDocument } from './document.js';

const app = express();

app.use(express.json());

app.use('/grades', routes);
app.use('/doc', swaggerUi.serve, swaggerUi.setup(swaggerDocument));

app.listen(3333);