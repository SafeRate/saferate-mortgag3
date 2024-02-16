import { TokenMintTransaction, Hbar, TokenId } from "@hashgraph/sdk";
import { hederaClient, hederaOperatorPrivateKey } from "../client";

export type mintFungibleTokenArgs =  {
    amount: number;
    tokenId: string;    
}

export const mintFungibleTokens = async({amount, tokenId}:mintFungibleTokenArgs) => {
    const transaction = await new TokenMintTransaction()
        .setTokenId(TokenId.fromString(tokenId))
        .setAmount(amount)
        .setMaxTransactionFee(new Hbar(20)) //Use when HBAR is under 10 cents
        .freezeWith(hederaClient);

    //Sign with the supply private key of the token 
    const signTx = await transaction.sign(hederaOperatorPrivateKey);

    //Submit the transaction to a Hedera network    
    const txResponse = await signTx.execute(hederaClient);

    //Request the receipt of the transaction
    const receipt = await txResponse.getReceipt(hederaClient);

    console.log(JSON.stringify(receipt));
        
    //Get the transaction consensus status
    const transactionStatus = receipt.status;

    console.log(JSON.stringify(receipt.status));
  
    if (transactionStatus.toString() !== "SUCCESS") {
      throw new Error("Failed to mint token");
    } else {
      return true;
    }
};

export type mintNonFungibleTokenArgs = {
    metadataURI: string;
    tokenId: TokenId;
}

export const mintNonFungibleToken = async ({metadataURI, tokenId}:mintNonFungibleTokenArgs) => {

    const transaction = await new TokenMintTransaction()
        .setTokenId(tokenId)
        .setAmount(1)
        .setMetadata([Buffer.from(metadataURI)])
        .setMaxTransactionFee(new Hbar(20)) //Use when HBAR is under 10 cents
        .freezeWith(hederaClient);

    //Sign with the supply private key of the token 
    const signTx = await transaction.sign(hederaOperatorPrivateKey);

    //Submit the transaction to a Hedera network    
    const txResponse = await signTx.execute(hederaClient);

    //Request the receipt of the transaction
    const receipt = await txResponse.getReceipt(hederaClient);

    console.log(JSON.stringify(receipt));
        
    //Get the transaction consensus status
    const transactionStatus = receipt.status;

    console.log(JSON.stringify(receipt.status));
  
    if (transactionStatus.toString() !== "SUCCESS") {
      throw new Error("Failed to mint token");
    } else {
      return true;
    }
};