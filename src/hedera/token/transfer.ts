import {
    AccountId,
    PrivateKey,
    TokenId,
    TransactionId,
    TransferTransaction,
  } from "@hashgraph/sdk";
  import { hederaClient, hederaOperatorPrivateKey } from "../client";

  type transferFungibleTokenArgs = {
    amount: number;
    fromAccount: AccountId;
    signers: PrivateKey[];
    toAccount: AccountId;
    tokenId: TokenId;
  };

  export const transferFungibleToken = async ({
    amount,
    fromAccount,
    signers,
    toAccount,
    tokenId
  }:transferFungibleTokenArgs): Promise<TransactionId> => {
    
    //Create the transfer transaction
    const transaction = await new TransferTransaction()
      .addTokenTransfer(tokenId, fromAccount, -amount)
      .addTokenTransfer(tokenId, toAccount, amount)
      .freezeWith(hederaClient);

    //Sign with the operator account private key
    let signTx = await transaction.sign(hederaOperatorPrivateKey);

    //Sign with each of the signers private keys
    for (let s = 0; s < signers.length; s++) {
      const signer = signers[s];
      signTx = await signTx.sign(signer);
    }

    //Sign with the client operator private key and submit to a Hedera network
    const txResponse = await signTx.execute(hederaClient);

    const transactionId = txResponse.transactionId;

    //Request the receipt of the transaction
    const receipt = await txResponse.getReceipt(hederaClient);

    //Obtain the transaction consensus status
    const transactionStatus = receipt.status;

    console.log("The transaction consensus status " + transactionStatus.toString());

    if (transactionStatus.toString() !== "SUCCESS") {
      throw new Error("Failed to transfer NFT");
    } else {
      return transactionId;
    }
  };

  type transferNFTArgs = {
    fromAccount: AccountId;
    serial: number;
    signers: PrivateKey[];
    toAccount: AccountId;
    tokenId: TokenId;
  };

  export const transferNFT = async ({
    fromAccount,
    serial,
    signers,
    toAccount,
    tokenId,
  }: transferNFTArgs): Promise<TransactionId> => {


    let tokenTransferTx = await new TransferTransaction()
      .addNftTransfer(tokenId, serial, fromAccount, toAccount)
      .freezeWith(hederaClient);
  
    const signatures = [];
    for (let s = 0; s < signers.length; s++) {
      const signer = signers[s];
      signatures.push(signer.signTransaction(tokenTransferTx));
    }
  
    for (let s = 0; s < signatures.length; s++) {
      const signer = signers[s];
      const signature = signatures[s];
      tokenTransferTx = tokenTransferTx.addSignature(signer.publicKey, signature);
    }
  
    const tokenTransferSubmit = await tokenTransferTx.execute(hederaClient);
    const transactionId = tokenTransferSubmit.transactionId;
    const tokenTransferRx = await tokenTransferSubmit.getReceipt(hederaClient);
  
    if (tokenTransferRx.status.toString() !== "SUCCESS") {
      throw new Error("Failed to transfer NFT");
    } else {
      return transactionId;
    }
  };