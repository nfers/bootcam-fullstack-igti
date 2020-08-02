import { Router } from 'express'

const routes = Router();

routes.get('/api/devices/:id', function (req, res) {


 res.send('ok');

});


export default routes;