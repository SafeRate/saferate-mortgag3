import {
    AccountId,
    PrivateKey,
    TokenId,
    TokenUnfreezeTransaction,
    TransactionId,
    TransferTransaction,
  } from "@hashgraph/sdk";
  import { hederaClient, hederaOperatorId, hederaOperatorPrivateKey } from "../client";

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
      console.log("Failed to transfer fungible tokens");
      console.log("The transaction status " + transactionStatus.toString());
      throw new Error("Failed to transfer fungible tokens");
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

    //Unfreeze an account and freeze the unsigned transaction for signing
    const transaction = await new TokenUnfreezeTransaction()
        .setAccountId(toAccount)
        .setTokenId(tokenId)
        .freezeWith(hederaClient);

    //Sign with the freeze private key of the token 
    const signTx = await transaction.sign(hederaOperatorPrivateKey);

    //Submit the transaction to a Hedera network
    const txResponse = await signTx.execute(hederaClient);

    //Request the receipt of the transaction
    const receipt = await txResponse.getReceipt(hederaClient);

    //Obtain the transaction consensus status
    const transactionStatus = receipt.status;

    console.log("The transaction consensus status is " +transactionStatus.toString());    

    let tokenTransferTx = await new TransferTransaction()
      .addNftTransfer(tokenId, serial, fromAccount, toAccount)
      .freezeWith(hederaClient);      

    for (let s = 0; s < signers.length; s++) {
      const signer = signers[s];
      tokenTransferTx = await tokenTransferTx.sign(signer);
    }
  
    const tokenTransferSubmit = await tokenTransferTx.execute(hederaClient);
    const transactionId = tokenTransferSubmit.transactionId;
    const tokenTransferRx = await tokenTransferSubmit.getReceipt(hederaClient);
  
    if (tokenTransferRx.status.toString() !== "SUCCESS") {
      console.log("Failed to transfer NFT");
      console.log("The transaction status " + tokenTransferRx.status.toString());      
      throw new Error("Failed to transfer NFT");
    } else {
      return transactionId;
    }
  };