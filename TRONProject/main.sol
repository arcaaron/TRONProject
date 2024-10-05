// SPDX-License-Identifier: GPL-3.0
pragma solidity ^0.8.0;

abstract contract Context {
    function _msgSender() internal view virtual returns (address) {
        return msg.sender;
    }

    function _msgValue() internal view virtual returns (uint256) {
        return msg.value;
    }
}

abstract contract Owner is Context {
    address public owner;

    constructor() {
        owner = _msgSender();
    }

    modifier onlyOwner() {
        require(_msgSender() == owner, "Not the contract owner");
        _;
    }
}

contract PrisonManagement is Owner {
    struct Prisoner {
        string name;
        uint256 id;
        uint256 amount; // TRX balance
    }

    uint256 public prisonerId;
    mapping(uint256 => Prisoner) public prisoners;

    event NewPrisoner(uint256 indexed id, string name);
    event FundPrisoner(uint256 indexed id, uint256 amount);
    event Withdraw(uint256 indexed id, uint256 amount);

    function addPrisoner(string memory name) public onlyOwner returns (uint256) {
        require(bytes(name).length > 0, "Name cannot be empty"); // Added validation for empty name
        Prisoner memory newPrisoner = Prisoner(name, prisonerId, 0);
        prisoners[prisonerId] = newPrisoner;
        
        emit NewPrisoner(prisonerId, name);
        prisonerId++;

        return prisonerId - 1; // return the ID of the newly added prisoner
    }

    function fundPrisoner(uint256 id) public payable returns (bool) {
        require(msg.value > 0, "Must send TRX");
        require(prisoners[id].id == id, "Prisoner does not exist");

        prisoners[id].amount += msg.value;

        emit FundPrisoner(id, msg.value);
        return true;
    }

    function withdraw(uint256 id, uint256 amount) public returns (bool) {
        require(prisoners[id].id == id, "Prisoner does not exist");
        require(prisoners[id].amount >= amount, "Insufficient funds");

        prisoners[id].amount -= amount;

        _sendTRX(_msgSender(), amount);

        emit Withdraw(id, amount);
        return true;
    }

    function checkBalance(uint256 id) public view returns (uint256) {
        require(prisoners[id].id == id, "Prisoner does not exist");
        return prisoners[id].amount;
    }

    function _sendTRX(address receiver, uint256 value) internal {
        payable(receiver).transfer(value);
    }
}