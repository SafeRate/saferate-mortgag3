import {
    AccountId,
    CustomFee,
    Key,
    PrivateKey,
    Timestamp,
    TokenCreateTransaction,
    TokenDeleteTransaction,
    TokenId,
    TokenSupplyType,
    TokenType,
  } from "@hashgraph/sdk";
  import { hederaClient, hederaOperatorPrivateKey } from "../client";
  
  export type createSoulboundTokenArgs = {
    name: string;
    symbol: string;
    treasury: AccountId;
    adminKey: Key;
    kycKey?: Key;
    freezeKey: Key;
    wipeKey: Key;
    supplyKey?: Key;
    expiry?: Timestamp | Date;
    autoRenewAccount?: AccountId;
    autoRenewPeriod?: number;
    memo?: string;
    maxSupply?: number;
    supplyType: TokenSupplyType;
    feeScheduleKey?: Key;
    customFees?: CustomFee[];
    pauseKey?: Key;
    treasuryKeyPrivate: PrivateKey;
    adminKeyPrivate: PrivateKey;
  };
  
  export type createNftArgs = {
    name: string;
    symbol: string;
    treasury: AccountId;
    adminKey: Key;
    kycKey?: Key;
    freezeKey?: Key;
    wipeKey?: Key;
    supplyKey?: Key;
    freezeDefault?: boolean;
    expiry?: Timestamp | Date;
    autoRenewAccount?: AccountId;
    autoRenewPeriod?: number;
    memo?: string;
    maxSupply?: number;
    supplyType: TokenSupplyType;
    feeScheduleKey?: Key;
    customFees?: CustomFee[];
    pauseKey?: Key;
    treasuryKeyPrivate: PrivateKey;
    adminKeyPrivate: PrivateKey;
  };
  
  export type createTokenArgs = {
    name: string;
    symbol: string;
    decimals?: number;
    initialSupply?: number;
    treasury: AccountId;
    adminKey: Key;
    kycKey?: Key;
    freezeKey?: Key;
    wipeKey?: Key;
    supplyKey?: Key;
    freezeDefault?: boolean;
    expiry?: Timestamp | Date;
    autoRenewAccount?: AccountId;
    autoRenewPeriod?: number;
    memo?: string;
    tokenType?: TokenType;
    supplyType: TokenSupplyType;
    maxSupply?: number;
    feeScheduleKey?: Key;
    customFees?: CustomFee[];
    pauseKey?: Key;
    treasuryKeyPrivate: PrivateKey;
    adminKeyPrivate: PrivateKey;
  };

  export const deleteToken = async (tokenId: TokenId) => {
    
    // Create the transaction and freeze the unsigned transaction for manual sign
    const transaction = new TokenDeleteTransaction()
    .setTokenId(tokenId)
    .freezeWith(hederaClient);

    // Sign with the admin private key of the token 
    const signTx = await transaction.sign(hederaOperatorPrivateKey);
    
    // Submit the transaction to a Hedera network    
    const txResponse = await signTx.execute(hederaClient);

    //Request the receipt of the transaction
    const receipt = await txResponse.getReceipt(hederaClient);    
        
    //Obtain the transaction consensus status
    const transactionStatus = receipt.status;

    console.log(`The transaction consensus status is ${transactionStatus}`);

    if (transactionStatus.toString() !== "SUCCESS") {
      throw new Error("Failed to delete token");
    } else {
      return true;
    }    
  };
  
  export const createSoulboundToken = async ({
    name,
    symbol,
    treasury,
    adminKey,
    kycKey,
    freezeKey,
    wipeKey,
    supplyKey,
    expiry,
    autoRenewAccount,
    autoRenewPeriod,
    memo,
    maxSupply,
    supplyType,
    feeScheduleKey,
    customFees,
    pauseKey,
    treasuryKeyPrivate,
    adminKeyPrivate,
  }: createSoulboundTokenArgs): Promise<TokenId> => {
    const tokenId = await createNonFungibleToken({
      freezeDefault: true,
      name,
      symbol,
      treasury,
      adminKey,
      kycKey,
      freezeKey,
      wipeKey,
      supplyKey,
      expiry,
      autoRenewAccount,
      autoRenewPeriod,
      memo,
      maxSupply,
      supplyType,
      feeScheduleKey,
      customFees,
      pauseKey,
      treasuryKeyPrivate,
      adminKeyPrivate,
    });
  
    return tokenId;
  };
  
  export const createNonFungibleToken = async ({
    name,
    symbol,
    treasury,
    adminKey,
    kycKey,
    freezeKey,
    wipeKey,
    supplyKey,
    freezeDefault,
    expiry,
    autoRenewAccount,
    autoRenewPeriod,
    memo,
    maxSupply,
    supplyType,
    feeScheduleKey,
    customFees,
    pauseKey,
    treasuryKeyPrivate,
    adminKeyPrivate,
  }: createNftArgs): Promise<TokenId> => {
    const tokenId = await createToken({
      initialSupply: 0,
      decimals: 0,
      tokenType: TokenType.NonFungibleUnique,
      name,
      symbol,
      treasury,
      adminKey,
      kycKey,
      freezeKey,
      wipeKey,
      supplyKey,
      freezeDefault,
      expiry,
      autoRenewAccount,
      autoRenewPeriod,
      memo,
      maxSupply,
      supplyType,
      feeScheduleKey,
      customFees,
      pauseKey,
      treasuryKeyPrivate,
      adminKeyPrivate,
    });
  
    return tokenId;
  };
  
  export const createToken = async ({
    name,
    symbol,
    decimals,
    initialSupply,
    treasury,
    adminKey,
    kycKey,
    freezeKey,
    wipeKey,
    supplyKey,
    freezeDefault,
    expiry,
    autoRenewAccount,
    autoRenewPeriod,
    memo,
    tokenType,
    supplyType,
    maxSupply,
    feeScheduleKey,
    customFees,
    pauseKey,
    treasuryKeyPrivate,
    adminKeyPrivate,
  }: createTokenArgs): Promise<TokenId> => {
    const tokenCreate = new TokenCreateTransaction();
    if (name) {
      tokenCreate.setTokenName(name);
    } else {
      throw new Error("name required to create token");
    }
  
    if (symbol) {
      tokenCreate.setTokenSymbol(symbol);
    } else {
      throw new Error("symbol required to create token");
    }
  
    if (decimals || decimals === 0) {
      tokenCreate.setDecimals(decimals);
    }
  
    if (initialSupply || initialSupply === 0) {
      tokenCreate.setInitialSupply(initialSupply);
    }
  
    if (treasury) {
      tokenCreate.setTreasuryAccountId(treasury);
    } else {
      throw new Error("treasury account required to create token");
    }
  
    if (!treasuryKeyPrivate) {
      throw new Error("treasury key is required to sign the transaction");
    }
  
    if (adminKey) {
      tokenCreate.setAdminKey(adminKey);
    } else {
      throw new Error("admin key required to create token");
    }
  
    if (!adminKeyPrivate) {
      throw new Error("admin key is required to sign the transaction");
    }
  
    if (kycKey) {
      tokenCreate.setKycKey(kycKey);
    }
  
    if (freezeKey) {
      tokenCreate.setFreezeKey(freezeKey);
    }
  
    if (wipeKey) {
      tokenCreate.setWipeKey(wipeKey);
    }
  
    if (supplyKey) {
      tokenCreate.setSupplyKey(supplyKey);
    }
  
    if (freezeDefault || freezeDefault === false) {
      tokenCreate.setFreezeDefault(true);
    }
  
    if (memo) {
      tokenCreate.setTokenMemo(memo);
    }
  
    if (tokenType) {
      tokenCreate.setTokenType(tokenType);
    }
  
    if (supplyType) {
      tokenCreate.setSupplyType(supplyType);
    }
  
    if (expiry) {
      tokenCreate.setExpirationTime(expiry);
    }
  
    if (autoRenewAccount) {
      tokenCreate.setAutoRenewAccountId(autoRenewAccount);
    }
  
    if (autoRenewPeriod) {
      tokenCreate.setAutoRenewPeriod(autoRenewPeriod);
    }
  
    if (maxSupply || maxSupply === 0) {
      tokenCreate.setMaxSupply(maxSupply);
    }
  
    if (pauseKey) {
      tokenCreate.setPauseKey(pauseKey);
    }
  
    if (feeScheduleKey) {
      tokenCreate.setFeeScheduleKey(feeScheduleKey);
    }
  
    if (Array.isArray(customFees) && customFees.length > 0) {
      tokenCreate.setCustomFees(customFees);
    }
  
    if (supplyType === TokenSupplyType.Finite && !maxSupply) {
      throw new Error("maxSupply is required for finite tokens");
    }
  
    if (supplyType === TokenSupplyType.Infinite && maxSupply) {
      throw new Error("maxSupply is not allowed for infinite tokens");
    }
  
    tokenCreate.freezeWith(hederaClient);
  
    // Sign the transaction with the admin key
    const tokenCreateTxSignAdmin = await tokenCreate.sign(adminKeyPrivate);
  
    // Sign the transaction with the treasury key
    const tokenCreateTxSignComplete = await tokenCreateTxSignAdmin.sign(
      treasuryKeyPrivate
    );
  
    // Submit the transaction to the network
    const tokenCreateSubmit = await tokenCreateTxSignComplete.execute(
      hederaClient
    );
  
    // Get the receipt of the transaction
    const tokenCreateRx = await tokenCreateSubmit.getReceipt(hederaClient);
  
    // Get the token ID from the receipt
    const tokenId = tokenCreateRx.tokenId;
  
    if (!tokenId) {
      throw new Error("Failed to create token, ID not found");
    }
  
    return tokenId;
  };