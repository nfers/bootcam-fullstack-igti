"use strict";Object.defineProperty(exports, "__esModule", {value: true}); function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }var _Account = require('../models/Account'); var _Account2 = _interopRequireDefault(_Account);

class AccountController {
  async index(req, res) {
    const accounts = await _Account2.default.find();

    return res.json(accounts);
  }
}

// const getAllAccounts = async (req, res) => {
//   try {
//     const accounts = await accountModel.find()

//     if (!accounts) {
//       res.status(200).json(accounts)
//     }
//   } catch (error) {
    
//   }
// }

exports. default = new AccountController();