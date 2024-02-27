import {
    AccountBalanceQuery,
    AccountId,
  } from "@hashgraph/sdk";
  
  import { hederaClient } from "../client";
import { TTokenBalance } from "../types";
  
  type getAccountBalanceArgs = {
    accountId: AccountId;
  };
  
  export const getAccountBalance = async ({
    accountId,
  }: getAccountBalanceArgs): Promise<TTokenBalance[]> => {
    
    const balance = await new AccountBalanceQuery()
      .setAccountId(accountId)
      .execute(hederaClient);

    const tokens:TTokenBalance[] = [];
    
    const hbar = parseFloat(balance.hbars.toString());
    tokens.push({
      tokenId: "0.0.1234",
      balance: hbar,
      decimals: 18
    });

    const tokenBalances = balance.toJSON();

    if (tokenBalances.tokens) {
      for (let tb = 0; tb < tokenBalances.tokens.length; tb++) {
        const tokenBalance = tokenBalances.tokens[tb];
        const tokenId = tokenBalance.tokenId;
        const balance = parseFloat(tokenBalance.balance);
        const decimals = tokenBalance.decimals;
        tokens.push({
          tokenId,
          balance,
          decimals
        });
      }
    }
  
    return tokens;
  };