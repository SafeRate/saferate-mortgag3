import { TokenSupplyType, TokenType } from "@hashgraph/sdk";
import {
  hederaOperatorId,
  hederaOperatorPrivateKey,
} from "../client";
import { createToken } from "../token";
import { Currency } from "../types";

export type createAccountingForCurrencyArgs = {
  currency: Currency;
};

export const createAccountingForCurrency = async ({
  currency,
}: createAccountingForCurrencyArgs) => {
  const principalOutstandingTokenId = await createAccounting({
    name: `Principal Outstanding ${currency as string}`,
    symbol: `PRINCIPAL_OUTSTANDING_${currency as string}`,
  });

  const principalPaidTokenId = await createAccounting({
    name: `Principal Paid ${currency as string}`,
    symbol: `PRINCIPAL_PAID_${currency as string}`,
  });

  const principalLostTokenId = await createAccounting({
    name: `Principal Lost ${currency as string}`,
    symbol: `PRINCIPAL_LOST_${currency as string}`,
  });

  const principalRecoveredTokenId = await createAccounting({
    name: `Principal Recovered ${currency as string}`,
    symbol: `PRINCIPAL_RECOVERED_${currency as string}`,
  });

  const interestAccruedTokenId = await createAccounting({
    name: `Interest Accrued ${currency as string}`,
    symbol: `INTEREST_ACCRUED_${currency as string}`,
  });

  const interestPaidTokenId = await createAccounting({
    name: `Interest Paid ${currency as string}`,
    symbol: `INTEREST_PAID_${currency as string}`,
  });

  const interestLostTokenId = await createAccounting({
    name: `Interest Lost ${currency as string}`,
    symbol: `INTEREST_LOST_${currency as string}`,
  });

  const interestRecoveredTokenId = await createAccounting({
    name: `Interest Recovered ${currency as string}`,
    symbol: `INTEREST_RECOVERED_${currency as string}`,
  });

  const feesAccruedTokenId = await createAccounting({
    name: `Fees Accrued ${currency as string}`,
    symbol: `FEES_ACCRUED_${currency as string}`,
  });

  const feesPaidTokenId = await createAccounting({
    name: `Fees Paid ${currency as string}`,
    symbol: `FEES_PAID_${currency as string}`,
  });

  const feesLostTokenId = await createAccounting({
    name: `Fees Lost ${currency as string}`,
    symbol: `FEES_LOST_${currency as string}`,
  });

  const feesRecoveredTokenId = await createAccounting({
    name: `Fees Recovered ${currency as string}`,
    symbol: `FEES_RECOVERED_${currency as string}`,
  });

  // Advance payments
  const advancePaymentsPaidTokenId = await createAccounting({
    name: `Advance Paid ${currency as string}`,
    symbol: `ADVANCE_PAID_${currency as string}`,
  });

  const advancePaymentsRedeemedTokenId = await createAccounting({
    name: `Advance Redeemed ${currency as string}`,
    symbol: `ADVANCE_REDEEMED_${currency as string}`,
  });

  // Escrow
  const escrowAccruedTokenId = await createAccounting({
    name: `Escrow Accrued ${currency as string}`,
    symbol: `ESCROW_ACCRUED_${currency as string}`,
  });

  const escrowPaidTokenId = await createAccounting({
    name: `Escrow Paid ${currency as string}`,
    symbol: `ESCROW_PAID_${currency as string}`,
  });

  const escrowRedeemedTokenId = await createAccounting({
    name: `Escrow Redeemed ${currency as string}`,
    symbol: `ESCROW_REDEEMED_${currency as string}`,
  });

  const escrowLostTokenId = await createAccounting({
    name: `Escrow Lost ${currency as string}`,
    symbol: `ESCROW_LOST_${currency as string}`,
  });

  const escrowRecoveredTokenId = await createAccounting({
    name: `Escrow Recovered ${currency as string}`,
    symbol: `ESCROW_RECOVERED_${currency as string}`,
  });
};

export type createAccountingArgs = {
  name: string;
  symbol: string;
};

export const createAccounting = async ({
  name,
  symbol,
}: createAccountingArgs) => {
  const tokenId = await createToken({
    name: `${name} USD Accounting EMM`,
    symbol: `${symbol}_USD_EMM`,
    decimals: 2,
    initialSupply: 0,
    supplyType: TokenSupplyType.Infinite,
    treasury: hederaOperatorId,
    adminKey: hederaOperatorPrivateKey.publicKey,
    wipeKey: hederaOperatorPrivateKey.publicKey,
    tokenType: TokenType.FungibleCommon,
    treasuryKeyPrivate: hederaOperatorPrivateKey,
    adminKeyPrivate: hederaOperatorPrivateKey,
    supplyKey: hederaOperatorPrivateKey.publicKey,
  });
};