import {
    AccountBalance,
    AccountBalanceQuery,
    AccountId,
    ContractId,
    TokenId,
  } from "@hashgraph/sdk";
  
  import { hederaClient } from "../client";
  
  type getAccountBalanceArgs = {
    accountId: AccountId;
  };
  
  export const getAccountBalance = async ({
    accountId,
  }: getAccountBalanceArgs): Promise<AccountBalance> => {
    const balance = await new AccountBalanceQuery()
      .setAccountId(accountId)
      .execute(hederaClient);
  
    return balance;
  };
  
  type getAccountBalanceForContractArgs = {
    accountId: AccountId;
    contractId: ContractId;
  };
  
  export const getAccountBalanceForContract = async ({
    accountId,
    contractId,
  }: getAccountBalanceForContractArgs): Promise<AccountBalance> => {
    const balance = await new AccountBalanceQuery()
      .setAccountId(accountId)
      .setContractId(contractId)
      .execute(hederaClient);
  
    return balance;
  };
  
  type getAccountBalanceForTokenArgs = {
    accountId: AccountId;
    tokenId: TokenId;
  };
  
  export const getAccountBalanceForToken = async ({
    accountId,
    tokenId,
  }: getAccountBalanceForTokenArgs): Promise<number> => {
    const balance = await getAccountBalance({ accountId });
    const accountTokens = balance.toJSON();
  
    let amount = 0;
  
    if (Array.isArray(accountTokens?.tokens)) {
      const tokens = accountTokens.tokens;
      for (let t = 0; t < tokens.length; t++) {
        const token = tokens[t];
        if (token.tokenId === tokenId.toString()) {
          amount = parseInt(token.balance);
        }
      }
    }
  
    return amount;
  };