const contractAddress = "YOUR_CONTRACT_ADDRESS"; // Replace with your deployed contract address
const abi = [
    // Replace with the ABI from your compiled contract
];

let tronWeb;

async function initializeTronWeb() {
    if (window.tronWeb) {
        tronWeb = window.tronWeb;
    } else {
        return;
    }
}

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

    if (!prisonerId || !amount) {
        alert("Please provide both prisoner ID and amount!");
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

    if (!prisonerId || !amount) {
        alert("Please provide both prisoner ID and amount!");
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

document.getElementById("addPrisonerBtn").onclick = addPrisoner;
document.getElementById("fundPrisonerBtn").onclick = fundPrisoner;
document.getElementById("withdrawBtn").onclick = withdraw;

initializeTronWeb();