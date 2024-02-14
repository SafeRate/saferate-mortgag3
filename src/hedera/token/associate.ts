import {
    AccountId,
    PrivateKey,
    TokenAssociateTransaction,
    TokenId,
  } from "@hashgraph/sdk";
  import { hederaClient } from "../client";
  
  type associateTransactionArgs = {
    accountId: AccountId;
    accountKey: PrivateKey;
    tokenIds: TokenId[];
  };
  
  export const associateTokensWithAccount = async ({
    accountId,
    accountKey,
    tokenIds,
  }: associateTransactionArgs): Promise<boolean> => {
    const associateTx = await new TokenAssociateTransaction()
      .setAccountId(accountId)
      .setTokenIds(tokenIds)
      .freezeWith(hederaClient)
      .sign(accountKey);
  
    const submitTx = await associateTx.execute(hederaClient);
    const associateRx = await submitTx.getReceipt(hederaClient);
  
    if (associateRx.status.toString() !== "SUCCESS") {
      throw new Error("Failed to associate tokens with account");
    } else {
      return true;
    }
  };