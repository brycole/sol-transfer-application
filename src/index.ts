import * as Web3 from '@solana/web3.js';
import * as fs from 'fs';
import dotenv from 'dotenv';
import { getMinimumBalanceForRentExemptMultisig } from '@solana/spl-token';
dotenv.config();

const PROGRAM_ID = new Web3.PublicKey("11111111111111111111111111111111")

async function main() {
    const connection = new Web3.Connection(Web3.clusterApiUrl('devnet'))
    const senderKey = JSON.parse(process.env.SENDER_KEY ?? '') as number[]
    const receiverKey = JSON.parse(process.env.RECEIVER_KEY ?? '') as number[]
    const sender = await initializeKeypair(connection, senderKey)
    const receiver = await initializeKeypair(connection, receiverKey)
  
    console.log("Public key of Sender:", sender.publicKey.toBase58())
    console.log("Public key of Receiver:", receiver .publicKey.toBase58())

    await sendSol(connection, 0.1*Web3.LAMPORTS_PER_SOL, receiver, sender)
}


async function initializeKeypair(
    connection: Web3.Connection,
    keypair: number[]
    ): Promise<Web3.Keypair> {
       
    const secretKey = Uint8Array.from(keypair);
    const keypairFromSecret = Web3.Keypair.fromSecretKey(secretKey);
    return keypairFromSecret;
  }

  async function sendSol(connection: Web3.Connection, amount: number, receiver: Web3.Keypair, sender: Web3.Keypair) {
    const transaction = new Web3.Transaction()

    const sendSolInstruction = Web3.SystemProgram.transfer(
        {
            fromPubkey: sender.publicKey,
            toPubkey: receiver.publicKey, 
            lamports: amount,
        }
    )

    transaction.add(sendSolInstruction)

    const transactionSignature = await Web3.sendAndConfirmTransaction(connection, transaction, [sender])
  
    console.log(
      `Transaction https://explorer.solana.com/tx/${transactionSignature}?cluster=devnet`
      )
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