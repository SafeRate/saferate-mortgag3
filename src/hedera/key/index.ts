import { KeyList, PrivateKey, PublicKey } from "@hashgraph/sdk";
import { hederaClient } from "../client";

export type KeyPair = {
  privateKey: PrivateKey;
  publicKey: PublicKey;
};

// https://docs.hedera.com/hedera/core-concepts/keys-and-signatures

// Ideal if you want to use MetaMask or need support for more EVM developer tooling.
// Suited for apps interfacing with Ethereum or EVM-compatible networks due to the
// associated EVM address.
export const generateECDSAKeyPair = async (): Promise<KeyPair> => {
  const privateKey = await PrivateKey.generateECDSA();
  const publicKey = privateKey.publicKey;
  return { privateKey, publicKey };
};

// Preferred if key length, security, and performance are important. ECDSA public keys are
// twice as long for the same level of security. It's your only option for Hedera native
// wallets like HashPack as they don't support ECDSA accounts.
export const generateED25519KeyPair = async (): Promise<KeyPair> => {
  const privateKey = await PrivateKey.generateED25519();
  const publicKey = privateKey.publicKey;
  return { privateKey, publicKey };
};