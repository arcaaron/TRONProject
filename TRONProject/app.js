const contractAddress = "TEp99ZcHXiSkN2DNUTaNXrKghYmWysSuQy"; // Replace with your deployed contract address
const abi = [
		"abi": [
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
		],
];

let tronWeb;

async function initializeTronWeb() {
    if (window.tronWeb && window.tronWeb.defaultAddress.base58) {
        tronWeb = window.tronWeb;
        document.getElementById("status").innerText = "Connected to TronLink!";
        
        // Enable features dependent on TronLink
        document.getElementById("interactButton").disabled = false;
    } else {
        alert("Please install TronLink and log in.");
        document.getElementById("status").innerText = "TronLink not connected.";
    }
}

window.onload = initializeTronWeb;


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
