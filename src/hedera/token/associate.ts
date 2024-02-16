import {
    AccountId,
    PrivateKey,
    TokenAssociateTransaction,
    TokenDissociateTransaction,
  } from "@hashgraph/sdk";
  import { hederaClient } from "../client";
  
  type associateTransactionArgs = {
    accountId: string;
    accountKey: string;
    tokenIds: string[];
  };
  
  export const associateTokensWithAccount = async ({
    accountId,
    accountKey,
    tokenIds,
  }: associateTransactionArgs): Promise<boolean> => {
    
    const associateTx = await new TokenAssociateTransaction()
      .setAccountId(AccountId.fromString(accountId))
      .setTokenIds(tokenIds)
      .freezeWith(hederaClient)
      .sign(PrivateKey.fromStringED25519(accountKey));
  
    const submitTx = await associateTx.execute(hederaClient);
    const associateRx = await submitTx.getReceipt(hederaClient);
  
    if (associateRx.status.toString() !== "SUCCESS") {
      throw new Error("Failed to associate tokens with account");
    } else {
      return true;
    }
  };

  export const disassociateTokensWithAccount = async ({
    accountId,
    accountKey,
    tokenIds,
  }: associateTransactionArgs): Promise<boolean> => {
    
    const disassociateTx = await new TokenDissociateTransaction()
      .setAccountId(AccountId.fromString(accountId))
      .setTokenIds(tokenIds)
      .freezeWith(hederaClient)
      .sign(PrivateKey.fromStringED25519(accountKey));
  
    const submitTx = await disassociateTx.execute(hederaClient);
    const disassociateRx = await submitTx.getReceipt(hederaClient);    
    
    if (disassociateRx.status.toString() !== "SUCCESS") {
      throw new Error("Failed to disassociate tokens with account");
    } else {
      return true;
    }
  }