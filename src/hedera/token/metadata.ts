import z from "zod";
import { ZMimeType, ZLanguage, MimeTypes, ZTokenAdditionalMetadata } from "../types";
import { Validator, defaultSchemaVersion } from "@hashgraph/nft-utilities";
import { Blob } from "buffer";
import { hederaOperatorId } from "../client";
import { pinNFTMetadataToIPFS } from "../storage";
import { params } from "@ampt/sdk";

// See reference: https://docs.hedera.com/hedera/tutorials/token/structure-your-token-metadata-using-json-schema-v2
// See also: https://www.npmjs.com/package/@hashgraph/nft-utilities

export const ZTokenMetadataFile = z.object({
  uri: z.string(),
  checksum: z.string().nullish(),
  is_default_file: z.boolean().nullish(),
  type: ZMimeType,
});

export const ZTokenMetadataAttribute = z.object({
  display_type: z.string().nullish(),
  max_value: z.number().nullish(),
  trait_type: z.string(),
  value: z.any(),
});

export const ZTokenMetadataLocalization = z.object({
  uri: z.string(),
  default: ZLanguage,
  locales: ZLanguage.array(),
});

export const ZTokenMetadata = z.object({
  attributes: ZTokenMetadataAttribute.array().nullish(),
  checksum: z.string().nullish(),
  creator: z.string().nullish(),
  createorDID: z.string().nullish(),
  description: z.string(),
  files: ZTokenMetadataFile.array().nullish(),
  format: z.string().nullish(),
  image: z.string().or(z.instanceof(Blob)),
  localalizations: ZTokenMetadataLocalization.nullish(),
  name: z.string(),
  properties: ZTokenAdditionalMetadata.nullish(),
  type: ZMimeType,
});

export type TTokenMetadata = z.infer<typeof ZTokenMetadata>;

export const getStandardTokenImage = (): string => {
  const tokenImageLocation = params("TOKEN_LOGO_URI");
  // console.log("Token logo URI", tokenImageLocation);
  // console.log('Token image location: ', tokenImageLocation);

  if (!tokenImageLocation) {
    throw new Error("TOKEN_LOGO_URI not set");
  }

  return tokenImageLocation;
};

export const ZGetNFTMetadataBasicArgs = z.object({
  description: z.string(),
  name: z.string(),
  additionalMetadata: ZTokenAdditionalMetadata
});
export type TGetNFTMetadataBasicArgs = z.infer<typeof ZGetNFTMetadataBasicArgs>;
export const storeNFTMetadata = async ({additionalMetadata, description, name}:TGetNFTMetadataBasicArgs):Promise<string> => {
  const metadata = {
    attributes: [],
    creator: hederaOperatorId.toString(),
    createorDID: null,
    description: description,
    files: [],
    format: "HIP412@2.0.0",
    image: getStandardTokenImage(),
    localalizations: null,
    name: name,
    properties: additionalMetadata,    
    type: MimeTypes.png,
  };

  validateTokenMetadata(metadata);
  const pinResult = await pinNFTMetadataToIPFS({metadata});

  if (!pinResult.IpfsHash) {
    throw new Error("Unable to pin metadata to IPFS");
  }

  const ipfsAddress = `ipfs://${pinResult.IpfsHash}`;
  return ipfsAddress;
}

export const validateTokenMetadata = (tokenMetadata: TTokenMetadata) => {
  const version = "2.0.0";
  const validator = new Validator();
  const issues = validator.validate(tokenMetadata as any, version);
  if (issues && Array.isArray(issues.errors) && issues.errors.length > 0) {
    console.error(JSON.stringify(issues.errors));
    throw new Error("Invalid token metadata");
  }
};