import {
    AccountCreateTransaction,
    TransferTransaction,
    TransactionReceiptQuery,
    AccountInfoQuery,
    TopicCreateTransaction,
    AccountId,
    PrivateKey,
  } from "@hashgraph/sdk";
  import {
    getNewHederaClientForOperator,
    hederaClient,
    hederaOperatorId,
    hederaOperatorPrivateKey,
  } from "../client";
  import {
    generateECDSAKeyPair,
    generateED25519KeyPair,
  } from "../key";
  
  export type createHederaAccountProps = {
    initialHbarBalance: number;
  };
  
  export type createHederaAccountResponse = {
    accountId: AccountId;
    privateKey: PrivateKey;
  };
  
  export const createHederaAccount = async ({
    initialHbarBalance,
  }: createHederaAccountProps): Promise<createHederaAccountResponse> => {
    const newKey = await generateED25519KeyPair();
    const privateKey = newKey.privateKey;
  
    const transaction = new AccountCreateTransaction()
      .setKey(privateKey.publicKey)
      .setInitialBalance(initialHbarBalance);
  
    //Sign the transaction with the client operator private key and submit to a Hedera network
    const txResponse = await transaction.execute(hederaClient);
  
    //Request the receipt of the transaction
    const receipt = await txResponse.getReceipt(hederaClient);
  
    const accountId = receipt.accountId;
  
    if (!accountId) {
      throw new Error("Unable to create account");
    }
  
    return { accountId, privateKey };
  };
  
  // Auto-create an account using an EVM address (public address) alias
  // https://github.com/hashgraph/hedera-sdk-js/blob/develop/examples/transfer-using-evm-address.js
  const createEVMAccount = async () => {
    const newKey = await generateECDSAKeyPair();
  
    // Create an ECSDA private key
    const privateKey = newKey.privateKey;
    const publicKey = newKey.publicKey;
    const evmAddress = publicKey.toEvmAddress();
  
    /**
     * Step 4
     *
     * Transfer tokens using the `TransferTransaction` to the Etherеum Account Address
     *    - The From field should be a complete account that has a public address
     *    - The To field should be to a public address (to create a new account)
     */
    const transferTx = new TransferTransaction()
      .addHbarTransfer(hederaOperatorId, -10)
      .addHbarTransfer(evmAddress, 10)
      .freezeWith(hederaClient);
  
    const transferTxSign = await transferTx.sign(hederaOperatorPrivateKey);
    const transferTxSubmit = await transferTxSign.execute(hederaClient);
  
    /**
     * Step 5
     *
     * Get the child receipt or child record to return the Hedera Account ID for the new account that was created
     */
    const receipt = await new TransactionReceiptQuery()
      .setTransactionId(transferTxSubmit.transactionId)
      .setIncludeChildren(true)
      .execute(hederaClient);
  
    if (!Array.isArray(receipt.children) || receipt.children.length === 0) {
      throw new Error("transaction has no child");
    }
  
    const receiptRecord = receipt.children[0];
    if (!receiptRecord.accountId) {
      throw new Error("transaction has no account ID");
    }
  
    const newAccountId = receiptRecord.accountId.toString();
    console.log(`Account ID of the newly created account: ${newAccountId}`);
  
    /**
     * Step 6
     *
     * Get the `AccountInfo` on the new account and show it is a hollow account by not having a public key
     */
    // const hollowAccountInfo = await new AccountInfoQuery()
    //   .setAccountId(newAccountId)
    //   .execute(hederaClient);
  
    // if (!hollowAccountInfo || !hollowAccountInfo.key) {
    //   throw new Error("hollow account has no key");
    // }
  
    // hollowAccountInfo.key._toProtobufKey()?.keyList.keys.length == 0
    //   ? console.log(
    //       `Account ${newAccountId} does not have public key, therefore it is a hollow account`
    //     )
    //   : console.log(
    //       `Account ${newAccountId} has a public key, therefore it is not a hollow account`
    //     );
  
    /**
     * Step 7
     *
     * Use the hollow account as a transaction fee payer in a HAPI transaction
     */
  
    // set the accound id of the hollow account and its private key as an operator
    // in order to be a transaction fee payer in a HAPI transaction
    hederaClient.setOperator(newAccountId, privateKey);
    const tempClient = getNewHederaClientForOperator({
      operatorId: AccountId.fromString(newAccountId),
      privateKey,
    });
    const transaction = new TopicCreateTransaction()
      .setTopicMemo("HIP-583")
      .freezeWith(tempClient);
  
    /**
     * Step 8
     *
     * Sign the transaction with ECDSA private key
     */
    const transactionSign = await transaction.sign(privateKey);
    const transactionSubmit = await transactionSign.execute(tempClient);
    const status = (
      await transactionSubmit.getReceipt(tempClient)
    ).status.toString();
    console.log(`HAPI transaction status: ${status}`);
  
    /**
     * Step 9
     *
     * Get the `AccountInfo` of the account and show the account is now a complete account by returning the public key on the account
     */
    const completeAccountInfo = await new AccountInfoQuery()
      .setAccountId(newAccountId)
      .execute(tempClient);
    completeAccountInfo.key !== null
      ? console.log(
          `The public key of the newly created and now complete account: ${completeAccountInfo.key.toString()}`
        )
      : console.log(`Account ${newAccountId} is still a hollow account`);
  };