import { params } from "@ampt/sdk";
import { TTokenMetadata } from "../token";
import { NFTStorage } from "nft.storage";
import { getBlobFromCid } from "../storage";

const token = params("NFT_STORAGE_KEY");
const image = params("TOKEN_LOGO_URI");

if (!token) {
  throw new Error("NFT_STORAGE_KEY not set");
}

const client = new NFTStorage({ token });

export type uploadMetadataToNFTStorageArgs = {
  metadata: TTokenMetadata;
};

export const uploadMetadataToNFTStorage = async ({
  metadata,
}: uploadMetadataToNFTStorageArgs) => {
  if (typeof metadata.image === "string") {
    // @ts-ignore
    metadata.image = getBlobFromCid({ cid: metadata.image });
  }

  // Hedera's metadata conventions are slightly different
  // @ts-ignore
  const storedMetadata = await client.store(metadata);
  const cid = storedMetadata.url;

  console.log(`Metadata uploaded to NFT.Storage: ${cid}`);
  if (!cid) {
    throw new Error("Unable to upload metadata to NFT.Storage");
  }

  return cid;
};