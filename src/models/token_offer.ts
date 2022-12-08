import { AccountNFToken } from ".";

export enum OfferType {

    Sell,

    Buy,
}

export interface OfferCreator {

    pubkey? : string,

    classic_address? : string, 
}

export interface Offer {

    type : OfferType,

    nft_token? : AccountNFToken,

    price? : number, 

    remark? : string, 
    
    created_by : OfferCreator,

    date_created? : Date, 
}

