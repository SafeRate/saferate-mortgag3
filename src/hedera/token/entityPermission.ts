import { TokenId, TokenSupplyType } from "@hashgraph/sdk";
import {
  hederaOperatorId,
  hederaOperatorPrivateKey,
} from "../client";
import { createSoulboundToken } from "../token";
import { z } from "zod";

export type createEntityPermissionArgs = {
  name: string;
  symbol: string;
};

export const createEntityPermissions = async () => {
  const appraiserId = await createEntityPermission({
    name: "Appraiser",
    symbol: "APPRAISER",
  });

  const auditorId = await createEntityPermission({
    name: "Auditor",
    symbol: "AUDITOR",
  });

  const borrowerPermissionId = await createEntityPermission({
    name: "Borrower",
    symbol: "BORROWER",
  });

  const developerId = await createEntityPermission({
    name: "Developer",
    symbol: "DEVELOPER",
  });

  const documentRecorderId = await createEntityPermission({
    name: "Document Recorder",
    symbol: "DOCUMENTRECORDER",
  });

  const guarantorId = await createEntityPermission({
    name: "Guarantor",
    symbol: "GUARANTOR",
  });

  const impactReviewerId = await createEntityPermission({
    name: "Impact Reviewer",
    symbol: "IMPACTREVIEWER",
  });

  const investorPermissionId = await createEntityPermission({
    name: "Investor",
    symbol: "INVESTOR",
  });

  const lenderPermissionId = await createEntityPermission({
    name: "Lender",
    symbol: "LENDER",
  });

  const loanReviewerId = await createEntityPermission({
    name: "Loan Reviewer",
    symbol: "LOANREVIEWER",
  });

  const servicerPermissionId = await createEntityPermission({
    name: "Servicer",
    symbol: "SERVICER",
  });

  const settlementAgentId = await createEntityPermission({
    name: "Settlement Agent",
    symbol: "SETTLEMENTAGENT",
  });

  const titleInsuranceId = await createEntityPermission({
    name: "Title Insurance",
    symbol: "TITLEINSURANCE",
  });
};

export const createEntityPermission = async ({
  name,
  symbol,
}: createEntityPermissionArgs): Promise<TokenId> => {
  name = `${name}`;
  symbol = `${symbol}`;

  const entityPermissionId = await createSoulboundToken({
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
  console.log(`=== Permission ID: ${entityPermissionId} ===`);
  console.log(`=====================================`);

  return entityPermissionId;
};