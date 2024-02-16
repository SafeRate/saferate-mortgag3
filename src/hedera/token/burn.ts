import { TokenBurnTransaction, Hbar, TokenId } from "@hashgraph/sdk";
import { hederaClient, hederaOperatorPrivateKey } from "../client";

export type burnFungibleTokenArgs =  {
    amount: number;
    tokenId: TokenId;    
}

export const burnFungibleTokens = async ({amount, tokenId}:burnFungibleTokenArgs) => {
    const transaction = await new TokenBurnTransaction()
        .setTokenId(tokenId)
        .setAmount(amount)
        .freezeWith(hederaClient);

    //Sign with the supply private key of the token 
    const signTx = await transaction.sign(hederaOperatorPrivateKey);

    //Submit the transaction to a Hedera network    
    const txResponse = await signTx.execute(hederaClient);

    //Request the receipt of the transaction
    const receipt = await txResponse.getReceipt(hederaClient);

    //Get the transaction consensus status
    const transactionStatus = receipt.status;

    console.log("The transaction consensus status " +transactionStatus.toString());
};

export type burnNonFungibleTokenArgs =  {
    serial: number;
    tokenId: TokenId;    
}

export const burnNonFungibleTokens = async ({serial, tokenId}:burnNonFungibleTokenArgs) => {
    const transaction = await new TokenBurnTransaction()
        .setTokenId(tokenId)
        .setSerials([serial])
        .freezeWith(hederaClient);

    //Sign with the supply private key of the token 
    const signTx = await transaction.sign(hederaOperatorPrivateKey);

    //Submit the transaction to a Hedera network    
    const txResponse = await signTx.execute(hederaClient);

    //Request the receipt of the transaction
    const receipt = await txResponse.getReceipt(hederaClient);

    //Get the transaction consensus status
    const transactionStatus = receipt.status;

    console.log("The transaction consensus status " +transactionStatus.toString());
};