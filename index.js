// import algosdk from 'algosdk';
var express = require('express') //llamamos a Express
var app = express()  
var algosdk = require('algosdk')
const ethers = require('ethers');

const abi = [
	{
		"inputs": [],
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
				"name": "account",
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
		"inputs": [
			{
				"internalType": "address",
				"name": "spender",
				"type": "address"
			},
			{
				"internalType": "uint256",
				"name": "subtractedValue",
				"type": "uint256"
			}
		],
		"name": "decreaseAllowance",
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
				"name": "spender",
				"type": "address"
			},
			{
				"internalType": "uint256",
				"name": "addedValue",
				"type": "uint256"
			}
		],
		"name": "increaseAllowance",
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
				"name": "account",
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
		"anonymous": false,
		"inputs": [
			{
				"indexed": true,
				"internalType": "address",
				"name": "user",
				"type": "address"
			},
			{
				"indexed": false,
				"internalType": "uint256",
				"name": "timestamp",
				"type": "uint256"
			}
		],
		"name": "NewBurn",
		"type": "event"
	},
	{
		"anonymous": false,
		"inputs": [
			{
				"indexed": true,
				"internalType": "address",
				"name": "user",
				"type": "address"
			},
			{
				"indexed": false,
				"internalType": "uint256",
				"name": "timestamp",
				"type": "uint256"
			}
		],
		"name": "NewMint",
		"type": "event"
	},
	{
		"anonymous": false,
		"inputs": [
			{
				"indexed": true,
				"internalType": "address",
				"name": "previousOwner",
				"type": "address"
			},
			{
				"indexed": true,
				"internalType": "address",
				"name": "newOwner",
				"type": "address"
			}
		],
		"name": "OwnershipTransferred",
		"type": "event"
	},
	{
		"inputs": [],
		"name": "renounceOwnership",
		"outputs": [],
		"stateMutability": "nonpayable",
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
	},
	{
		"inputs": [
			{
				"internalType": "address",
				"name": "newOwner",
				"type": "address"
			}
		],
		"name": "transferOwnership",
		"outputs": [],
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "uint256",
				"name": "amount",
				"type": "uint256"
			}
		],
		"name": "withdraw",
		"outputs": [],
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"stateMutability": "payable",
		"type": "receive"
	},
	{
		"inputs": [
			{
				"internalType": "address",
				"name": "owner",
				"type": "address"
			},
			{
				"internalType": "address",
				"name": "spender",
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
				"name": "account",
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
		"name": "owner",
		"outputs": [
			{
				"internalType": "address",
				"name": "",
				"type": "address"
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
		"name": "token_transfer_count",
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
	}
]

const abi_operator = [
	{
		"inputs": [
			{
				"internalType": "uint256",
				"name": "amount",
				"type": "uint256"
			}
		],
		"name": "deposit",
		"outputs": [],
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"inputs": [],
		"name": "retrieveTokens",
		"outputs": [],
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "address",
				"name": "my_erc20_address",
				"type": "address"
			}
		],
		"stateMutability": "nonpayable",
		"type": "constructor"
	},
	{
		"inputs": [
			{
				"internalType": "address",
				"name": "",
				"type": "address"
			}
		],
		"name": "balances",
		"outputs": [
			{
				"internalType": "uint256",
				"name": "",
				"type": "uint256"
			}
		],
		"stateMutability": "view",
		"type": "function"
	}
]
// var encodeObj = require('algosdk')
// import algosdk, { encodeObj } from 'algosdk';



const cors=require("cors");
const { decodeSignedTransaction, decodeObj } = require('algosdk');
const corsOptions ={
   origin:'*', 
   credentials:true,            //access-control-allow-credentials:true
   optionSuccessStatus:200,
}

const test = async() => {
    try {
        const algodToken = '';
        const algodServer = "https://node.algoexplorerapi.io";
        const algodPort = '';
        algodClient = new algosdk.Algodv2(algodToken, algodServer,algodPort);
        const receiver = "HZ57J3K46JIJXILONBBZOHX6BKPXEM2VVXNRFSUED6DKFD5ZD24PMJ3MVA";
        let accountInfo = await algodClient.accountInformation(receiver).do();
        
        console.log("Account balance: %d microAlgos", accountInfo.amount);
    } catch (err) {
      console.error(err);
    }
  }

  

  const callTx = async(signedTxn) => {
    try {
     
        const signed = decodeObj(new Uint8Array(Buffer.from(signedTxn, "base64")));
         await algodClient.sendRawTransaction(signed.blob).do();
    } catch (err) {
      console.error(err);
    }
  }

    // compile stateless delegate contract
    async function compileProgram(client, programSource) {
      let encoder = new TextEncoder();
      let programBytes = encoder.encode(programSource);
      let compileResponse = await client.compile(programBytes).do();
      return compileResponse;
  }


  const oracleTx = async() => {
    try {


let oracleTemplate = `#pragma version 5
txn TypeEnum
int pay
==
global GroupSize
int 4
==
&&
txn Receiver
addr YEUJW5EPVUDGXYG67LWCL376GMHYKORJECSB2JAW5WY4ESL3CEHPRSEWX4
==
&&
txn CloseRemainderTo
global ZeroAddress
==
&&
txn RekeyTo
global ZeroAddress
==
&&
txn Fee
int 1000
<=
&&
txn Note
btoi
int <exchange_rate>
==
&&
txn LastValid
int <lastvalid>
<=
&&
return
`;
        const algodToken = '';
        const algodServer = "https://node.algoexplorerapi.io";
        const algodPort = '';
        algodClient = new algosdk.Algodv2(algodToken, algodServer,algodPort);

        const status = (await algodClient.status().do());
        if (status === undefined) {
            throw new Error("Unable to get node status");
        }
        // obtengo last round + 10
        // console.log('lastRound: '+status["last-round"])  
        lastvalid = status["last-round"] + 10

        // armo el logicsig del oracle

        tipocambio = "25000"
        oracleTemplate = oracleTemplate.replace("<exchange_rate>", parseInt(tipocambio));    
        let program = oracleTemplate.replace("<lastvalid>", lastvalid); 
        // console.log(program)
        compilation = await compileProgram(algodClient, program);
        //generate unique filename
        // let uintAr = _base64ToArrayBuffer(compilation.result);
        // console.log(compilation.result)
        oracleProgramReferenceProgramBytesReplace = Buffer.from(compilation.result, "base64");
        // console.log(oracleProgramReferenceProgramBytesReplace)
        program_array = new Uint8Array (oracleProgramReferenceProgramBytesReplace);
        args = null;
        // let lsig = algosdk.makeLogicSig(program_array, args);
        oracle_lsig = new algosdk.LogicSigAccount(program_array, args);
        // console.log('Oracle_logicsic_account: '+oracle_lsig.address())

        let oracle_sk = algosdk.mnemonicToSecretKey("popular sauce pride off fluid you come coffee display list stadium blood scout bargain segment laptop hand employ demise grass sign adult want abstract exhibit")
        // console.log("CT Oracle signed Address:" +oracle_sk.addr.toString())
        console.log("Tipo de cambio que envia Oracle: "+tipocambio)
        // console.log(oracle_lsig)
        oracle_lsig.sign(oracle_sk.sk);
        // console.log(oracle_lsig)
        // console.log('oracle_sk.sk')
        // console.log(oracle_sk)
        // console.log(oracle_sk.sk)
        // console.log('Oracle_logicsic_account: '+oracle_lsig.address())
        // pepe = oracle_lsig.get_obj_for_encoding()
        // console.log(pepe)
        // const aux = Buffer.from(algosdk.encodeObj(oracle_lsig)).toString("base64");
        const encoded1 = Buffer.from(algosdk.encodeObj(oracle_lsig)).toString("base64");

        // encoded1 = algosdk.encodeObj(aux)
        // console.log(encoded1)


        // return encoded1;
        return {'signedOracle': encoded1, 'tipocambio': tipocambio}
        // + encoded1
        // const signed = decodeObj(new Uint8Array(Buffer.from(signedTxn, "base64")));
        //  await algodClient.sendRawTransaction(signed.blob).do();
    } catch (err) {
      console.error(err);
    }
  }

  const startListen = async() => {

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(cors(corsOptions))
// var bodyParser = require('body-parser')
// app.use(bodyParser.urlencoded({ extended: true }))
// app.use(bodyParser.json())

var port = process.env.PORT || 8080  // establecemos nuestro puerto

app.get('/', function(req, res) {
  res.json({ mensaje: '¡Hola Mundo!' })   
})

app.get('/cervezas', function(req, res) {
  res.json({ mensaje: '¡A beber cerveza!' })  
})

app.post('/', async function(req, res) {
//   res.json({ mensaje: 'Método post' })  
console.log('llego llamado!' )

  callTx(req.body.param1)
  res.json({mensaje: req.body.param1})  
})

app.post('/oracle', async function(req, res) {
  //   res.json({ mensaje: 'Método post' })  
  console.log('llama oracle!' )
  
    envioSignedTx = await oracleTx()
    // res.json({signedOracle: envioSignedTx})  
    res.json(envioSignedTx)
  })

app.delete('/', function(req, res) {
  res.json({ mensaje: 'Método delete' })  
})

// iniciamos nuestro servidor
app.listen(port)
console.log('CT Oracle escuchando en el puerto ' + port)

}

// ethereum

const eth_balance = async() => {
  try {
    // const ethers = require('ethers');

    const provider = new ethers.providers.JsonRpcProvider('https://goerli.infura.io/v3/fb7024fb51b446d1b3bb28564e980aba');
    const address = '0x58025975E033E91EA99408f847a503044306A652';
    provider.getBalance(address).then((balance) => {
      const etherBalance = ethers.utils.formatEther(balance);
      console.log(`Balance: ${etherBalance} ETH`);
    }).catch((error) => {
      console.error(error);
    });
    
  } catch (err) {
    console.error(err);
  }
}

const contract_call = async() => {
  try {
// replace with your own contract address and ABI
// const contractAddress = '0xb7AA6d7Ce97f564111d029e891bA6bfC23eA6A9c';
// const contractAddress = '0x85fF8Ba96744333971fF3bE09634392AD76d3c44';
// const contractAddress = '0xE4662C49D16BfA4F9e6c5AEfd4073f524e429726';
const contractAddress = '0xDc5842E13D5610477cD5708fd42C4e7F81D39F4c';


// create a provider instance
const provider = new ethers.providers.JsonRpcProvider('https://goerli.infura.io/v3/fb7024fb51b446d1b3bb28564e980aba');

// create a contract instance
const contract = new ethers.Contract(contractAddress, abi, provider);
// call the totalSupply function
contract.totalSupply()
  .then(totalSupply => console.log('Total supply:', totalSupply.toString()))
  .catch(error => console.error('Error calling totalSupply:', error));

  contract.token_transfer_count()
  .then(totalSupply => console.log('Total transfers:', totalSupply.toString()))
  .catch(error => console.error('Error calling Total transfers:', error));

  const balance = await provider.getBalance(contractAddress);
  console.log((balance/10**18).toString() + ' eth');

} catch (err) {
  console.error(err);
}
}


const send_eth = async() => {
	// Set up the provider and signer for the sending account
const provider = new ethers.providers.JsonRpcProvider('https://goerli.infura.io/v3/fb7024fb51b446d1b3bb28564e980aba');
const senderWallet = new ethers.Wallet("731b0d8cea4f74d858bc8b0ff5e6a0639eac146ba10a5d07609a65cbfd2539ce", provider);

// Set up the recipient address and the amount to transfer
const recipientAddress = "0xa6718dD922b118c13E24D1355F72a67deE2b82f3";
const amount = ethers.utils.parseEther("0.05"); // 1 ETH in wei

// Send the transaction
// async function sendTransaction() {
  const tx = await senderWallet.sendTransaction({
    to: recipientAddress,
    value: amount
  });
  console.log(`Transaction hash: ${tx.hash}`);
// }


}

const contract_withdraw_to_owner = async() => {
	try {
  // replace with your own contract address and ABI
  // const contractAddress = '0x1b339773C4b4D592Ab0A00f52CA69F4353E8eD06';
  // const contractAddress = '0xb7AA6d7Ce97f564111d029e891bA6bfC23eA6A9c';
  const contractAddress = '0x85fF8Ba96744333971fF3bE09634392AD76d3c44';
  
  // replace with your own private key
  // 0x58025975E033E91EA99408f847a503044306A652
  const privateKey = '731b0d8cea4f74d858bc8b0ff5e6a0639eac146ba10a5d07609a65cbfd2539ce'; // este es el owner del contrato por eso puede retirar eth.
  // 0x5970Aa08a6A5607635eCCB783867021676bb2759
//   const privateKey ='7ed5506f9b421a0ca6c771a2600d2abc46bb2b4510aa8270a2d055d850eeeff3';
  
  
  // create a provider instance
  // const provider = new ethers.providers.JsonRpcProvider('https://goerli.infura.io/v3/fb7024fb51b446d1b3bb28564e980aba');
  const provider = new ethers.providers.WebSocketProvider(
	`wss://goerli.infura.io/ws/v3/fb7024fb51b446d1b3bb28564e980aba`
  );
  
  // create a wallet instance
  const wallet = new ethers.Wallet(privateKey, provider);
  
  // create a contract instance
  const contract = new ethers.Contract(contractAddress, abi, wallet);
  
  // replace with the address you want to mint to and the amount to mint
  const toAddress = '0x46d98486B8474fc7aD3BC8FEFe6053Ee50b3cE06';
  const amount = ethers.utils.parseEther('0.01'); // mint 100 tokens
  
  console.log('amount:' + amount);
  
	// listen for the NewUserRegistered event
	// contract.on('NewMint', (user, timestamp) => {
	//   console.log('New mint registered:', user, 'at', new Date(timestamp * 1000));
	// });
  
  // call the withdraw function
  await contract.withdraw(amount)
	.then(transaction => console.log('withdraw transaction hash:', transaction.hash))
	.catch(error => console.error('Error calling withdraw:', error));
  
  //   para mintear dos veces se debe usar await sino falla
  //   await contract.mint(toAddress, amount)
  //   .then(transaction => console.log('Mint transaction hash:', transaction.hash))
  //   .catch(error => console.error('Error calling mint:', error));
  
  
  
  } catch (err) {
	console.error(err);
  }
  }

const contract_mint = async() => {
  try {
// replace with your own contract address and ABI
// const contractAddress = '0x1b339773C4b4D592Ab0A00f52CA69F4353E8eD06';
// const contractAddress = '0xb7AA6d7Ce97f564111d029e891bA6bfC23eA6A9c';
// const contractAddress = '0x85fF8Ba96744333971fF3bE09634392AD76d3c44';
const contractAddress = '0xE4662C49D16BfA4F9e6c5AEfd4073f524e429726';

// replace with your own private key
// 0x58025975E033E91EA99408f847a503044306A652
const privateKey = '731b0d8cea4f74d858bc8b0ff5e6a0639eac146ba10a5d07609a65cbfd2539ce';
// 0x5970Aa08a6A5607635eCCB783867021676bb2759
// const privateKey ='7ed5506f9b421a0ca6c771a2600d2abc46bb2b4510aa8270a2d055d850eeeff3';


// create a provider instance
// const provider = new ethers.providers.JsonRpcProvider('https://goerli.infura.io/v3/fb7024fb51b446d1b3bb28564e980aba');
const provider = new ethers.providers.WebSocketProvider(
  `wss://goerli.infura.io/ws/v3/fb7024fb51b446d1b3bb28564e980aba`
);

// create a wallet instance
const wallet = new ethers.Wallet(privateKey, provider);

// create a contract instance
const contract = new ethers.Contract(contractAddress, abi, wallet);

// replace with the address you want to mint to and the amount to mint
const toAddress = '0x46d98486B8474fc7aD3BC8FEFe6053Ee50b3cE06';
const amount = ethers.utils.parseEther('100'); // mint 100 tokens

console.log('amount:' + amount);

  // listen for the NewUserRegistered event
  contract.on('NewMint', (user, timestamp) => {
    console.log('New mint registered:', user, 'at', new Date(timestamp * 1000));
  });

// call the mint function
await contract.mint(toAddress, amount)
  .then(transaction => console.log('Mint transaction hash:', transaction.hash))
  .catch(error => console.error('Error calling mint:', error));

//   para mintear dos veces se debe usar await sino falla
//   await contract.mint(toAddress, amount)
//   .then(transaction => console.log('Mint transaction hash:', transaction.hash))
//   .catch(error => console.error('Error calling mint:', error));



} catch (err) {
  console.error(err);
}
}

const contract_burn = async() => {
	try {
  // replace with your own contract address and ABI
  // const contractAddress = '0x1b339773C4b4D592Ab0A00f52CA69F4353E8eD06';
//   const contractAddress = '0xb7AA6d7Ce97f564111d029e891bA6bfC23eA6A9c';
    //  const contractAddress = '0x85fF8Ba96744333971fF3bE09634392AD76d3c44';
	 const contractAddress = '0xDc5842E13D5610477cD5708fd42C4e7F81D39F4c';
	


  

  // replace with your own private key
//   const privateKey = '731b0d8cea4f74d858bc8b0ff5e6a0639eac146ba10a5d07609a65cbfd2539ce';
//   const privateKey ='7ed5506f9b421a0ca6c771a2600d2abc46bb2b4510aa8270a2d055d850eeeff3';
const privateKey ='a3180bffc5b3acdc2f8b59b687319b231a62293e577e30669b5aaee2afcfb220';
  
  
  // create a provider instance
  // const provider = new ethers.providers.JsonRpcProvider('https://goerli.infura.io/v3/fb7024fb51b446d1b3bb28564e980aba');
  const provider = new ethers.providers.WebSocketProvider(
	`wss://goerli.infura.io/ws/v3/fb7024fb51b446d1b3bb28564e980aba`
  );
  
  // create a wallet instance
  const wallet = new ethers.Wallet(privateKey, provider);
  
  // create a contract instance
  const contract = new ethers.Contract(contractAddress, abi, wallet);
  
  // replace with the address you want to mint to and the amount to mint
  const toAddress = '0x46d98486B8474fc7aD3BC8FEFe6053Ee50b3cE06';
  const amount = ethers.utils.parseEther('25'); // burn 50 tokens
  
  console.log('amount:' + amount);
  
	// listen for the NewUserRegistered event
	contract.on('NewBurn', (user, timestamp) => {
	  console.log('New burn registered:', user, 'at', new Date(timestamp * 1000));
	});
  
  // call the burn function
  
  await contract.burn(toAddress, amount)
	.then(transaction => console.log('burn transaction hash:', transaction.hash))
	.catch(error => console.error('Error calling burn:', error));
  
 
  
  
  } catch (err) {
	console.error(err);
  }
  }

  const myErc20_approve = async() => {
	try {
  
     //este es el erc20 que voy a autorizar para que el contrato operador me lo pueda tomat de mi billetera y transferir
	 const contractAddress = '0xDc5842E13D5610477cD5708fd42C4e7F81D39F4c';
	


	//  Matias1
	//  0x58025975E033E91EA99408f847a503044306A652
	//  private key:  731b0d8cea4f74d858bc8b0ff5e6a0639eac146ba10a5d07609a65cbfd2539ce
	 
	//  Matias2
	//  0x5970Aa08a6A5607635eCCB783867021676bb2759
	//  private key: 7ed5506f9b421a0ca6c771a2600d2abc46bb2b4510aa8270a2d055d850eeeff3
	 
	//  Matias3
	//  0x46d98486B8474fc7aD3BC8FEFe6053Ee50b3cE06
	//  private key: a3180bffc5b3acdc2f8b59b687319b231a62293e577e30669b5aaee2afcfb220

  // replace with your own private key
// esta es la firma de la billetera que autoriza a retirar los tokens de arriba 
const privateKey ='a3180bffc5b3acdc2f8b59b687319b231a62293e577e30669b5aaee2afcfb220';
  
  
  // create a provider instance
  // const provider = new ethers.providers.JsonRpcProvider('https://goerli.infura.io/v3/fb7024fb51b446d1b3bb28564e980aba');
  const provider = new ethers.providers.WebSocketProvider(
	`wss://goerli.infura.io/ws/v3/fb7024fb51b446d1b3bb28564e980aba`
  );
  
  // create a wallet instance
  const wallet = new ethers.Wallet(privateKey, provider);
  
  // create a contract instance
  const contract = new ethers.Contract(contractAddress, abi, wallet);
  

  // en este caso autoriza un maximo de 5 tokens para poder ser transferidos a traves del contrato que estoy autorizando
  const amount = ethers.utils.parseEther('5'); // 
  
  console.log('amount:' + amount);
  
  // ese es el contrato operador al cual le doy autorizacion para que use el token de arriba, a esto sumandole la firma
  // hace que el contrato operador pueda retirar el token de arriba de la billetera firmante
  my_operator_address = '0x5F5E7b1b17E9132b8b20e12D65Cf2141Be3578ed';
  await contract.approve(my_operator_address,amount)
 	.then(transaction => console.log('aprove transaction hash:', transaction.hash))
	.catch(error => console.error('Error calling burn:', error));
  
  
  } catch (err) {
	console.error(err);
  }
  }

  const myOperator_deposit = async() => {
	try {
  // replace with your own contract address and ABI
     //operator address
	 const contractAddress = '0x5F5E7b1b17E9132b8b20e12D65Cf2141Be3578ed';
	


	//  Matias1
	//  0x58025975E033E91EA99408f847a503044306A652
	//  private key:  731b0d8cea4f74d858bc8b0ff5e6a0639eac146ba10a5d07609a65cbfd2539ce
	 
	//  Matias2
	//  0x5970Aa08a6A5607635eCCB783867021676bb2759
	//  private key: 7ed5506f9b421a0ca6c771a2600d2abc46bb2b4510aa8270a2d055d850eeeff3
	 
	//  Matias3
	//  0x46d98486B8474fc7aD3BC8FEFe6053Ee50b3cE06
	//  private key: a3180bffc5b3acdc2f8b59b687319b231a62293e577e30669b5aaee2afcfb220

  // replace with your own private key

const privateKey ='a3180bffc5b3acdc2f8b59b687319b231a62293e577e30669b5aaee2afcfb220';
  
  
  // create a provider instance
  // const provider = new ethers.providers.JsonRpcProvider('https://goerli.infura.io/v3/fb7024fb51b446d1b3bb28564e980aba');
  const provider = new ethers.providers.WebSocketProvider(
	`wss://goerli.infura.io/ws/v3/fb7024fb51b446d1b3bb28564e980aba`
  );
  
  // create a wallet instance
  const wallet = new ethers.Wallet(privateKey, provider);
  
  // create a contract instance
  const contract = new ethers.Contract(contractAddress, abi_operator, wallet);
  
  // replace with the address you want to mint to and the amount to mint
  const toAddress = '0x46d98486B8474fc7aD3BC8FEFe6053Ee50b3cE06';
  const amount = ethers.utils.parseEther('5'); // burn 50 tokens
  
  console.log('amount:' + amount);
  
	// listen for the NewUserRegistered event
	// contract.on('NewBurn', (user, timestamp) => {
	//   console.log('New burn registered:', user, 'at', new Date(timestamp * 1000));
	// });
  
  // call the burn function
  
//   await contract.burn(toAddress, amount)
// 	.then(transaction => console.log('burn transaction hash:', transaction.hash))
// 	.catch(error => console.error('Error calling burn:', error));
  await contract.deposit(amount)
 	.then(transaction => console.log('depoist transaction hash:', transaction.hash))
	.catch(error => console.error('Error calling burn:', error));
  
  
  } catch (err) {
	console.error(err);
  }
  }


// startListen()
//  test()
//  eth_balance()
// contract_call()
// contract_mint()
// send_eth()
// contract_burn()
// contract_withdraw_to_owner()
myOperator_deposit()
// myErc20_approve()

