import { z } from "zod";
import { ZHederaIdRegex, ZTokenCategory, ZTokenSymbol, ZTokenTypes } from "../hedera/types";

export enum EDbCollection {
    ACCOUNTS="accounts",
    TOKENS="tokens",
};
export const ZDbCollection = z.nativeEnum(EDbCollection);

export const ZAccountData = z.object({
    accountId: ZHederaIdRegex,
    name: z.string(),
    privateKey: z.string(),  
    publicKey: z.string(),
  });

export type TAccountData = z.infer<typeof ZAccountData>;
  
export const ZTokenData = z.object({
    category: ZTokenCategory,
    name: z.string(),
    symbol: ZTokenSymbol,
    tokenId: ZHederaIdRegex,
    tokenType: ZTokenTypes,
});

export type TTokenData = z.infer<typeof ZTokenData>;

export const ZDbItem = z.union([ZAccountData, ZTokenData]);
export type TDbItem = z.infer<typeof ZDbItem>;