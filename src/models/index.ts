export interface CloudParam {

    name?: string,

    api_key?: string,

    secret?: string, 

    upload_folder?: string, 
}


export interface QuoteNftParam {

    bgImageSrc : string,

    quoteText?: string, 

}

export interface StoredWallet {

    pubkey : string,

    encryptedValue : string, 
}



export enum Page {

    Wallet,

    MintNFT, 

    CreateCollection,

    Market,

    Collectibles,
}


export enum MessageType {

    Error,

    Info, 
}

export interface Message {

    type : MessageType,

    text : string, 

    hash? : string, 
}



export interface AccountNFToken {
    Flags: number
    Issuer: string
    NFTokenID: string
    NFTokenTaxon: number
    URI?: string
    nft_serial: number
}

export interface NFTResult {

    nfts: AccountNFToken[],

    offset?: number,

    limit? : number, 

    id? : unknown,
}