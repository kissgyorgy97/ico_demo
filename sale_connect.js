/**
 * IMPLEMENTATION in javascript 
 * You have to declare these variables globally for the funtions
* const address = 'address of the contract that we are using in string';
* const abi = require('abi of the contract that we are using in a json file');
* const Web3 = require('web3');
* const web3 = new Web3(); <--(here you can set the provider)
*/
const Web3 = require('web3');



function getOwnerOfContract(web3, address, abi, callback) {
    var res
    const TestTokenSale =  new web3.eth.Contract(abi, address);
          
       
    try {
        TestTokenSale.methods.owner().call((error, res) => {
            if (!error) {
                callback(res, 0);   
            }
            else {
                callback(null, error);
                }
            });
    } catch (err) {
        callback(0, err);
    }
}

function getRateOfSale(web3, address, abi, callback) {
    var res
    const TestTokenSale =  new web3.eth.Contract(abi, address);
          
       
    try {
       TestTokenSale.methods.rate().call((error, res) =>  {
            if (!error) {
                callback(res, 0);   
            }
            else {
                callback(null, error);
                }
            });
    } catch (err) {
        callback(0, err);
    }
}





function getToken(web3, address, abi, callback) {
    var res
    const TestTokenSale =  new web3.eth.Contract(abi, address);
        // initiate contract for an address
    
            try {
                TestTokenSale.methods.token().call((error, res) => {
                    if (!error) {
                        callback(res, 0);   
                    }
                    else {
                        callback(null, error);
                        }
                    });
            } catch (err) {
                callback(0, err);
            }
        }



function raisedInEther(web3, address, abi, callback) {
   
    const TestTokenSale =  new web3.eth.Contract(abi, address);

            try {
                TestTokenSale.methods.raised().call((error, res) => {
                    if (!error) {
                        
                        callback(res, 0);   
                    }
                    else {
                        callback(null, error);
                        }
                    });
            } catch (err) {
                callback(0, err);
            }
        }


function calcAmount(web3, address, abi, value, callback) {
    
    const TestTokenSale =  new web3.eth.Contract(abi, address);

            try {
                TestTokenSale.methods.calcAmount(value).call((error, res) => {
                    if (!error) {
                        
                        callback(res, 0);   
                    }
                    else {
                        callback(null, error);
                        }
                    });
            } catch (err) {
                callback(0, err);
            }
        }
        

    
 
        function withdraw(web3, calleraddress, privateKey, address, abi, callback) {
            var res
                                                       
            const TestTokenSale =  new web3.eth.Contract(abi, address);
            try {
                web3.eth.getTransactionCount(calleraddress).then( (nonce) => {
                    let encodedABI = TestTokenSale.methods.withdraw().encodeABI();
             TestTokenSale.methods.withdraw().estimateGas({ 
                from: calleraddress }, (error, gasEstimate) => {
                  let tx = {
                    to: address,
                    gas: gasEstimate + 200000,
                    data: encodedABI,
                    nonce: nonce
                  };
                  web3.eth.accounts.signTransaction(tx, privateKey, (error, res) => {
                    if (res == null) {callback(error, null); 
                    } 
                    else {
                      let tran = web3.eth.sendSignedTransaction(res.rawTransaction);
                      tran.on('transactionHash', (txhash) =>
                       {
                        callback(0, txhash); 
                        });
                     }
                   })
                 })
              })
        
            } catch (err) {
                callback(err, 0);
            }
        }  
   
        
        function buyTokens(web3, sign_address, sign_privateKey, sign_privateKey, address, abi, callback) {
                                               
            const TestTokenSale =  new web3.eth.Contract(abi, address);
            try {
                 (nonce) => {
                    let encodedABI = TestTokenSale.methods.sendTransaction({from:sign_address, to: address,to: value}).encodeABI();
                TestTokenSale.methods.sendTransaction({from:sign_address, to: address,to: value}).estimateGas({ 
                from: calleraddress }, (error, gasEstimate) => {
                  let tx = {
                    to: address,
                    gas: gasEstimate + 200000,
                    data: encodedABI,
                    nonce: nonce
                  };
                  web3.eth.accounts.signTransaction(tx, sign_privateKey, (error, res) => {
                    if (res == null) {callback(error, null); 
                    } 
                    else {
                      let tran = web3.eth.sendSignedTransaction(res.rawTransaction);
                      tran.on('transactionHash', (txhash) =>
                       {
                        callback(0, txhash); 
                        });
                     }
                   })
                 })
              }
            
            } catch (err) {
                callback(err, 0);
            }
        }   
      
                           
module.exports = {
    getOwnerOfContract,
    getRateOfSale,
    getToken,
    raisedInEther,
    calcAmount,
    withdraw,
    buyTokens
  }