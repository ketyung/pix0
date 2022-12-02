export enum Category {

    PFP_COLLECTION,

    NICE_QUOTE_COLLECTION,
}

export enum Status {

    PUBLISHED = 'P',

    NEW ='N', 

    DEACTIVATED = 'D',
}


export interface Collection {
    
    id? : string, 

    _id? : string,

    name : string , 

    description? : string,

    category? : Category,

    logo? : Buffer, 

    status? : Status,

    item_name_prefix? : string, 

    layer_count? : number ,

    media_list? : CollectionMedia[],
    
    created_by : string, 

    date_created? : Date,

    date_updated? : Date,
}


export interface CollectionMedia {

    name? : string, 

    layer_num : number, 

    max_num_of_media? : number, 
    
    medias : Media[],

}

export enum MediaType {

    media_uri = 1 ,
    
    text = 2,

    shape = 3, 

    data_uri = 4, 

}


export interface Media {

    type : MediaType,

    value? : string, // value can be uri or another JSON string

    data_url? : Buffer, 

    // percentage of ocurrance
    poc? : number, 

    content_type? : string, 

    file_name? : string, 

    attributes?: MediaAttribute[],
    
}


export interface MediaAttribute {

    trait_type? : string,

    value? : string,
    
    display_type? : string, 

}


export const NEW_PFP_MEDIA : CollectionMedia = {
    name : "profile_pricture",
    layer_num : 0,
    medias : [{
        type : MediaType.data_uri,
    }],
    max_num_of_media : 1,
};


export const NEW_COLLECTION : Collection = {

    name : "", created_by : "",
    media_list : [NEW_PFP_MEDIA,NEW_PFP_MEDIA,NEW_PFP_MEDIA]
};