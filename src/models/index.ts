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
