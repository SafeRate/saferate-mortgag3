import { params } from "@ampt/sdk";
import  pinataSDK, { PinataPinResponse, PinataTestAuthenticationResponse } from "@pinata/sdk";
import { TTokenMetadata } from "../token";

const pinataJWTKey = params("PINATA_JWT");
const pinata = new pinataSDK({
    pinataJWTKey: pinataJWTKey
});

export const testPinataAuthentication = async ():Promise<PinataTestAuthenticationResponse> => {
    const result = await pinata.testAuthentication();
    return result;
};

export type uploadMetadataToPinataArgs = {
    metadata: TTokenMetadata;
  };

export const pinNFTMetadataToIPFS = async ({metadata}:uploadMetadataToPinataArgs):Promise<PinataPinResponse> => {
    const result = await pinata.pinJSONToIPFS(metadata);
    return result;
};