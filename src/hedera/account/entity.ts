import { AccountId, PrivateKey } from "@hashgraph/sdk";
import { createHederaAccount } from "../account";

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

export const createEntityAccount = async ({
  initialHbarBalance,
  name,
}: createEntityAccountIdArgs) => {
  const account = await createHederaAccount({
    initialHbarBalance: 10,
  });

  if (!account === null) {
    throw new Error(`Failed to create account for ${name}`);
  }

  console.log(`=== ${name} Account Information ===`);
  console.log(`=== Account ID: ${account.accountId} ===`);
  console.log(`=== Private Key: ${account.privateKey} ===`);
  console.log(`=====================================`);

  return { accountId: account.accountId, privateKey: account.privateKey };
};
