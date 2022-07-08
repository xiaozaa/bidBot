const _ = require("lodash");
const opensea = require('opensea-js')
const OpenSeaPort = opensea.OpenSeaPort
const Network = opensea.Network
const HDWalletProvider = require("@truffle/hdwallet-provider");
const secret = require('./secret.js');
const MNEMONIC = secret.MNEMONIC;
const sample = require("./sample.js");
const para = sample.parameters;
var Web3 = require('web3');
var web3 = new Web3(secret.INFURA_URL);

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

const listItem = async () => {
    const expirationTime = Math.round(Date.now() / 1000 + 60 * 60 * 24)

    const listing = await seaport.createSellOrder({
        asset: {
            tokenId: '529',
            tokenAddress: '0xe0901883d567f50bdc0f090ebe7d0bb6d1dfe61f',
        },
        accountAddress: '0x15DBcD4756aD188456a56a1fa3fD90147881fF75',
        startAmount: 0.001,
        expirationTime
    })
}

const encodePara = async () => {

    const res =
    {
        "BasicOrderParameters": {
            "considerationToken": 'address',
            "considerationIdentifier": 'uint256',
            "considerationAmount": 'uint256',
            "offerer": 'address',
            "zone": 'address',
            "offerToken": 'address',
            "offerIdentifier": 'uint256',
            "offerAmount": 'uint256',
            "basicOrderType": 'uint8',
            "startTime": 'uint256',
            "endTime": 'uint256',
            "zoneHash": 'bytes32',
            "salt": 'uint256',
            "offererConduitKey": 'bytes32',
            "fulfillerConduitKey": 'bytes32',
            "totalOriginalAdditionalRecipients": 'uint256',
            "AdditionalRecipient[]": {
                "amount": 'uint256',
                "recipient": 'address'
            },
            "signature": 'bytes'
        }
    };
    const vars = {
        "considerationToken": para.consideration[0].token,
        "considerationIdentifier": para.consideration[0].identifierOrCriteria,
        "considerationAmount": para.consideration[0].endAmount,
        "offerer": para.offerer,
        "zone": para.zone,
        "offerToken": para.offer[0].token,
        "offerIdentifier": para.offer[0].identifierOrCriteria,
        "offerAmount": para.offer[0].endAmount,
        "basicOrderType": para.orderType,
        "startTime": para.startTime,
        "endTime": para.endTime,
        "zoneHash": para.zoneHash,
        "salt": para.salt,
        "offererConduitKey": para.conduitKey,
        "fulfillerConduitKey": para.conduitKey,
        "totalOriginalAdditionalRecipients": para.totalOriginalConsiderationItems - 1,
        "AdditionalRecipient": [
            {
                "amount": para.consideration[1].endAmount,
                "recipient": para.consideration[1].recipient
            }, {
                "amount": para.consideration[2].endAmount,
                "recipient": para.consideration[2].recipient
            }],
        "signature": sample.signature
    }
    const encode = web3.eth.abi.encodeParameter(res, vars);
    console.log("0xfb0f3ee1" + encode.substring(2));
}

const myArgs = process.argv.slice(2);
console.log('myArgs: ', myArgs);
let list = 0;
let encode = 0;
for (let i = 0; i < myArgs.length; i++) {
    if (myArgs[i] === "-list") {
        list = 1;
        console.log('list', list);
    }
    if (myArgs[i] === "-encode") {
        encode = 1;
        console.log('encode', encode);
    }
}

if (list) {
    listItem();
}

if (encode) {
    encodePara();
}

