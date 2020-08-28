import express from 'express'
import AccountController from '../database/controller/AccountController';
// import { AccountController } from '../database/controller/AccountController'


const routes = express.Router()

routes.get('/account', AccountController.index);
routes.post('/account/dep', AccountController.deposit);


export default routes;