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

    destination? : string, // The AccountID for which this offer is intended

    seq_num? : string,
    
    price? : number, 

    remark? : string, 
    
    created_by : OfferCreator,

    date_created? : Date, 
}

