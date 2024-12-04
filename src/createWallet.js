// importando as nossas dependecias
const bip39 = require('bip39');
const bip32 = require('bip32');
const bitcoin = require('bitcoinjs-lib');

//define a rede
const network = bitcoin.networks.testnet;

//derivação de carteiras HD = Hierarchical Deterministic
const path = `m/49'/1'/0'/0`; // Use o apóstrofo simples correto


//seed mnemonica
//Criando frses da senha mnemonica
let mnemonica = bip39.generateMnemonic();
const seed = bip39.mnemonicToSeedSync(mnemonica);

// Raiz da carteira
let root = bip32.fromSeed(seed, network);

// Criando uma conta = pub key e priv key
let account = root.derivePath(path);
let node = account.derive(0).derive(0);

let btcAdress = bitcoin.payments.p2wpkh({
    pubkey: node.publicKey,
    network: network,
}).address

console.log("Carteira Gerada ")
console.log("Endereço da carteira ", btcAdress);
console.log("Chave Privada ", node.toWIF());
console.log("Seed Mnemonica: ", mnemonica);
