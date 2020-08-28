import accountModel from "../models/Account";

class AccountController {
  async index(req, res) {
    const accounts = await accountModel.find();
    console.log(accountModel.findOne());

    return res.json(accounts);
  }

  async deposit(req, res) {
    try {
      const { agencia, conta, value } = req.body;

      if (value < 0) {
        res.status(400).send("Não é permitdo depósito de valores negativos");
        return;
      }

      const accountWithDeposit = await accountModel.findOneAndUpdate(
        { agencia, conta },
        { $inc: { balance: value } },
        { new: true }
      );

      if (!accountWithDeposit) {
        throw new Error("Agencia ou Conta errados");
      }

      res.status(200).send(accountWithDeposit);
    } catch (error) {
      res.status(500).send("Erro ao localizar conta ou agência");
      console.log(`Error to find account or banck branch: ${error}`);
    }
  }
}

export default new AccountController();
