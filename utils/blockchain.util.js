import axios from 'axios';
import { BlockChain } from 'health-chain/src/modules/blockchain.module';
import { TxAPI } from 'health-chain/src/modules/tx.api';

const KEY_URL = 'https://curefit-api.netlify.app/.netlify/functions/server/prod/api/v1';

export default class BlockchainUtil {
  blockchainInstance = new BlockChain();
  txApiInstance = new TxAPI();
  walletKeys = [];

  constructor() {
    this.blockchainInstance.setDifficulty = 1;
    this.generateWalletKeys();
  }

  addMiningReward(miningReward) {
    this.blockchainInstance.setMiningReward = miningReward;
  }

  minePendingTransactions() {
    this.blockchainInstance.minePendingTransactions(this.walletKeys[0].publicKey);
  }

  addressIsFromCurrentUser(address) {
    return address === this.walletKeys[0].publicKey;
  }

  generateWalletKeys() {
    try {
      axios
        .get(KEY_URL + '/getkey')
        .then((res) => {
          this.walletKeys.push({
            keyObj: res.data.key,
            publicKey: res.data.publicKey,
            privateKey: res.data.privateKey,
          });
          // console.log(this.walletKeys);
        })
        .catch((err) => console.log(err.message));
    } catch (error) {
      return console.log(error.message);
    }
  }

  getPendingTransactions() {
    return this.blockchainInstance.pendingTransactions;
  }

  addTransaction(tx) {
    this.blockchainInstance.addTransactions(tx);
  }
}
