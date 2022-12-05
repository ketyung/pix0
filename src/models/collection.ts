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

    status? : Status,

    item_name_prefix? : string, 
  
    media_count? : number, 

    created_by : string, 

    date_created? : Date,

    date_updated? : Date,
}


export interface CollectionMedia {

    collection_id : string, 

    name : string, 

    created_by? : string, 

    max_num_of_media? : number, 
    
    medias : Media[],

    date_created? : Date,

    date_updated? : Date,

}


export enum MediaType {

    media_uri = 1 ,
    
    text = 2,

    shape = 3, 
}


export interface Media {

    type : MediaType,

    layer_num : number, 

    layer_name? : string,

    value? : string, // value can be uri or another JSON string
    // percentage of ocurrance
    poc? : number, 

    content_type? : string, 

    file_name? : string, 

    attributes?: Attribute[],    
}


export interface Attribute {

    trait_type? : string,

    value? : string,
    
    display_type? : string, 

}
