import z from "zod";
import { ZMimeType, ZLanguage, MimeTypes } from "../types";
import { Validator, defaultSchemaVersion } from "@hashgraph/nft-utilities";
import { Blob } from "buffer";

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
  properties: z.any().nullish(),
  type: ZMimeType,
});

export type TTokenMetadata = z.infer<typeof ZTokenMetadata>;

export const getStandardTokenImage = (): string => {
  const tokenImageLocation = process.env["TOKEN_IMAGE_LOCATION"];

  if (!tokenImageLocation) {
    throw new Error("TOKEN_IMAGE_LOCATION not set");
  }

  return tokenImageLocation;
};

export type createMinimumTokenMetadataWithPropertiesArgs = {
  description: string;
  name: string;
  properties?: any;
};

export const createMinimumTokenMetadataWithProperties = ({
  description,
  name,
  properties,
}: createMinimumTokenMetadataWithPropertiesArgs): TTokenMetadata => {
  const metadata: TTokenMetadata = {
    description,
    image: getStandardTokenImage(),
    name,
    properties,
    type: MimeTypes.png,
  };

  // Validate token metadata
  validateTokenMetadata(metadata);

  return metadata;
};

export const validateTokenMetadata = (tokenMetadata: TTokenMetadata) => {
  const version = "2.0.0";
  const validator = new Validator();
  const issues = validator.validate(tokenMetadata as any, version);
  if (issues && Array.isArray(issues.errors) && issues.errors.length > 0) {
    console.error(JSON.stringify(issues.errors));
    throw new Error("Invalid token metadata");
  }
};