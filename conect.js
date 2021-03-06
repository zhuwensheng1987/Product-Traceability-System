if (typeof web3 !== 'undefined')  
	web3 = new Web3(web3.currentProvider);  
else	
	// web3 = new Web3(new Web3.providers.HttpProvider("http://localhost:8101"));//此处为geth填写的rpcport
    web3 = new Web3(new Web3.providers.HttpProvider("http://192.168.1.126:8101"));//此处为geth填写的rpcport
     
if(!web3.isConnected()) 
    	console.log("UnConected")
else 
	console.log("Conected")

deployeAddr="0xA975A87c72A2E4141E85365AFf0424b7da45Ae3A";           //此处为合约发布后的地址

var infoContract = web3.eth.contract([
	{
		"constant": false,
		"inputs": [
			{
				"name": "_account",
				"type": "address"
			}
		],
		"name": "huifu_account",
		"outputs": [
			{
				"name": "",
				"type": "bool"
			}
		],
		"payable": false,
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"constant": true,
		"inputs": [
			{
				"name": "",
				"type": "uint256"
			}
		],
		"name": "product",
		"outputs": [
			{
				"name": "name",
				"type": "string"
			},
			{
				"name": "num",
				"type": "uint256"
			},
			{
				"name": "key",
				"type": "string"
			},
			{
				"name": "date",
				"type": "uint256"
			},
			{
				"name": "producer",
				"type": "address"
			}
		],
		"payable": false,
		"stateMutability": "view",
		"type": "function"
	},
	{
		"constant": true,
		"inputs": [
			{
				"name": "account",
				"type": "address"
			},
			{
				"name": "_name",
				"type": "string"
			}
		],
		"name": "product_management_inquire",
		"outputs": [
			{
				"name": "",
				"type": "uint256"
			}
		],
		"payable": false,
		"stateMutability": "view",
		"type": "function"
	},
	{
		"constant": false,
		"inputs": [
			{
				"name": "_account",
				"type": "address"
			},
			{
				"name": "_key",
				"type": "string"
			}
		],
		"name": "reporting",
		"outputs": [
			{
				"name": "",
				"type": "bool"
			}
		],
		"payable": false,
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"constant": false,
		"inputs": [
			{
				"name": "_a",
				"type": "string"
			},
			{
				"name": "_b",
				"type": "string"
			}
		],
		"name": "compare",
		"outputs": [
			{
				"name": "",
				"type": "bool"
			}
		],
		"payable": false,
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"constant": true,
		"inputs": [
			{
				"name": "_name",
				"type": "string"
			}
		],
		"name": "inquire_product",
		"outputs": [
			{
				"name": "",
				"type": "uint256"
			}
		],
		"payable": false,
		"stateMutability": "view",
		"type": "function"
	},
	{
		"constant": true,
		"inputs": [
			{
				"name": "_int",
				"type": "uint256"
			}
		],
		"name": "buyer_inquire_ware",
		"outputs": [
			{
				"name": "",
				"type": "string"
			},
			{
				"name": "",
				"type": "string"
			},
			{
				"name": "",
				"type": "uint256"
			},
			{
				"name": "",
				"type": "uint256"
			}
		],
		"payable": false,
		"stateMutability": "view",
		"type": "function"
	},
	{
		"constant": true,
		"inputs": [
			{
				"name": "_int",
				"type": "uint256"
			}
		],
		"name": "buyer_inquire_mess",
		"outputs": [
			{
				"name": "",
				"type": "address"
			},
			{
				"name": "",
				"type": "address"
			},
			{
				"name": "",
				"type": "uint256"
			},
			{
				"name": "",
				"type": "uint256"
			},
			{
				"name": "",
				"type": "string"
			}
		],
		"payable": false,
		"stateMutability": "view",
		"type": "function"
	},
	{
		"constant": true,
		"inputs": [
			{
				"name": "",
				"type": "uint256"
			}
		],
		"name": "role_address",
		"outputs": [
			{
				"name": "name",
				"type": "string"
			},
			{
				"name": "add",
				"type": "address"
			}
		],
		"payable": false,
		"stateMutability": "view",
		"type": "function"
	},
	{
		"constant": false,
		"inputs": [
			{
				"name": "_account",
				"type": "address"
			}
		],
		"name": "process_account",
		"outputs": [
			{
				"name": "",
				"type": "bool"
			}
		],
		"payable": false,
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"constant": true,
		"inputs": [
			{
				"name": "_account",
				"type": "address"
			}
		],
		"name": "process_report",
		"outputs": [
			{
				"name": "",
				"type": "string"
			}
		],
		"payable": false,
		"stateMutability": "view",
		"type": "function"
	},
	{
		"constant": true,
		"inputs": [
			{
				"name": "_name",
				"type": "string"
			}
		],
		"name": "name_address",
		"outputs": [
			{
				"name": "",
				"type": "address"
			}
		],
		"payable": false,
		"stateMutability": "view",
		"type": "function"
	},
	{
		"constant": true,
		"inputs": [
			{
				"name": "",
				"type": "uint256"
			}
		],
		"name": "report",
		"outputs": [
			{
				"name": "people",
				"type": "address"
			},
			{
				"name": "key",
				"type": "string"
			}
		],
		"payable": false,
		"stateMutability": "view",
		"type": "function"
	},
	{
		"constant": true,
		"inputs": [
			{
				"name": "account",
				"type": "address"
			},
			{
				"name": "_key",
				"type": "string"
			}
		],
		"name": "inquire",
		"outputs": [
			{
				"name": "",
				"type": "string"
			}
		],
		"payable": false,
		"stateMutability": "view",
		"type": "function"
	},
	{
		"constant": false,
		"inputs": [
			{
				"name": "_from",
				"type": "address"
			},
			{
				"name": "to",
				"type": "address"
			},
			{
				"name": "_name",
				"type": "string"
			},
			{
				"name": "_key",
				"type": "string"
			},
			{
				"name": "_price",
				"type": "uint256"
			}
		],
		"name": "transaction",
		"outputs": [
			{
				"name": "",
				"type": "bool"
			}
		],
		"payable": false,
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"constant": true,
		"inputs": [
			{
				"name": "",
				"type": "address"
			}
		],
		"name": "role",
		"outputs": [
			{
				"name": "name",
				"type": "string"
			},
			{
				"name": "typ",
				"type": "uint256"
			},
			{
				"name": "flag",
				"type": "uint256"
			},
			{
				"name": "ware_key",
				"type": "uint256"
			},
			{
				"name": "mess_key",
				"type": "uint256"
			}
		],
		"payable": false,
		"stateMutability": "view",
		"type": "function"
	},
	{
		"constant": false,
		"inputs": [
			{
				"name": "_name",
				"type": "string"
			},
			{
				"name": "_num",
				"type": "uint256"
			},
			{
				"name": "_key",
				"type": "string"
			},
			{
				"name": "_producer",
				"type": "address"
			}
		],
		"name": "product_production",
		"outputs": [
			{
				"name": "",
				"type": "bool"
			}
		],
		"payable": false,
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"constant": false,
		"inputs": [
			{
				"name": "_name",
				"type": "string"
			},
			{
				"name": "_type",
				"type": "uint256"
			}
		],
		"name": "enroll",
		"outputs": [
			{
				"name": "",
				"type": "bool"
			}
		],
		"payable": false,
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"constant": true,
		"inputs": [],
		"name": "name_address_key",
		"outputs": [
			{
				"name": "",
				"type": "uint256"
			}
		],
		"payable": false,
		"stateMutability": "view",
		"type": "function"
	},
	{
		"constant": false,
		"inputs": [
			{
				"name": "_a",
				"type": "string"
			},
			{
				"name": "_b",
				"type": "string"
			}
		],
		"name": "strConcat",
		"outputs": [
			{
				"name": "",
				"type": "string"
			}
		],
		"payable": false,
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"inputs": [],
		"payable": false,
		"stateMutability": "nonpayable",
		"type": "constructor"
	},
	{
		"anonymous": false,
		"inputs": [
			{
				"indexed": false,
				"name": "key",
				"type": "bool"
			}
		],
		"name": "enroll_key",
		"type": "event"
	},
	{
		"anonymous": false,
		"inputs": [
			{
				"indexed": false,
				"name": "key",
				"type": "bool"
			}
		],
		"name": "product_production_key",
		"type": "event"
	},
	{
		"anonymous": false,
		"inputs": [
			{
				"indexed": false,
				"name": "key",
				"type": "bool"
			}
		],
		"name": "transaction_key",
		"type": "event"
	},
	{
		"anonymous": false,
		"inputs": [
			{
				"indexed": false,
				"name": "key",
				"type": "bool"
			}
		],
		"name": "reporting_key",
		"type": "event"
	},
	{
		"anonymous": false,
		"inputs": [
			{
				"indexed": false,
				"name": "key",
				"type": "bool"
			}
		],
		"name": "process_account_key",
		"type": "event"
	},
	{
		"anonymous": false,
		"inputs": [
			{
				"indexed": false,
				"name": "key",
				"type": "bool"
			}
		],
		"name": "huifu_account_key",
		"type": "event"
	}
]);



var product = infoContract.at(deployeAddr);


console.log("contract ok");
	
	