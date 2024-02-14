import { ContractCallQuery, ContractId, Hbar } from "@hashgraph/sdk";
import { hederaClient } from "../client";
import { deployContract } from "../contract/deploy";

// export const deployContractMortgage = async (gasLimit: number) => {
//   const mortgageBytecode = fs.readFileSync(
//     "binaries/contracts_Mortgage_sol_Mortgage.bin"
//   );
//   return await deployContract({ bytecode: mortgageBytecode, gasLimit });
// };

export const getLoanNumber = async (contractId: ContractId) => {
  const contractCallResult = await new ContractCallQuery()
    .setGas(75000)
    .setContractId(contractId)
    .setQueryPayment(new Hbar(1))
    .setFunction("getLoanNumber")
    .execute(hederaClient);

  if (
    contractCallResult.errorMessage != null &&
    contractCallResult.errorMessage != ""
  ) {
    console.log(`error calling contract: ${contractCallResult.errorMessage}`);
  }

  const loanNumber = contractCallResult.getUint104(0);
  console.log(loanNumber);
  return loanNumber;
};