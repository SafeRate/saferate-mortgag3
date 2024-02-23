import { TokenMintTransaction, Hbar, TokenId } from "@hashgraph/sdk";
import { hederaClient, hederaOperatorPrivateKey } from "../client";
import { TTokenAdditionalMetadata } from "../types";
import { storeNFTMetadata } from "./";
import { getBufferArrayFromCid, getBufferFromCid } from "../storage";

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
    additionalMetadata: TTokenAdditionalMetadata;
    description: string;
    name: string;
    tokenIdStr: string;
}

export const mintNonFungibleToken = async ({additionalMetadata, description, name, tokenIdStr}:mintNonFungibleTokenArgs) => {

    const tokenId = TokenId.fromString(tokenIdStr);

    console.log(`Minting NFT with token ID: ${tokenId.toString()}`);
    console.log('Additional Metadata: ', additionalMetadata);
    console.log(additionalMetadata);

    const fullMetadataURI = await storeNFTMetadata({
      additionalMetadata,
      description,
      name
    });

    // const fullMetadataURI = "ipfs://bafyreiezgnzimnibu4ns2simi7pjugi2pbwnf5e27etmldooxlbxmuqtru";
    console.log('Metadata stored at: ', fullMetadataURI);
    console.log(tokenId.toString());

    const transaction = await new TokenMintTransaction()
        .setTokenId(tokenId)
        .setMetadata(getBufferArrayFromCid({cid:fullMetadataURI}))
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