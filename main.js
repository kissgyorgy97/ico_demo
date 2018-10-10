const {
    getOwnerOfContract,
    getRateOfSale,
    getToken,
    raisedInEther,
    calcAmount,
    withdraw,
    buyTokens
  } = require('./sale_connect.js')

const address = '0xe95292aa7603bab506caab53f562b3856776faf7';
const json = require('./build/contracts/TestTokenSale.json')
const abi = json['abi'];
const Web3 = require('web3');
const web3 = new Web3(new Web3.providers.HttpProvider("http://localhost:8545"));
const amount = 1000;
const value = 1000000;
const sign_address = '0x5A8584CFc8aDA00F9b52dC4198AcBcd690446Aac';
const sign_privateKey ='0x5da0515e0e122d8620776213ef97e1e89bb0d6f68be5b363020c280c44ec89b7';

web3.eth.accounts.privateKeyToAccount('0x516b389d9ce4c68cb0a39e5fbecde52cec2c441c1c873e01fc5ff31e56126672');
web3.eth.defaultAccount = '0xCc7892277688404Ab4edf025CF7Ee6661371d9C4';
console.log(web3.eth.defaultAccount);



getOwnerOfContract(web3, address, abi, function(result , error) {
    if (error) {
        console.log(error);
      } else {
        console.log(result)
      }
})
getRateOfSale(web3, address, abi, function(result , error) {
    if (error) {
        console.log(error);
      } else {
        console.log(result)
      }
})
getToken(web3, address, abi, function(result , error) {
    if (error) {
        console.log(error);
      } else {
        console.log(result)
      }
})
raisedInEther(web3, address, abi, function(result , error) {
    if (error) {
        console.log(error);
      } else {
        console.log(result)
      }
})
calcAmount(web3, address, abi, amount, function(result , error) {
    if (error) {
        console.log(error);
      } else {
        console.log(result)
      }
})

