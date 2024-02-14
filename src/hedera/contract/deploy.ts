import { ContractCreateFlow } from "@hashgraph/sdk";
import { hederaClient } from "../client";
import fs from "fs";

/*
 * Stores the bytecode and deploys the contract to the Hedera network.
 * Returns an array with the contractId and contract solidity address.
 *
 * Note: This single call handles what FileCreateTransaction(), FileAppendTransaction() and
 * ContractCreateTransaction() classes do.
 */
export type DeployContractArgs = {
  bytecode: string | Uint8Array;
  gasLimit: number;
};

export const deployContract = async ({
  bytecode,
  gasLimit,
}: DeployContractArgs) => {
  const contractCreateFlowTxn = new ContractCreateFlow()
    .setBytecode(bytecode)
    .setGas(gasLimit);

  console.log(`- Deploying smart contract to Hedera network`);
  const txnResponse = await contractCreateFlowTxn.execute(hederaClient);
  const txnReceipt = await txnResponse.getReceipt(hederaClient);
  const contractId = txnReceipt.contractId;
  if (contractId === null) {
    throw new Error("Somehow contractId is null.");
  }

  const contractSolidityAddress = contractId.toSolidityAddress();

  console.log(`- The smart contract Id is ${contractId}`);
  console.log(
    `- The smart contract Id in Solidity format is ${contractSolidityAddress}\n`
  );

  return [contractId, contractSolidityAddress];
};