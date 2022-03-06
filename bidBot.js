const _ = require("lodash");
const opensea = require('opensea-js')
const OpenseajsLib = require('opensea-js/lib/types')
const OpenSeaPort = opensea.OpenSeaPort
const Network = opensea.Network
const HDWalletProvider = require("@truffle/hdwallet-provider");
const secret = require('./secret.js');
const MNEMONIC = secret.MNEMONIC;

const sleep = function (ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}

if (!MNEMONIC) {
    console.error(
        'Please set a mnemonic, infura key, owner, network, API key, nft contract, and factory contract address.'
    )
    return
}


const provider = new HDWalletProvider({
    mnemonic: {
        phrase: MNEMONIC
    },
    providerOrUrl: secret.INFURA_URL
});

const seaport = new OpenSeaPort(provider, {
    networkName: Network.Main,
    apiKey: secret.OS_API_KEY,
});

const bidBatch = async (Contract, start, offset) => {
    for (let i = start; i < start + offset; i++) {
        await bidOsOne(Contract, i.toString());
        await sleep(100);
    }
}

const bidOsOne = async (Contract, Token_id) => {

    const offer = await seaport.createBuyOrder({
        asset: {
            tokenAddress: Contract, // CryptoKitties
            tokenId: Token_id, // Token ID
            schemaName: "ERC721"
        },
        accountAddress: secret.ACCOUNT_ADDR,
        // Value of the offer, in units of the payment token (or wrapped ETH if none is specified):
        startAmount: price,
        expirationTime: Math.round(Date.now() / 1000 + 60 * 60 * 24) // One day from now
    })
    console.log("Complete offer", Contract, Token_id);

}

const bitAll = async () => {
    for (let i = 0; i < target_contract.length; i++) {
        await bidBatch(target_contract[i], start, offset);
    }
}

const myArgs = process.argv.slice(2);
console.log('myArgs: ', myArgs);
let price = 0;
let start = 0;
let offset = 0;
let target_contract = [];
for (let i = 0; i < myArgs.length; i++) {
    if (myArgs[i] === "-offset") {
        offset = parseInt(myArgs[++i]);
        console.log('offset', offset);
    }
    if (myArgs[i] === "-start") {
        start = parseInt(myArgs[++i]);
        console.log('start', start);
    }
    if (myArgs[i] === "-price") {
        price = parseFloat(myArgs[++i]);
        console.log('price', price);
    }
    if (myArgs[i] === "-target_contract") {
        while (myArgs[++i].slice(0, 2) === '0x') {
            target_contract.push(myArgs[i].toLowerCase());
            if (!myArgs[i + 1]) {
                break;
            }
        }
        console.log('target_contract', target_contract);
        i -= 1;
    }
}

if (target_contract.length) {
    bitAll();
}
