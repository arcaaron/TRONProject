const contractAddress = "TEfVxyBgqVafX5aNF9yzJZJNGd19fCe4cy"; 
const abi = [
	{
		"inputs": [
			{
				"internalType": "string",
				"name": "_name",
				"type": "string"
			},
			{
				"internalType": "string",
				"name": "_symbol",
				"type": "string"
			},
			{
				"internalType": "uint8",
				"name": "_decimals",
				"type": "uint8"
			}
		],
		"stateMutability": "nonpayable",
		"type": "constructor"
	},
	{
		"anonymous": false,
		"inputs": [
			{
				"indexed": true,
				"internalType": "address",
				"name": "owner",
				"type": "address"
			},
			{
				"indexed": true,
				"internalType": "address",
				"name": "spender",
				"type": "address"
			},
			{
				"indexed": false,
				"internalType": "uint256",
				"name": "value",
				"type": "uint256"
			}
		],
		"name": "Approval",
		"type": "event"
	},
	{
		"anonymous": false,
		"inputs": [
			{
				"indexed": true,
				"internalType": "address",
				"name": "from",
				"type": "address"
			},
			{
				"indexed": true,
				"internalType": "address",
				"name": "to",
				"type": "address"
			},
			{
				"indexed": false,
				"internalType": "uint256",
				"name": "value",
				"type": "uint256"
			}
		],
		"name": "Transfer",
		"type": "event"
	},
	{
		"inputs": [
			{
				"internalType": "address",
				"name": "",
				"type": "address"
			},
			{
				"internalType": "address",
				"name": "",
				"type": "address"
			}
		],
		"name": "allowance",
		"outputs": [
			{
				"internalType": "uint256",
				"name": "",
				"type": "uint256"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "address",
				"name": "spender",
				"type": "address"
			},
			{
				"internalType": "uint256",
				"name": "amount",
				"type": "uint256"
			}
		],
		"name": "approve",
		"outputs": [
			{
				"internalType": "bool",
				"name": "",
				"type": "bool"
			}
		],
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "address",
				"name": "",
				"type": "address"
			}
		],
		"name": "balanceOf",
		"outputs": [
			{
				"internalType": "uint256",
				"name": "",
				"type": "uint256"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "address",
				"name": "from",
				"type": "address"
			},
			{
				"internalType": "uint256",
				"name": "amount",
				"type": "uint256"
			}
		],
		"name": "burn",
		"outputs": [],
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"inputs": [],
		"name": "decimals",
		"outputs": [
			{
				"internalType": "uint8",
				"name": "",
				"type": "uint8"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "address",
				"name": "to",
				"type": "address"
			},
			{
				"internalType": "uint256",
				"name": "amount",
				"type": "uint256"
			}
		],
		"name": "mint",
		"outputs": [],
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"inputs": [],
		"name": "name",
		"outputs": [
			{
				"internalType": "string",
				"name": "",
				"type": "string"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [],
		"name": "symbol",
		"outputs": [
			{
				"internalType": "string",
				"name": "",
				"type": "string"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [],
		"name": "totalSupply",
		"outputs": [
			{
				"internalType": "uint256",
				"name": "",
				"type": "uint256"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "address",
				"name": "recipient",
				"type": "address"
			},
			{
				"internalType": "uint256",
				"name": "amount",
				"type": "uint256"
			}
		],
		"name": "transfer",
		"outputs": [
			{
				"internalType": "bool",
				"name": "",
				"type": "bool"
			}
		],
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "address",
				"name": "sender",
				"type": "address"
			},
			{
				"internalType": "address",
				"name": "recipient",
				"type": "address"
			},
			{
				"internalType": "uint256",
				"name": "amount",
				"type": "uint256"
			}
		],
		"name": "transferFrom",
		"outputs": [
			{
				"internalType": "bool",
				"name": "",
				"type": "bool"
			}
		],
		"stateMutability": "nonpayable",
		"type": "function"
	}
]

let tronWebInitialized = false;
let tronWeb;

	async function connectTronLink() {
		const statusMessage = document.getElementById("statusMessage");
	
		if (window.tronLink && window.tronLink.ready) {
			try {
				const address = await window.tronLink.request({ method: 'tron_requestAccounts' });
				console.log("TronLink address: ", address);
	
				if (address && address[0]) {
					statusMessage.innerText = `Connected to TronLink with address: ${address[0]}`;
				} else {
					statusMessage.innerText = "Please log in to your TronLink wallet.";
				}
			} catch (error) {
				console.error("Error connecting to TronLink:", error);
				statusMessage.innerText = "Error connecting to TronLink.";
				alert("Error connecting to TronLink.");
			}
		} else {
			statusMessage.innerText = "TronLink not detected. Please install TronLink.";
			alert("TronLink not detected. Please install the TronLink extension and try again.");
		}
	}
	
	document.getElementById("connectButton").onclick = connectTronLink;
	

	


async function addPrisoner() {
    const prisonerName = document.getElementById("prisonerName").value;

    if (!prisonerName) {
        alert("Prisoner name cannot be empty!");
        return;
    }

    try {
        const contract = await tronWeb.contract(abi, contractAddress);
        await contract.addPrisoner(prisonerName).send({
            shouldPollResponse: true,
        });

        alert("Prisoner added!");
    } catch (error) {
        console.error("Error adding prisoner:", error);
        alert("Failed to add prisoner. Check console for details.");
    }
}

async function fundPrisoner() {
    const prisonerId = document.getElementById("fundPrisonerId").value;
    const amount = document.getElementById("fundAmount").value;

    if (!prisonerId || !amount || isNaN(amount) || amount <= 0) {
        alert("Please provide both a valid prisoner ID and a positive amount!");
        return;
    }

    try {
        const contract = await tronWeb.contract(abi, contractAddress);
        await contract.fundPrisoner(prisonerId).send({
            value: tronWeb.toSun(amount),
            shouldPollResponse: true,
        });

        alert("Prisoner funded!");
    } catch (error) {
        console.error("Error funding prisoner:", error);
        alert("Failed to fund prisoner. Check console for details.");
    }
}

async function withdraw() {
    const prisonerId = document.getElementById("withdrawPrisonerId").value;
    const amount = document.getElementById("withdrawAmount").value;

    if (!prisonerId || !amount || isNaN(amount) || amount <= 0) {
        alert("Please provide both a valid prisoner ID and a positive amount!");
        return;
    }

    try {
        const contract = await tronWeb.contract(abi, contractAddress);
        await contract.withdraw(prisonerId, tronWeb.toSun(amount)).send({
            shouldPollResponse: true,
        });

        alert("Withdrawal successful!");
    } catch (error) {
        console.error("Error withdrawing funds:", error);
        alert("Failed to withdraw funds. Check console for details.");
    }
}

window.onload = () => {
    document.getElementById("addPrisonerBtn").onclick = addPrisoner;
    document.getElementById("fundPrisonerBtn").onclick = fundPrisoner;
    document.getElementById("withdrawBtn").onclick = withdraw;
    initializeTronWeb();
};
