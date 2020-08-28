"use strict"; function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }var _express = require('express'); var _express2 = _interopRequireDefault(_express);
var _configjs = require('./database/config.js'); var _configjs2 = _interopRequireDefault(_configjs);
var _accountsRouterjs = require('./routes/accountsRouter.js'); var _accountsRouterjs2 = _interopRequireDefault(_accountsRouterjs);

const app = _express2.default.call(void 0, )
const port = 3030

app.use(_express2.default.json())
app.use(_accountsRouterjs2.default)

app.listen(port, () => {
  console.log(`API running in port ${port}`)
})