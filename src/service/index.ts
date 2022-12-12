import { Collection, CollectionMedia, Minter, MinterGroup } from "../models/collection"
import { Offer, OfferType } from "../models/token_offer";
import { JWTStorage } from "../utils/sess-storage";

const REMOTE_URL = `${process.env.REACT_APP_SERVICE_API_URL ?? "http://localhost:3338/"}`;


const obtainHeaderWithJWT = async  () =>{

    let user : any = JSON.parse(process.env.REACT_APP_SERVICE_API_USER ?? "") ;

    if ( user ) {

        
        try {

            let jwt = JWTStorage.get();

            if ( jwt === null) {

                let url = `${REMOTE_URL}get_jwt/${encodeURIComponent(user.email)}/${encodeURIComponent(user.pass)}`;
      
                let c = await ((await fetch(url))).json() ;
                jwt = c.token;
                if ( jwt !== null )
                    JWTStorage.set(jwt);
            }
            
            let hdrs = ( jwt !== null ) ? {           
                'Content-Type': 'application/json',
                'token': jwt, 
            } : {           
                'Content-Type': 'application/json',
                'token': "none", 
            };

            return hdrs;
        }
        catch (e : any) {

            console.error("error@obtainJwt", e);

            return {           
                'Content-Type': 'application/json',
                'access_token': "none", 
            };

        }
    }

}


export const addCollection = async  (collection : Collection,
    completion? : (res : Error|Collection) => void ) =>{

    let url = `${REMOTE_URL}add_collection/`; 

    try {

        const response = await fetch(url, {
            method: 'POST', 
            mode: 'cors', 
            cache: 'no-cache', 
            //credentials: 'same-origin', // include, *same-origin, omit
            headers:await obtainHeaderWithJWT(),
            redirect: 'follow', 
            referrerPolicy: 'no-referrer', 
            body: JSON.stringify(collection) 
        });
        
        if ( response.status !== 200) {

            let return_err = (await response.json()) ;

            if ( completion ){
                completion( new Error(`${return_err.error} : ${return_err.details}`));
                return ;
            }
        }

        if ( completion) {

            let return_collection = (await response.json()) ;
            completion( {...collection, id: return_collection._id});
        }
    
    }
    catch(e : any ){

        if ( completion )
            completion( new Error(e.message));

    }
    
}

export const updateCollection = async  (collection : Collection,
    completion? : (res : Error|Collection) => void ) =>{

    let url = `${REMOTE_URL}update_collection/`; 

    try {

        const response = await fetch(url, {
            method: 'POST', 
            mode: 'cors', 
            cache: 'no-cache', 
            headers: await obtainHeaderWithJWT(),
            redirect: 'follow', 
            referrerPolicy: 'no-referrer', 
            body: JSON.stringify(collection) 
        });

        if ( response.status !== 200) {

            let return_err = (await response.json()) ;

            if ( completion ){
                completion( new Error(`${return_err.error} : ${return_err.details}`));
                return ;
            }
        }

        
        if ( completion) {

            let return_collection = (await response.json()) ;
            completion( {...collection, id: return_collection._id});
      
        }
    
    }
    catch(e : any ){

        if ( completion )
            completion( new Error(e.message));

    }
    
}



export const deleteCollection = async (collection_id : string, creator : string ) =>{

    let url = `${REMOTE_URL}delete_collection/${encodeURIComponent(collection_id)}/${encodeURIComponent(creator)}`;
    
    try {

        let c = await ((await fetch(url,{
            headers:await obtainHeaderWithJWT(),
        }))).json() ;
        return c;
    }
    catch (e : any) {

        console.error("error@deleteCollection", e);

        return e;
    }
}


export const getCollectionsBy = async (creator : string, offset : number = 0, limit : number = 20 )
: Promise<{res : Collection[], total? :number , offset? : number, limit? : number}> =>{

    let url = `${REMOTE_URL}collections/${encodeURIComponent(creator)}/${offset}/${limit}`;
    
    try {

        let c = await ((await fetch(url,{
            headers:await obtainHeaderWithJWT(),
        }))).json() ;
        return c;
    }
    catch (e : any) {

        console.error("error@getCollectionsBy", e);
        return { res :[] };
    }
}



export const getCollectionsByStatus = async (status : string , offset : number = 0, limit : number = 20 )
: Promise<{res : Collection[], total? :number , offset? : number, limit? : number}> =>{

    let url = `${REMOTE_URL}collections_by_status/${encodeURIComponent(status)}/${offset}/${limit}`;
    
    try {

        let c = await ((await fetch(url,{
            headers:await obtainHeaderWithJWT(),
        }))).json() ;
        return c;
    }
    catch (e : any) {

        console.error("error@getCollectionsBy", e);
        return { res :[] };
    }
}

