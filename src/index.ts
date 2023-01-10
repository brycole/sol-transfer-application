import * as Web3 from '@solana/web3.js';
import * as fs from 'fs';
import dotenv from 'dotenv';
dotenv.config();

const PROGRAM_ID = new Web3.PublicKey("ChT1B39WKLS8qUrkLvFDXMhEJ4F1XZzwUNHUt4AU9aVa")
const PROGRAM_DATA_PUBLIC_KEY = new Web3.PublicKey("Ah9K7dQ8EHaZqcAsgBW8w37yN2eAy3koFmUn4x3CJtod")

async function main() {
    const connection = new Web3.Connection(Web3.clusterApiUrl('devnet'));
    const sender = await initializeKeypair(connection, "SENDER");
    const receiver = await initializeKeypair(connection, "RECEIVER");
  
    console.log("Public key of Sender:", sender.publicKey.toBase58());
    console.log("Public key of Receiver:", receiver .publicKey.toBase58());
}


async function initializeKeypair(
    connection: Web3.Connection,
    keypair: string
    ): Promise<Web3.Keypair> {
   
    if (keypair = "SENDER") { 
        const secret = JSON.parse(process.env.SENDING_KEY ?? '') as number[]; 
    }
    else { 
        const secret = JSON.parse(process.env.RECEIVING_KEY ?? '') as number[]; 
    }
    
    const secretKey = Uint8Array.from(secret);
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