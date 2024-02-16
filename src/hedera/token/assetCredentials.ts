import { createSoulboundToken } from "./create";
import {
  hederaOperatorId,
  hederaOperatorPrivateKey,
} from "../client";
import { TokenId, TokenSupplyType } from "@hashgraph/sdk";
import { z } from "zod";
import { MimeTypes, TSDGGoalTokenMetadata, TTokenAdditionalMetadata, ZSDGGoalTokenMetadata, ZTokenAdditionalMetadata } from "../types";
import { TTokenMetadata, getStandardTokenImage, validateTokenMetadata } from "./metadata";
import { getBlobFromCid } from "../storage";

export const getMetadataForUNSDGToken = async (metadata:TSDGGoalTokenMetadata) => {
  const safeParseResult = ZSDGGoalTokenMetadata.safeParse(metadata);
  if (!safeParseResult.success) {
    throw new Error("Invalid arguments for UNSDG token metadata");
  }

}

export const createAssetCredentials = async () => {
  await createAssetCredentialSoulboundToken({
    name: "UN Sustainable Development Goals",
    symbol: "UNSDG",
  });

  await createAssetCredentialSoulboundToken({
    name: "Loan Review",
    symbol: "LOANREVIEW",
  });

  await createAssetCredentialSoulboundToken({
    name: "Settlement",
    symbol: "SETTLEMENT",
  });

  await createAssetCredentialSoulboundToken({
    name: "Title Insurance",
    symbol: "TITLEINSURANCE",
  });

  await createAssetCredentialSoulboundToken({
    name: "Government Document Record",
    symbol: "GOVDOCRECORD",
  });

  await createAssetCredentialSoulboundToken({
    name: "Appraisal",
    symbol: "APPRAISAL",
  });

  await createAssetCredentialSoulboundToken({
    name: "Hazard Insurance",
    symbol: "HAZARDINSURANCE",
  });

  await createAssetCredentialSoulboundToken({
    name: "Loan Status",
    symbol: "LOANSTATUS",
  });

  await createAssetCredentialSoulboundToken({
    name: "Guarantee",
    symbol: "GUARANTEE",
  });

  await createAssetCredentialSoulboundToken({
    name: "Impact",
    symbol: "IMPACT",
  });
};

type createAssetCredentialArgs = {
  name: string;
  symbol: string;
};

export const createAssetCredentialSoulboundToken = async ({
  name,
  symbol,
}: createAssetCredentialArgs): Promise<TokenId> => {

  const assetCredentialTokenId = await createSoulboundToken({
    name: name,
    symbol: symbol,
    treasury: hederaOperatorId,
    adminKey: hederaOperatorPrivateKey.publicKey,
    treasuryKeyPrivate: hederaOperatorPrivateKey,
    adminKeyPrivate: hederaOperatorPrivateKey,
    freezeKey: hederaOperatorPrivateKey.publicKey,
    wipeKey: hederaOperatorPrivateKey.publicKey,
    supplyKey: hederaOperatorPrivateKey.publicKey,
    supplyType: TokenSupplyType.Infinite,
  });

  console.log(`=== ${name} Created ===`);
  console.log(`=== Symbol: ${symbol} ===`);
  console.log(`=== Asset Credential Token ID: ${assetCredentialTokenId} ===`);
  console.log(`=====================================`);

  return assetCredentialTokenId;
};