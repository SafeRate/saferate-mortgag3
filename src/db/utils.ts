import { params } from "@ampt/sdk";
import { getAccount } from "./methods";
import { PrivateKey } from "@hashgraph/sdk";

const hederaOperatorPrivateKey = params("HEDERA_OPERATOR_PRIVATE_KEY");
const hederaOperatorId = params("HEDERA_OPERATOR_ID");

export const getAccountKey = async (accountId: string): Promise<PrivateKey> => {
    if (accountId === hederaOperatorId) {
        return PrivateKey.fromStringECDSA(hederaOperatorPrivateKey);
    } else {
        const account = await getAccount(accountId);
        if (account) {
            return PrivateKey.fromStringECDSA(account.privateKey);
        } else {
            throw new Error("Account not found");
        }
    }
}

