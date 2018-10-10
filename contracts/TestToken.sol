pragma solidity ^0.4.24;

import "openzeppelin-solidity/contracts/token/ERC20/MintableToken.sol";
import "openzeppelin-solidity/contracts/token/ERC20/CappedToken.sol";
import "openzeppelin-solidity/contracts/token/ERC20/PausableToken.sol";

contract TestToken is CappedToken, PausableToken {
    string public name = "TEST";
    string public symbol = "TT";
    uint8 public decimals = 18;
    // Special propeties
    bool public tradingStarted = false;

    event TradeStarted();
  /**
  * @dev modifier that throws if trading has not started yet
   */
    modifier hasStartedTrading() {
        require(tradingStarted);
        _;
    }
 
      
    constructor (uint256 cap) public CappedToken(cap) {}
        
  /**
  * @dev Allows the owner to enable the trading. This can not be undone
  */
    function startTrading() public onlyOwner returns (bool) {
        tradingStarted = true;
        emit TradeStarted();
        return true;
    }

    function trading() public view returns (bool) {
        return tradingStarted;
    }
  /**
  * @dev Allows anyone to transfer the Change tokens once trading has started
  * @param _to the recipient address of the tokens.
  * @param _value number of tokens to be transfered.
   */
    function transfer(address _to, uint _value) hasStartedTrading whenNotPaused public returns (bool) {
        return super.transfer(_to, _value);
    }

  /**
  * @dev Allows anyone to transfer the Change tokens once trading has started
  * @param _from address The address which you want to send tokens from
  * @param _to address The address which you want to transfer to
  * @param _value uint the amout of tokens to be transfered
   */
    function transferFrom(address _from, address _to, uint _value) hasStartedTrading whenNotPaused public returns (bool) {
        return super.transferFrom(_from, _to, _value);
    }
 
    function emergencyERC20Drain( ERC20 oddToken, uint amount ) public {
        oddToken.transfer(owner, amount);
    }

    function destroy() public onlyOwner {
        selfdestruct(owner); //Destruct the contract
       
    }
    
}