export const getCollectionBy = async (creator : string, id : string )
: Promise<Collection|undefined> =>{

    let url = `${REMOTE_URL}collection_by/${encodeURIComponent(creator)}/${encodeURIComponent(id)}`;
    
    try {

        let c = await ((await fetch(url,{
            headers: await obtainHeaderWithJWT(),
        }))).json() ;

        return c;
    }
    catch (e : any) {

        console.error("error@getCollectionsBy", e);
        return undefined;
    }
}


export const addCollectionMedia = async  (
    media : {media : CollectionMedia,collection_id : string, creator : string},
    completion? : (res : Error|Collection) => void ) =>{

    let url = `${REMOTE_URL}add_collection_media/`; 

    try {

        const response = await fetch(url, {
            method: 'POST', 
            mode: 'cors', 
            cache: 'no-cache', 
            //credentials: 'same-origin', // include, *same-origin, omit
            headers:await obtainHeaderWithJWT(),
            redirect: 'follow', 
            referrerPolicy: 'no-referrer', 
            body: JSON.stringify(media) 
        });

        if ( response.status !== 200) {

            let return_err = (await response.json()) ;

            if ( completion ){
                completion( new Error(`${return_err.error} : ${return_err.details}`));
                return ;
            }
        }

        
        if ( completion) {

            let return_collection = (await response.json()) ;
            completion(return_collection);
      
        }
    
    }
    catch(e : any ){

        if ( completion )
            completion( new Error(e.message));

    }
    
}


export const updateCollectionMedia = async  (
    media : {media : CollectionMedia,collection_id : string, creator : string},
    completion? : (res : Error|Collection) => void ) =>{

    let url = `${REMOTE_URL}update_collection_media/`; 

    try {

        const response = await fetch(url, {
            method: 'POST', 
            mode: 'cors', 
            cache: 'no-cache', 
            //credentials: 'same-origin', // include, *same-origin, omit
            headers:await obtainHeaderWithJWT(),
            redirect: 'follow', 
            referrerPolicy: 'no-referrer', 
            body: JSON.stringify(media) 
        });
        
        if ( response.status !== 200) {
            
            let return_err = (await response.json()) ;

            if ( completion ){
                completion( new Error(`${return_err.error} : ${return_err.details}`));
                return ;
            }
        }


        if ( completion) {

            let return_collection = (await response.json()) ;
            completion(return_collection);
      
        }
    
    }
    catch(e : any ){

        if ( completion )
            completion( new Error(e.message));

    }
    
}


export const randomMediaForMinting = async (collection_id : string, minted_by : string  )
: Promise< CollectionMedia|undefined> =>{

    let url = `${REMOTE_URL}random_media_for_minting/${encodeURIComponent(collection_id)}/${encodeURIComponent(minted_by)}`;
    
    try {

        let c = await ((await fetch(url,{
            headers: await obtainHeaderWithJWT(),
        }))).json() ;

        return c;
    }
    catch (e : any) {

        console.error("error@getCollectionsBy", e);
        return undefined;
    }
}


export const availableMintCount = async (collection_id : string )
: Promise<{count: number}|undefined> =>{

    let url = `${REMOTE_URL}available_mint_count/${encodeURIComponent(collection_id)}`;
    
    try {

        let c = await ((await fetch(url,{
            headers: await obtainHeaderWithJWT(),
        }))).json() ;

        return c;
    }
    catch (e : any) {

        console.error("error@getCollectionsBy", e);
        return undefined;
    }
}


export const removeMintInfoOf = async (media_id : string, minted_by : string  )
: Promise< CollectionMedia|undefined> =>{

    let url = `${REMOTE_URL}remove_mint_info/${encodeURIComponent(media_id)}/${encodeURIComponent(minted_by)}`;
    
    try {

        let c = await ((await fetch(url,{
            headers: await obtainHeaderWithJWT(),
        }))).json() ;

        return c;
    }
    catch (e : any) {

        console.error("error@getCollectionsBy", e);
        return undefined;
    }
}



export const getCollectionsMediaCountBy = async (
    collection_id : string, created_by : string )
: Promise<{count : number}> =>{

    let url = 
    `${REMOTE_URL}collection_media_count/${encodeURIComponent(collection_id)}/${encodeURIComponent(created_by)}`;
    
    try {

        let c = await ((await fetch(url,{
            headers:await obtainHeaderWithJWT(),
        }))).json() ;
        return c;
    }
    catch (e : any) {

        console.error("error@getCollectionsBy", e);
        return { count : 0 };
    }
}

export const getCollectionsMediaBy = async (
    collection_id : string, created_by : string,
    offset : number = 0, limit : number = 20  )
    : Promise<{res : CollectionMedia[], total? :number , offset? : number, limit? : number}> =>{

    let url = 
    `${REMOTE_URL}collection_media/${encodeURIComponent(collection_id)}/${encodeURIComponent(created_by)}/${offset}/${limit}`;
    
    try {

        let c = await ((await fetch(url,{
            headers:await obtainHeaderWithJWT(),
        }))).json() ;
        return c;
    }
    catch (e : any) {

        console.error("error@getCollectionsBy", e);
        return { res : [] };
    }
}



