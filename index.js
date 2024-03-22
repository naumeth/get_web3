// index.js

const Web3 = require('web3');

class Web3Tools {
    constructor(providerUrl) {
        this.web3 = new Web3(providerUrl);
    }

    /**
     * Get the latest block number.
     * @returns {Promise<number>} The block number.
     */
    async getBlockNumber() {
        try {
            const blockNumber = await this.web3.eth.getBlockNumber();
            return blockNumber;
        } catch (error) {
            console.error('Error fetching block number:', error);
            throw error;
        }
    }

    /**
     * Get the balance of an Ethereum address.
     * @param {string} address - The Ethereum address.
     * @returns {Promise<string>} The balance in Ether.
     */
    async getBalance(address) {
        try {
            const balance = await this.web3.eth.getBalance(address);
            return this.web3.utils.fromWei(balance, 'ether');
        } catch (error) {
            console.error('Error fetching balance:', error);
            throw error;
        }
    }

    /**
     * Call a method on an Ethereum smart contract.
     * @param {string} contractAddress - The address of the smart contract.
     * @param {object[]} abi - The contract's ABI (Application Binary Interface).
     * @param {string} methodName - The name of the method to call.
     * @param {any[]} methodParams - The parameters for the method.
     * @returns {Promise<any>} The result of the method call.
     */
    async callContractMethod(contractAddress, abi, methodName, methodParams) {
        try {
            const contract = new this.web3.eth.Contract(abi, contractAddress);
            const method = contract.methodsmethodName;
            const result = await method.call();
            return result;
        } catch (error) {
            console.error('Error calling contract method:', error);
            throw error;
        }
    }

    /**
     * Deploy a smart contract.
     * @param {object[]} abi - The contract's ABI (Application Binary Interface).
     * @param {string} bytecode - The compiled bytecode of the contract.
     * @param {string} fromAddress - The sender's Ethereum address.
     * @param {any[]} constructorParams - The parameters for the constructor.
     * @returns {Promise<string>} The deployed contract address.
     */
    async deployContract(abi, bytecode, fromAddress, constructorParams) {
        try {
            const contract = new this.web3.eth.Contract(abi);
            const deploy = contract.deploy({
                data: bytecode,
                arguments: constructorParams,
            });
            const transaction = await deploy.send({
                from: fromAddress,
                gas: 2000000, // Adjust gas limit as needed
            });
            return transaction.contractAddress;
        } catch (error) {
            console.error('Error deploying contract:', error);
            throw error;
        }
    }

    /**
     * Send Ether from one address to another.
     * @param {string} fromAddress - The sender's Ethereum address.
     * @param {string} toAddress - The recipient's Ethereum address.
     * @param {string} amount - The amount of Ether to send.
     * @returns {Promise<string>} The transaction hash.
     */
    async sendTransaction(fromAddress, toAddress, amount) {
        try {
            const tx = await this.web3.eth.sendTransaction({
                from: fromAddress,
                to: toAddress,
                value: this.web3.utils.toWei(amount, 'ether'),
            });
            return tx.transactionHash;
        } catch (error) {
            console.error('Error sending transaction:', error);
            throw error;
        }
    }
}

module.exports = Web3Tools;
