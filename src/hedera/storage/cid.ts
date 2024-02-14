type getFromCidArgs = {
    cid: string;
  };
  
  export const getBufferFromCid = ({ cid }: getFromCidArgs): Buffer => {
    return Buffer.from(cid);
  };
  
  export const getBufferArrayFromCid = ({ cid }: getFromCidArgs): Buffer[] => {
    return [Buffer.from(cid)];
  };
  
  export const getBlobFromCid = ({ cid }: getFromCidArgs): Blob => {
    return new Blob([getBufferFromCid({ cid })]);
  };