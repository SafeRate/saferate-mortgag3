import { Client, AccountId, PrivateKey } from "@hashgraph/sdk";
import { params } from "@ampt/sdk";

export enum HederaNetwork {
  MAINNET = "mainnet",
  TESTNET = "testnet",
  LOCALNET = "localnet",
}

const hederaOperatorIdEnv = params("HEDERA_OPERATOR_ID");
const hederaOperatorPrivateKeyEnv = params("HEDERA_OPERATOR_PRIVATE_KEY");
const hederaNetworkEnv = params("HEDERA_NETWORK");

if (!hederaOperatorIdEnv || !hederaOperatorPrivateKeyEnv || !hederaNetworkEnv) {

  console.log('hederaOperatorIdEnv', hederaOperatorIdEnv);
  console.log('hederaOperatorPrivateKeyEnv', hederaOperatorPrivateKeyEnv);
  console.log('hederaNetworkEnv', hederaNetworkEnv);

  throw new Error("Missing Hedera environment variables");
}

const hederaClient = (() => {
  let hederaClient: Client | null = null;

  if (hederaNetworkEnv === HederaNetwork.MAINNET) {
    hederaClient = Client.forMainnet();
  } else if (hederaNetworkEnv === HederaNetwork.TESTNET) {
    hederaClient = Client.forTestnet();
  } else if (hederaNetworkEnv === HederaNetwork.LOCALNET) {
    const node = { "127.0.0.1:50211": new AccountId(3) };
    hederaClient = Client.forNetwork(node).setMirrorNetwork("127.0.0.1:5600");
  } else {
    throw new Error("Invalid Hedera network");
  }

  return hederaClient;
})();

const hederaOperatorId = AccountId.fromString(hederaOperatorIdEnv);
const hederaOperatorPrivateKey = PrivateKey.fromStringED25519(
  hederaOperatorPrivateKeyEnv
);

hederaClient.setOperator(hederaOperatorId, hederaOperatorPrivateKey);
export { hederaClient, hederaOperatorId, hederaOperatorPrivateKey };

export type getNewHederaClientForOperatorProps = {
  operatorId: AccountId;
  privateKey: PrivateKey;
};

export const getNewHederaClientForOperator = ({
  operatorId,
  privateKey,
}: getNewHederaClientForOperatorProps) => {
  let newHederaClient: Client | null = null;

  if (hederaNetworkEnv === HederaNetwork.MAINNET) {
    newHederaClient = Client.forMainnet();
  } else if (hederaNetworkEnv === HederaNetwork.TESTNET) {
    newHederaClient = Client.forTestnet();
  } else {
    throw new Error("Invalid Hedera network");
  }

  newHederaClient.setOperator(operatorId, privateKey);
  return newHederaClient;
};