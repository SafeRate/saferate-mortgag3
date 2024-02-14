import {
    AccountId,
    PrivateKey,
    TokenId,
    TransactionId,
    TransferTransaction,
  } from "@hashgraph/sdk";
  import { hederaClient } from "../client";
  
  type transferNFTArgs = {
    from: AccountId;
    serial: number;
    signers: PrivateKey[];
    to: AccountId;
    token: TokenId;
  };
  
  export const transferNFT = async ({
    from,
    serial,
    signers,
    to,
    token,
  }: transferNFTArgs): Promise<TransactionId> => {
    let tokenTransferTx = await new TransferTransaction()
      .addNftTransfer(token, serial, from, to)
      .freezeWith(hederaClient);
  
    const signatures = [];
    for (let s = 0; s < signers.length; s++) {
      const signer = signers[s];
      signatures.push(signer.signTransaction(tokenTransferTx));
    }
  
    for (let s = 0; s < signatures.length; s++) {
      const signer = signers[s];
      const signature = signatures[s];
      tokenTransferTx = tokenTransferTx.addSignature(signer.publicKey, signature);
    }
  
    const tokenTransferSubmit = await tokenTransferTx.execute(hederaClient);
    const transactionId = tokenTransferSubmit.transactionId;
    const tokenTransferRx = await tokenTransferSubmit.getReceipt(hederaClient);
  
    if (tokenTransferRx.status.toString() !== "SUCCESS") {
      throw new Error("Failed to transfer NFT");
    } else {
      return transactionId;
    }
  };