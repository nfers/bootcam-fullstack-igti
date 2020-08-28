import accountModel from "../models/Account";

class AccountController {
  async index(req, res) {
    const accounts = await accountModel.find();
    console.log(accountModel.findOne());

    return res.json(accounts);
  }

  async delete(req, res) {
    try {
      const { agencia, conta } = req.body;

      const accountDeleted = await accountModel.deleteOne({ agencia, conta });

      if (accountDeleted.deletedCount === 0) {
        throw new Error("Agencia ou Conta errados");
      }

      const accountsInBrabch = await accountModel.countDocuments({ agencia });

      res.status(200).send({ contasNaAgencia: accountsInBrabch });
    } catch (error) {
      res.status(500).send("Erro ao localizar conta ou agência");
      console.log(`Error to find account or banck branch: ${error}`);
    }
  }

  async privateAccounts (req, res) {
    try {
      const accounts = await accountModel.aggregate([
        { $project: { _id: 0, agencia: 1, conta: 1, name: 1, balance: 1 } },
        {
          $group: {
            _id: '$agencia',
            maxBalance: { $max: '$balance' },
          },
        },
      ]);
  
      return res.status(200).send(accounts);
    } catch (error) {
      return res.status(500).send({ error: error.message });
    }
  };

  async highestBalance (req, res){
  try {
    const quantity = parseInt(req.params.quantity);

    const accounts = await accountModel.aggregate([
      { $project: { _id: 0, agencia: 1, conta: 1, name: 1, balance: 1 } },
      { $sort: { balance: -1 } },
      { $limit: quantity },
    ]);

    return res.status(200).send(accounts);
  } catch (error) {
    return res.status(500).send({ error: error.message });
  }
};
  async  lowestBalance(req, res) {
    try {
      const quantity = parseInt(req.params.quantity);
  
      const accounts = await accountModel.aggregate([
        { $project: { _id: 0, agencia: 1, conta: 1, balance: 1 } },
        { $sort: { balance: 1 } },
        { $limit: quantity },
      ]);
  
      return res.status(200).send(accounts);
    } catch (error) {
      return res.status(500).send({ error: error.message });
    }
  };
  
  async averageAgency(req, res) {
    try {
      const agencyParam = parseInt(req.params.agencia);

      console.log(req.params.agencia)
  
      const accounts = await accountModel.aggregate([
        { $match: { agencia: agencyParam } },
        { $group: { _id: '$agencia', average: { $avg: '$balance' } } },
      ]);
  
      return res.status(200).send(accounts);
    } catch (error) {
      return res.status(500).send({ error: error.message });
    }
  };

  async getBalanceFromAccount(req, res) {
    try {
      const {agencia, conta} = req.body

      const account = await accountModel.findOne({conta, agencia})
      
      if(!account) {
          throw new Error('Agencia ou Conta errados')
      }

      res.status(200).send(account)

  } catch (error) {
      res.status(500).send('Erro ao localizar conta ou agência')
      console.log(`Error to find account or banck branch: ${error}`)
  }
}

  async transfer (req, res) {
    try {
      const rate = 8;
      const {
        originAgency,
        originNumber,
        destinyAgency,
        destinyNumber,
        value,
      } = req.body;
  
      if (
        !originAgency ||
        !originNumber ||
        !value ||
        !destinyAgency ||
        !destinyNumber
      ) {
        throw new Error(
          `Enter object with properties 
            { originAgency, originNumber, value, destinyAgency, destinyNumber }`
        );
      }
  
      const query = {
        origin: { agencia: originAgency, conta: originNumber },
        destiny: { agencia: destinyAgency, conta: destinyNumber },
      };
      const project = { _id: 0, balance: 1 };
  
      const originNumberBalance = await accountModel.findOne(
        query.origin,
        project
      );
      if (!originNumberBalance) {
        return res.status(404).send({
          error: `Account not found in the collection, agencia: ${originAgency}, conta: ${originNumber}`,
        });
      }
  
      const destinyNumberBalance = await accountModel.findOne(
        query.destiny,
        project
      );
      if (!destinyNumberBalance) {
        return res.status(404).send({
          error: `Account not found in the collection, agency ${destinyAgency}, number: ${destinyNumber}`,
        });
      }
  
      let newValue = value;
      if (query.origin.agencia !== query.destiny.agencia) newValue += rate;
  
      if (originNumberBalance.balance - newValue < 0) {
        throw new Error(
          `There is not enough for transfer, balance: ${originNumberBalance.balance}`
        );
      }
  
      const newBalance = {
        $set: {
          balance: originNumberBalance.balance - newValue,
        },
      };
  
      await accountModel.updateOne(query.origin, newBalance);
  
      newBalance.$set.balance = destinyNumberBalance.balance + newValue;
      await accountModel.updateOne(query.destiny, newBalance);
  
      return res
        .status(200)
        .send({ balance: originNumberBalance.balance - newValue });
    } catch (error) {
      return res.status(500).send({ error: error.message });
    }
  };

  async draw(req, res) {
    try {
      const { agencia, conta, value } = req.body;

      if (value < 0) {
        res.status(400).send("Não é permitdo saque de valores negativos");
        return;
      }

      const account = await accountModel.findOne({ conta, agencia });

      if (!account) {
        throw new Error("Agencia ou Conta errados");
      }

      const newBalance = account.balance - value - 1;

      if (newBalance < 0) {
        res.status(400).send(`Saque não permitido: saldo insuficiente`);
        return;
      }

      const accountWithDraw = await accountModel.findOneAndUpdate(
        { agencia, conta },
        { $set: { balance: newBalance } },
        { new: true }
      );

      res.status(200).send(accountWithDraw);
    } catch (error) {
      res.status(500).send("Erro ao localizar conta ou agência");
      console.log(`Error to find account or banck branch: ${error}`);
    }
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
