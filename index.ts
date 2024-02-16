import { Hono } from "hono";
import { createHederaAccount } from "./src/hedera/account";
import { z } from "zod";
import { ETokenCategory, ETokenTypes, ZHederaIdRegex, ZTokenCategory, ZTokenSymbol, ZTokenTypes } from "./src/hedera/types";
import { mintFungibleTokens, mintNonFungibleToken } from "./src/hedera/token/mint";
import { TTokenData, ZDbCollection, collectionDelete, collectionGet, getAccount, getToken, setToken } from "./src/db";
import { createAccounting, createAssetCredentialSoulboundToken, createEntityPermission } from "./src/hedera/token";

const app = new Hono();

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

export const ZTokenCreateRequest = z.object({
  category: ZTokenCategory,
  name: z.string(),
  symbol: ZTokenSymbol,
  tokenType: ZTokenTypes,
});
export type TTokenCreateRequest = z.infer<typeof ZTokenCreateRequest>;

export const ZTokenGetRequest = z.object({
  tokenId: ZHederaIdRegex,
});
export type TTokenGetRequest = z.infer<typeof ZTokenGetRequest>;

export const ZTokenMintRequest = z.object({
  amount: z.number().gte(0),
  symbol: z.string(),
  tokenId: ZHederaIdRegex,
});
export type TTokenMintRequest = z.infer<typeof ZTokenMintRequest>;

export const ZRequest = z.union([ZAccountCreateRequest, ZDataDeleteRequest, ZDataGetRequest, ZTokenCreateRequest]);
export type TRequest = z.infer<typeof ZRequest>;

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

  await data.set(`accounts:${accountIdStr}`, accountToStore);
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
  const tokenId = args.tokenId;

  const token = await getToken(tokenId);

  if (token === null) {
    return c.json({ message: `Token not found: ${tokenId}` }, 404);
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
  let tokenId;

  if (args.category === ETokenCategory.ACCOUNTING) {
    tokenId = await createAccounting({
      name: args.name,
      symbol: args.symbol,
    });
  } else if (args.category === ETokenCategory.ASSET_CREDENTIAL) {
    tokenId = await createAssetCredentialSoulboundToken({
      name: args.name,
      symbol: args.symbol,
    });
  } else if (args.category === ETokenCategory.ENTITY_PERMISSION) {
    tokenId = await createEntityPermission({
      name: args.name,
      symbol: args.symbol,
    });
  }

  if (!tokenId) {
    return c.json({ message: "Failed to create token" }, 400);
  }

  const tokenData:TTokenData = {
    category: args.category,
    name: args.name,
    symbol: args.symbol,
    tokenId: tokenId.toString(),
    tokenType: ETokenTypes.FUNGIBLE,
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
  const tokenItem = await getToken(args.symbol);
  if (tokenItem === null) {
    return c.json({ message: `Token not found: ${args.symbol}` }, 404);
  }

  if (tokenItem.tokenType === ETokenTypes.FUNGIBLE) {
    const mintResult = await mintFungibleTokens({
      amount: args.amount,
      tokenId: tokenItem.tokenId,
    });

    return c.json({ success: mintResult });
  } else {

    const mintResult = await mintNonFungibleToken({
      metadataURI: ,
      tokenId: args.tokenId,
    });
  }
});

const ZAssociateRequest = z.object({
  accountId: ZHederaIdRegex,
  tokenIds: z.array(ZHederaIdRegex)
});
app.post("/tokens/associate", async (c) => {

  const body = await c.req.json();
  const safeParseResult = ZAssociateRequest.safeParse(body);
  if (!safeParseResult.success) {
    return c.json({ message: safeParseResult.error }, 400);
  };

  const args = safeParseResult.data;
  const item: TAccountData | undefined = await data.get(`accounts:${args.accountId}`);

  if (!item) {
    return c.json({ message: `Account not found: ${args.accountId}` }, 404);
  }

  const associateAccount = await associateTokensWithAccount({
    accountId: args.accountId,
    accountKey: item.privateKey,
    tokenIds: args.tokenIds,
  });

  if (associateAccount === true) {
    return c.json({ success : true });
  } else {
    return c.json({ success : false });
  }
});

app.fire();