export const getOneCollectionMedia = async (
    collection_id : string )
    : Promise<CollectionMedia|undefined> =>{

    let url = 
    `${REMOTE_URL}one_collection_media/${encodeURIComponent(collection_id)}`;
    
    try {

        let c = await ((await fetch(url,{
            headers:await obtainHeaderWithJWT(),
        }))).json() ;
        return c;
    }
    catch (e : any) {

        return undefined;
        
    }
}



export const addOffer = async  (offer : Offer,
    completion? : (res : Error|Offer ) => void ) =>{

    let url = `${REMOTE_URL}add_offer/`; 

    try {

        const response = await fetch(url, {
            method: 'POST', 
            mode: 'cors', 
            cache: 'no-cache', 
            //credentials: 'same-origin', // include, *same-origin, omit
            headers:await obtainHeaderWithJWT(),
            redirect: 'follow', 
            referrerPolicy: 'no-referrer', 
            body: JSON.stringify(offer) 
        });

        if ( response.status !== 200) {

            let return_err = (await response.json()) ;

            if ( completion ){
                completion( new Error(`${return_err.error} : ${return_err.details}`));
                return ;
            }
        }

        
        if ( completion) {

            let return_collection = (await response.json()) ;
            completion(return_collection);
      
        }
    
    }
    catch(e : any ){

        if ( completion )
            completion( new Error(e.message));

    }
    
}

export const deleteOffer = async  (offer_id : string ) =>{

    let url = 
    `${REMOTE_URL}delete_offer_by/${encodeURIComponent(offer_id)}`;
    
    try {

        let c = await ((await fetch(url,{
            headers:await obtainHeaderWithJWT(),
        }))).json() ;
        return c;
    }
    catch (e : any) {

        return {res: []};
    } 
}


export const getOffersBy = async (type : OfferType, 
    destination? : string, 
    offset?: number , limit? : number )
    : Promise<{res : Offer[], total? :number , offset? : number, limit? : number}> =>{

    let url = 
    `${REMOTE_URL}offers/${encodeURIComponent(type)}/${encodeURIComponent(destination ?? "any")}/${offset}/${limit}`;
    
    try {

        let c = await ((await fetch(url,{
            headers:await obtainHeaderWithJWT(),
        }))).json() ;
        return c;
    }
    catch (e : any) {

        console.error("error@getOffers", e);
        return {res: []};
        
    }
}

export const hasOffer = async (tokenId : string, type : OfferType,
    destination? : string  )
    : Promise<{has_offer : boolean}> =>{

    let url = 
    `${REMOTE_URL}has_offer/${encodeURIComponent(type)}/${encodeURIComponent(tokenId)}/${encodeURIComponent(destination ?? "any")}`;
    
    try {

        let c = await ((await fetch(url,{
            headers:await obtainHeaderWithJWT(),
        }))).json() ;
        return c;
    }
    catch (e : any) {

        return {has_offer: false};
        
    }
}



export const addMinterGroup = async  (minterGroup : MinterGroup,
    completion? : (res : Error|Collection) => void ) =>{

    let url = `${REMOTE_URL}add_minter_group/`; 

    try {

        const response = await fetch(url, {
            method: 'POST', 
            mode: 'cors', 
            cache: 'no-cache', 
            //credentials: 'same-origin', // include, *same-origin, omit
            headers:await obtainHeaderWithJWT(),
            redirect: 'follow', 
            referrerPolicy: 'no-referrer', 
            body: JSON.stringify(minterGroup) 
        });

        if ( response.status !== 200) {

            let return_err = (await response.json()) ;

            if ( completion ){
                completion( new Error(`${return_err.error} : ${return_err.details}`));
                return ;
            }
        }

        
        if ( completion) {

            let return_collection = (await response.json()) ;
            completion(return_collection);
      
        }
    
    }
    catch(e : any ){

        if ( completion )
            completion( new Error(e.message));

    }
    
}


export const addMintersToGroup = async  (minters : Minter[],
    completion? : (res : Error|Collection) => void ) =>{

    let url = `${REMOTE_URL}add_minters_to_group/`; 

    try {

        const response = await fetch(url, {
            method: 'POST', 
            mode: 'cors', 
            cache: 'no-cache', 
            //credentials: 'same-origin', // include, *same-origin, omit
            headers:await obtainHeaderWithJWT(),
            redirect: 'follow', 
            referrerPolicy: 'no-referrer', 
            body: JSON.stringify(minters) 
        });

        if ( response.status !== 200) {

            let return_err = (await response.json()) ;

            if ( completion ){
                completion( new Error(`${return_err.error} : ${return_err.details}`));
                return ;
            }
        }

        
        if ( completion) {

            let return_collection = (await response.json()) ;
            completion(return_collection);
      
        }
    
    }
    catch(e : any ){

        if ( completion )
            completion( new Error(e.message));

    }
    
}
