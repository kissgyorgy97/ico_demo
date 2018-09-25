pragma solidity ^0.4.24;

import "openzeppelin-solidity/contracts/ownership/Ownable.sol";
import "openzeppelin-solidity/contracts/math/SafeMath.sol";
import "./TestToken.sol";
import "openzeppelin-solidity/contracts/access/Whitelist.sol";


contract TestTokenSale is Ownable, Whitelist {
    using SafeMath for uint256;

    TestToken private _token;
    uint256 private _rate;
    uint256 private _raised;
    uint256 private _raisedInETH;
    uint256 private _startTimestamp;
    uint256 private _endTimestamp;
   

    event Started();
    event Finished();
    event TokensPurchased(address indexed beneficiary, uint256 value, uint256 amount);
   
    constructor(TestToken token, uint256 rate, uint256 startTimestamp, uint256 endTimestamp ) public {
        require(token != address(0));
        require(rate > 0);
        _token = token;
        _rate = rate;
        _raised = 0;
        _startTimestamp = startTimestamp;
        _endTimestamp = endTimestamp;
    }

    function token() public view returns (TestToken) {
        return _token;
    }

    function rate() public view returns (uint256) {
        return _rate;
    }

    function raised() public view returns (uint256) {
        return _raised;
    }


    function calcAmount(uint256 value) public view returns (uint256) {
        return value.mul(_rate);
    } 


    modifier hasStarted()  {
        require(now > _startTimestamp);
        _;
    }
    
    function withdraw() public onlyOwner {
        require(now > _endTimestamp);
        owner.transfer(address(this).balance);
    }
    

    function () public payable hasStarted onlyIfWhitelisted(msg.sender) {
        require(now < _endTimestamp);
        uint256 tokens = calcAmount(msg.value);
        require(_token.mint(msg.sender, tokens), "Cannot mint new tokens.");

        _raised = _raised.add(tokens);

        emit TokensPurchased(msg.sender, msg.value, tokens);
    }

    function emergencyERC20Drain( ERC20 oddToken, uint amount ) public {
        oddToken.transfer(owner, amount);
    }

 
}