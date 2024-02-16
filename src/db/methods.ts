import { data } from "@ampt/data";
import { EDbCollection, TAccountData, TDbItem, TTokenData, ZAccountData, ZDbCollection, ZDbItem, ZTokenData } from "./schema";
import { z } from "zod";

const ZGetItemArgs = z.object({
    collection: ZDbCollection,
    key: z.string(),
});

type TGetItemArgs = z.infer<typeof ZGetItemArgs>;
const getItem = async({collection, key}:TGetItemArgs):Promise<any> => {
    const result = await data.get(`${collection}:${key}`);

    if (typeof result === "undefined") {
        return null;
    } else {
        return result;
    }
};

export const getAccount = async (key:string):Promise<any> => {
    const result:TAccountData | null = await getItem({collection:EDbCollection.ACCOUNTS, key});
    return result;
};

export const getToken = async (key:string):Promise<any> => {
    const result:TTokenData | null = await getItem({collection:EDbCollection.TOKENS, key});
    return result;
};

const ZSetItemArgs = z.object({
    collection: ZDbCollection,
    key: z.string(),
    value: ZDbItem,
});
type TSetItemArgs = z.infer<typeof ZSetItemArgs>;
const setItem = async({collection, key, value}:TSetItemArgs):Promise<any> => {
    const result = await data.set(`${collection}:${key}`, value);
};

const ZSetAccountItem = z.object({
    key: z.string(),
    value: ZAccountData,
});
type TSetAccountItem = z.infer<typeof ZSetAccountItem>;
export const setAccount = async ({key, value}:TSetAccountItem):Promise<TAccountData> => {
    await setItem({collection:EDbCollection.ACCOUNTS, key, value});
    return value;
};

const ZSetTokenItem = z.object({
    key: z.string(),
    value: ZTokenData,
});
type TSetTokenItem = z.infer<typeof ZSetTokenItem>;
export const setToken = async ({key, value}:TSetTokenItem):Promise<TTokenData> => {
    await setItem({collection:EDbCollection.TOKENS, key, value});
    return value;
};


export const collectionDelete = async (dbCollection:EDbCollection):Promise<number> => {
    const result = await data.get(`${dbCollection}:*`);
    const items = result.items;
    const removeKeys = [];
  
    for (let i = 0; i < items.length; i++) {
      const item = items[i];
      removeKeys.push(item.key);
    }
  
    await data.remove(removeKeys);
    return removeKeys.length;
};

export const collectionGet = async (dbCollection:EDbCollection):Promise<TDbItem[]> => {
    const result = await data.get(`${dbCollection}:*`);
    if (Array.isArray(result)) {
        return result;
    } else {
        return [];
    }
};