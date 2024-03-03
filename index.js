// index.js

const Web3 = require('web3');

class Web3Tools {
    constructor(providerUrl) {
        this.web3 = new Web3(providerUrl);
    }

    async getBlockNumber() {
        try {
            const blockNumber = await this.web3.eth.getBlockNumber();
            return blockNumber;
        } catch (error) {
            console.error('Error fetching block number:', error);
            throw error;
        }
    }

    async getBalance(address) {
        try {
            const balance = await this.web3.eth.getBalance(address);
            return this.web3.utils.fromWei(balance, 'ether');
        } catch (error) {
            console.error('Error fetching balance:', error);
            throw error;
        }
    }

    async callContractMethod(contractAddress, abi, methodName, methodParams) {
        try {
            const contract = new this.web3.eth.Contract(abi, contractAddress);
            const method = contract.methods[methodName](...methodParams);
            const result = await method.call();
            return result;
        } catch (error) {
            console.error('Error calling contract method:', error);
            throw error;
        }
    }
}

module.exports = Web3Tools;
