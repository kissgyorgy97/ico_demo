const { expectThrow, expectEvent } = require('./helpers')
const TestToken = artifacts.require('./TestToken.sol')
const BigNumber = web3.BigNumber

contract('TestToken', ([account, secondAccount]) => {
  beforeEach(async () => {
    this.instance = await TestToken.new(2000 * (10 ** 18), {from: account})
  })

  afterEach(async () => {
    await this.instance.destroy({from: account})
  })
  

  it('cannot receive ether', async () => {
    await expectThrow(this.instance.send(1, {from: account}));
  })

  

  it('owner can start', async () => {
    {
      const { logs } = await this.instance.startTrading({from: account})
      expectEvent(logs, 'TradeStarted', {})
      assert.isTrue(await this.instance.trading({from: account}))
    }

    await expectThrow(this.instance.startTrading({from: secondAccount}))
  })

  it('token transfer should be work only when trade has been started', async () => {
    await expectThrow(this.instance.transfer(secondAccount, 1, {from: account}))
    await expectThrow(this.instance.transferFrom(account, secondAccount, 1, {from: account}))
    await expectThrow(this.instance.transfer(secondAccount, 1, 0x0, {from: account}))
    await expectThrow(this.instance.transferFrom(account, secondAccount, 1, 0x0, {from: account}))
    await expectThrow(this.instance.approve(secondAccount, 1, {from: account}))
  })
  

  it('owner can mint new tokens', async () => {
    const totalSupply = await this.instance.totalSupply()
    const secondBalance = await this.instance.balanceOf(secondAccount)

    await this.instance.mint(secondAccount, 2, {from: account})

    const newTotalSupply = await this.instance.totalSupply()
    const newSecondBalance = await this.instance.balanceOf(secondAccount)
    newTotalSupply.toNumber().should.be.eq(totalSupply.toNumber() + 2)
    newSecondBalance.toNumber().should.be.eq(secondBalance.toNumber() + 2)
  })

  it('only the owner can mint new tokens', async () => {
    await expectThrow(this.instance.mint(secondAccount, 1, {from: secondAccount}))
  })
})