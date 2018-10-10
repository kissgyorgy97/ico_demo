const TestTokenSale = artifacts.require('./TestTokenSale');
const TestToken = artifacts.require('./TestToken.sol');



module.exports = function(deployer) {
    // deployment steps 
    
    deployer.deploy(TestToken,2000 * (10 ** 18)).then(function() {
      return deployer.deploy(TestTokenSale, TestToken.address, 1000, 1539180000, 1545724800);
    });
  }