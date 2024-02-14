import { AccountId, PrivateKey } from "node:@hashgraph/sdk";
// import { createHederaAccount } from "../account";

export type createAccountEntityResult = {
  accountId: AccountId;
  privateKey: PrivateKey;
};

export type createEntityAccountIdArgs = {
  initialHbarBalance: number;
  name: string;
};

type getEntityResponse = {
  accountId: AccountId;
  privateKey: PrivateKey;
};

// export const createEntityAccount = async ({
//   initialHbarBalance,
//   name,
// }: createEntityAccountIdArgs) => {
//   const account = await createHederaAccount({
//     initialHbarBalance: 10,
//   });

//   if (!account === null) {
//     throw new Error(`Failed to create account for ${name}`);
//   }

//   console.log(`=== ${name} Account Information ===`);
//   console.log(`=== Account ID: ${account.accountId} ===`);
//   console.log(`=== Private Key: ${account.privateKey} ===`);
//   console.log(`=====================================`);

//   return { accountId: account.accountId, privateKey: account.privateKey };
// };

export const getSafeRateEntity = (): getEntityResponse => {
  // const accountIdStr = process.env["SAFE_RATE_ACCOUNT_ID"];
  // const privateKeyStr = process.env["SAFE_RATE_PRIVATE_KEY"];

  // if (!accountIdStr || !privateKeyStr) {
  //   throw new Error(
  //     "SAFE_RATE_ACCOUNT_ID or SAFE_RATE_PRIVATE_KEY not set in env"
  //   );
  // }

  return {
    accountId: AccountId.fromString("0.0.3396452"),
    privateKey: PrivateKey.fromString("302e020100300506032b657004220420daf03998471dc1494c34557657ee18a119175f93d973d9870bbc34878bd2fab3"),
  };
};