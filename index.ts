import { Hono } from "hono";
import { createHederaAccount, getAccountBalance } from "./src/hedera/account";
import { z } from "zod";
import { ETokenCategory, ETokenTypes, ZHederaIdRegex, ZTokenAdditionalMetadata, ZTokenSymbol, getTokenDetailsForSymbol } from "./src/hedera/types";
import { mintFungibleTokens, mintNonFungibleToken } from "./src/hedera/token/mint";
import { TAccountData, TTokenData, ZDbCollection, collectionDelete, collectionGet, getAccount, getToken, setAccount, setToken } from "./src/db";
import { associateTokensWithAccount, createAccounting, createAssetCredentialSoulboundToken, createEntityPermission } from "./src/hedera/token";
import { getAccountKey } from "./src/db/utils";
import { transferFungibleToken, transferNFT } from "./src/hedera/token/transfer";
import { AccountId, TokenId } from "@hashgraph/sdk";

const app = new Hono();

const ZAccountBalanceRequest = z.object({
  accountId: ZHederaIdRegex,
});
export type TAccountBalanceRequest = z.infer<typeof ZAccountBalanceRequest>;

const ZAccountCreateRequest = z.object({
  name: z.string(),
  initialHbarBalance: z.number().gte(0),
});
export type TAccountCreateRequest = z.infer<typeof ZAccountCreateRequest>;

const ZAccountGetRequest = z.object({
  accountId: ZHederaIdRegex
});
export type TAccountGetRequest = z.infer<typeof ZAccountGetRequest>;

const ZDataDeleteRequest = z.object({
  collection: ZDbCollection,
});
export type TDataDeleteRequest = z.infer<typeof ZDataDeleteRequest>;

const ZDataGetRequest = z.object({
  collection: ZDbCollection,
});
export type TDataGetRequest = z.infer<typeof ZDataGetRequest>;

const ZTokenAssociateRequest = z.object({
  accountId: ZHederaIdRegex,
  symbols: z.array(ZTokenSymbol)
});
export type TTokenAssociateRequest = z.infer<typeof ZTokenAssociateRequest>;

export const ZTokenCreateRequest = z.object({
  symbol: ZTokenSymbol,
});
export type TTokenCreateRequest = z.infer<typeof ZTokenCreateRequest>;

export const ZTokenGetRequest = z.object({
  symbol: ZTokenSymbol,
});
export type TTokenGetRequest = z.infer<typeof ZTokenGetRequest>;

export const ZTokenMintRequest = z.object({
  amount: z.number().gte(0),
  description: z.string().nullish(),
  metadata: ZTokenAdditionalMetadata.nullish(),
  name: z.string().nullish(),
  symbol: ZTokenSymbol,
  tokenId: ZHederaIdRegex
});
export type TTokenMintRequest = z.infer<typeof ZTokenMintRequest>;

export const ZTokenTransferRequest = z.object({
  amount: z.number().gte(0).nullish(),
  fromAccountId: ZHederaIdRegex,
  serial: z.number().gte(0).nullish(),
  symbol: ZTokenSymbol,
  toAccountId: ZHederaIdRegex
});
export type TTokenTransferRequest = z.infer<typeof ZTokenTransferRequest>;

export const ZRequest = z.union([ZAccountCreateRequest, ZDataDeleteRequest, ZDataGetRequest, ZTokenCreateRequest]);
export type TRequest = z.infer<typeof ZRequest>;

app.post("/accounts/balance", async (c) => {

  const body = await c.req.json();
  const safeParseResult = ZAccountBalanceRequest.safeParse(body);
  if (!safeParseResult.success) {
    return c.json({ message: safeParseResult.error }, 400);
  };
  const { accountId } = safeParseResult.data;
  const accountBalance = await getAccountBalance({ accountId: AccountId.fromString(accountId) });
  return c.json(accountBalance);
});

