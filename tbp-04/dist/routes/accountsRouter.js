"use strict";Object.defineProperty(exports, "__esModule", {value: true}); function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { newObj[key] = obj[key]; } } } newObj.default = obj; return newObj; } }var _express = require('express');
var _acountController = require('../database/controller/acountController'); var accountController = _interopRequireWildcard(_acountController);


const routes = _express.Router.call(void 0, )

routes.get('/account', accountController.index);


exports. default = routes;