import {
    hederaClient,
    hederaOperatorId,
    hederaOperatorPrivateKey,
  } from "../client";
  import {
    // createEntityAccount,
    getAccountBalance,
    getAccountBalanceForContract,
    getAccountBalanceForToken,
  } from "../account";
  import {
    associateTokensWithAccount,
    createAccountingForCurrency,
    createAssetCredentials,
    createEntityPermissions,
  } from "../token";
  
  import { Currency } from "../types";

  export const setup = async () => {
    // Create accounts for each of the organizations
    // const safeRateAccount = await createEntityAccount({
    //   initialHbarBalance: 10,
    //   name: "Safe Rate",
    // });
    // const intellicreditAccount = await createEntityAccount({
    //   initialHbarBalance: 10,
    //   name: "IntelliCredit",
    // });
    // const firstTitleAccount = await createEntityAccount({
    //   initialHbarBalance: 10,
    //   name: "First Title",
    // });
    // const ladderUpHousingAccount = await createEntityAccount({
    //   initialHbarBalance: 10,
    //   name: "LadderUp Housing",
    // });
  
    // Create entity permissions
    await createEntityPermissions();
  
    // Create accounting entries for USD currency tokens
    await createAccountingForCurrency({ currency: Currency.USD });
  
    // Create asset credentials
    await createAssetCredentials();
  };
  
  export const simulate = async () => {};