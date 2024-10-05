function toggleMenu(){ 
    const menu = document.querySelector(".menu-links");
    const icon = document.querySelector(".hamburger-icon");
    menu.classList.toggle("open");
    icon.classList.toggle("open");
}

class Prisoner {
    constructor(name, prisonerId) {
        this.name = name;
        this.prisonerId = prisonerId;
        this.earnings = 0;
        this.blockchain = []; 
    }

    addEarnings(amount, description) {
        this.earnings += amount;

        const transaction = {
            prisonerId: this.prisonerId,
            amount: amount,
            description: description,
            timestamp: new Date().toISOString()
        };

        this.blockchain.push(transaction);

        console.log(`Transaction added:`, transaction);
    }

    getEarnings() {
        return this.earnings;
    }

    getTransactionHistory() {
        return this.blockchain;
    }
}

const TronWeb = require('tronweb');

// TronWeb initialization - connecting to the Tron Mainnet
const tronWeb = new TronWeb({
    fullHost: 'https://api.trongrid.io', // Mainnet Node URL
    privateKey: 'your_private_key_here' // Add your private key
});

async function getAccount(address) {
    const accountInfo = await tronWeb.trx.getAccount(address);
    console.log(accountInfo);
}

async function sendTransaction(to, amount) {
    const transaction = await tronWeb.trx.sendTransaction(to, amount);
    console.log(transaction);
}

// GSAP animations
gsap.from()