app.post("/accounts/create", async (c) => {

  const body = await c.req.json();
  const safeParseResult = ZAccountCreateRequest.safeParse(body);
  if (!safeParseResult.success) {
    return c.json({ message: safeParseResult.error }, 400);
  };
  const args = safeParseResult.data;

  const hederaAccount = await createHederaAccount({
    initialHbarBalance: args.initialHbarBalance,
  });

  const accountIdStr = hederaAccount.accountId.toString();
  const publicKeyStr = hederaAccount.privateKey.publicKey.toString();
  const privateKeyStr = hederaAccount.privateKey.toString();

  const accountToStore = {
    name: args.name,
    accountId: accountIdStr,
    publicKey: publicKeyStr,
    privateKey: privateKeyStr,    
  };

  await setAccount(
    {
      key: accountIdStr,
      value: accountToStore
    }
  );

  return c.json(accountToStore);
});

app.post("/accounts/get", async (c) => {

  const body = await c.req.json();
  const safeParseResult = ZAccountGetRequest.safeParse(body);
  if (!safeParseResult.success) {
    return c.json({ message: safeParseResult.error }, 400);
  };
  const args = safeParseResult.data;  
  const accountId = args.accountId;

  if (!accountId) {
    return c.json({ message: "Missing account ID" }, 400);
  }

  const account = getAccount(accountId);
  return c.json(account);
});

app.post("/data/delete", async (c) => {
  const body = await c.req.json();
  const safeParseResult = ZDataDeleteRequest.safeParse(body);
  if (!safeParseResult.success) {
    return c.json({ message: safeParseResult.error }, 400);
  };
  const args = safeParseResult.data;
  const collection = args.collection;
  const numDeleted = await collectionDelete(collection);
  return c.json({ message: `Deleted ${numDeleted} records in collection: ${collection}` });
});

app.post("/data/get", async (c) => {
  const body = await c.req.json();
  const safeParseResult = ZDataGetRequest.safeParse(body);
  if (!safeParseResult.success) {
    return c.json({ message: safeParseResult.error }, 400);
  };
  const args = safeParseResult.data;
  const collection = args.collection;
  const items = await collectionGet(collection);
  return c.json(items);
});

app.post("/tokens/get", async (c) => {
  const body = await c.req.json();
  const safeParseResult = ZTokenGetRequest.safeParse(body);
  if (!safeParseResult.success) {
    return c.json({ message: safeParseResult.error }, 400);
  };

  const args = safeParseResult.data;
  const symbol = args.symbol;

  const token = await getToken(symbol);

  if (token === null) {
    return c.json({ message: `Token not found: ${symbol}` }, 404);
  }

  return c.json(token);
});

app.post("/tokens/create", async (c) => {
  const body = await c.req.json();
  const safeParseResult = ZTokenCreateRequest.safeParse(body);
  if (!safeParseResult.success) {
    return c.json({ message: safeParseResult.error }, 400);
  };

  const args = safeParseResult.data;

  const tokenDetails = getTokenDetailsForSymbol({symbol: args.symbol});
  if (tokenDetails === null) {
    return c.json({ message: `Token symbol not found: ${args.symbol}` }, 404);
  }

  let tokenId;

  if (tokenDetails.category === ETokenCategory.ACCOUNTING) {
    tokenId = await createAccounting({
      name: tokenDetails.name,
      symbol: tokenDetails.symbol,
    });
  } else if (tokenDetails.category === ETokenCategory.ASSET_CREDENTIAL) {
    tokenId = await createAssetCredentialSoulboundToken({
      name: tokenDetails.name,
      symbol: tokenDetails.symbol,
    });
  } else if (tokenDetails.category === ETokenCategory.ENTITY_PERMISSION) {
    tokenId = await createEntityPermission({
      name: tokenDetails.name,
      symbol: tokenDetails.symbol,
    });
  }

  if (!tokenId) {
    return c.json({ message: "Failed to create token" }, 400);
  }

  const tokenData:TTokenData = {
    category: tokenDetails.category,
    name: tokenDetails.name,
    symbol: tokenDetails.symbol,
    tokenId: tokenId.toString(),
    tokenType: tokenDetails.type,
  };

  const result = await setToken({key: tokenData.symbol, value: tokenData});
  return c.json(result);
});


