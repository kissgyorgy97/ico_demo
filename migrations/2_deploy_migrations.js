const TestTokenSale = artifacts.require('./TestTokenSale');
const TestToken = artifacts.require('./TestToken.sol');



module.exports = function(deployer) {
    // deployment steps 
    deployer.deploy(TestToken);
    deployer.deploy(TestTokenSale, TestToken, 0xd240e4cc96710f306824a4c1614a3303dff18abe, 1000);
  };