import user from './routes/user';
import express from 'express';
import bodyParser from 'body-parser';
import swaggerUi from 'swagger-ui-express';
import swaggerdocs from '../swagger.json';
import loan from './routes/loan';
import repayment from './routes/repayment';

const app = express();

app.use(bodyParser.urlencoded({
    extended: true
}));
app.use(bodyParser.json());
app.use(user);
app.use(loan);
app.use(repayment);
app.get('/', (req, res) => res.status(200).json({
    status: 200,
    message: 'WELCOME TO QUICK CREDIT'
}));
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerdocs));
app.use('/*', (req, res) => res.status(404).send({
    status: 404,
    message: 'URL NOT FOUND',
}));

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}...`);
});

export default app;