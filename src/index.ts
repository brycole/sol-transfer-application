import * as Web3 from '@solana/web3.js';
import * as fs from 'fs';
import dotenv from 'dotenv';
import { getMinimumBalanceForRentExemptMultisig } from '@solana/spl-token';
dotenv.config();

const PROGRAM_ID = new Web3.PublicKey("ChT1B39WKLS8qUrkLvFDXMhEJ4F1XZzwUNHUt4AU9aVa")
const PROGRAM_DATA_PUBLIC_KEY = new Web3.PublicKey("Ah9K7dQ8EHaZqcAsgBW8w37yN2eAy3koFmUn4x3CJtod")

async function main() {
    const connection = new Web3.Connection(Web3.clusterApiUrl('devnet'));
    const senderKey = JSON.parse(process.env.SENDER_KEY ?? '') as number[];
    const receiverKey = JSON.parse(process.env.RECEIVER_KEY ?? '') as number[];
    const sender = await initializeKeypair(connection, senderKey);
    const receiver = await initializeKeypair(connection, receiverKey);
  
    console.log("Public key of Sender:", sender.publicKey.toBase58());
    console.log("Public key of Receiver:", receiver .publicKey.toBase58());
}


async function initializeKeypair(
    connection: Web3.Connection,
    keypair: number[]
    ): Promise<Web3.Keypair> {
       
    const secretKey = Uint8Array.from(keypair);
    const keypairFromSecret = Web3.Keypair.fromSecretKey(secretKey);
    return keypairFromSecret;
  }

main()
    .then(() => {
        console.log("Finished successfully")
        process.exit(0)
    })
    .catch((error) => {
        console.log(error)
        process.exit(1)
    })