app.post("/tokens/mint", async (c) => {
  const body = await c.req.json();
  const safeParseResult = ZTokenMintRequest.safeParse(body);
  if (!safeParseResult.success) {
    return c.json({ message: safeParseResult.error }, 400);
  };

  const args = safeParseResult.data;
  const { amount, description, metadata, name, symbol, tokenId}  = args;

  const tokenItem = await getToken(symbol);
  if (tokenItem === null) {
    return c.json({ message: `Token not found: ${args.symbol}` }, 404);
  }

  if (tokenItem.tokenType === ETokenTypes.FUNGIBLE) {
    const mintResult = await mintFungibleTokens({
      amount: amount,
      tokenId: tokenItem.tokenId,
    });

    return c.json({ success: mintResult });

  } else {

    if (!name) {
      return c.json({ message: "name is needed to mint NFT" }, 400);
    }

    if (!description) { 
      return c.json({ message: "description is needed to mint NFT" }, 400);
    }

    if (!metadata) {
      return c.json({ message: "additional metadata is needed to mint NFT" }, 400);
    }

    if (amount !== 1) {
      return c.json({ message: "can only mint 1 NFT" }, 400);
    }
 
    const mintResult = await mintNonFungibleToken({
      additionalMetadata: metadata,
      description: description,
      name: name,
      tokenIdStr: args.tokenId,
    });

    return c.json({ serials : mintResult });
  }
});

app.post("/tokens/associate", async (c) => {

  const body = await c.req.json();
  const safeParseResult = ZTokenAssociateRequest.safeParse(body);
  if (!safeParseResult.success) {
    return c.json({ message: safeParseResult.error }, 400);
  };

  const { accountId, symbols } = safeParseResult.data;
  const item: TAccountData | null = await getAccount(accountId);

  if (!item) {
    return c.json({ message: `Account not found: ${accountId}` }, 404);
  }

  const tokenIds:string[] = [];

  for (let s = 0; s < symbols.length; s++) {
    const symbol = symbols[s];
    const token = await getToken(symbol);
    if (token === null) {
      return c.json({ message: `Token not found: ${symbol}` }, 404);
    }
    
    tokenIds.push(token.tokenId);
  }

  const associateAccount = await associateTokensWithAccount({
    accountId: accountId,
    accountKey: item.privateKey,
    tokenIds: tokenIds,
  });

  if (associateAccount === true) {
    return c.json({ success : true });
  } else {
    return c.json({ success : false });
  }
});

app.post("/tokens/transfer", async (c) => {

  const body = await c.req.json();
  const safeParseResult = ZTokenTransferRequest.safeParse(body);
  if (!safeParseResult.success) {
    return c.json({ message: safeParseResult.error }, 400);
  };

  const {amount, fromAccountId, serial, symbol, toAccountId } = safeParseResult.data;
  const tokenDetails = await getToken(symbol);

  if (tokenDetails === null) {
    return c.json({ message: `Token symbol not found: ${symbol}` }, 404);
  }

  const signers = [await getAccountKey(fromAccountId), await getAccountKey(toAccountId)];

  if (tokenDetails.tokenType === ETokenTypes.FUNGIBLE) {

    if (!amount) {
      return c.json({ message: "amount is needed to transfer fungible token" }, 400);
    }

    const transaction = await transferFungibleToken({
      amount: amount,
      fromAccount: AccountId.fromString(fromAccountId),
      signers: signers,
      toAccount: AccountId.fromString(toAccountId),
      tokenId: TokenId.fromString(tokenDetails.tokenId)
    });
    
  } else if (tokenDetails.tokenType === ETokenTypes.NON_FUNGIBLE) {

    if (!serial) {
      throw new Error("serial is needed to transfer non-fungible token");
    }

    const transaction = await transferNFT({
      fromAccount: AccountId.fromString(fromAccountId),
      serial,
      signers: signers,
      toAccount: AccountId.fromString(toAccountId),
      tokenId: TokenId.fromString(tokenDetails.tokenId)
    });

    return c.json({ message: `Success` }, 200);
  }  
});

app.fire();
