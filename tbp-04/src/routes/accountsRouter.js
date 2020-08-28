import express from 'express'
import AccountController from '../database/controller/AccountController';
// import { AccountController } from '../database/controller/AccountController'

const routes = express.Router()

routes.get('/account', AccountController.index);
routes.get('/accounts/:agency', AccountController.averageAgency);
routes.post('/account/dep', AccountController.deposit);
routes.post('/account/draw', AccountController.draw);
routes.post('/account/transfer', AccountController.transfer);
routes.delete('/account', AccountController.delete);
routes.get('/account/balance', AccountController.getBalanceFromAccount);
routes.post('/account/privateAccounts', AccountController.privateAccounts);
routes.get('/accounts/highestBalance/:quantity', AccountController.highestBalance);
routes.get('/accounts/lowestBalance/:quantity', AccountController.lowestBalance);


export default routes;