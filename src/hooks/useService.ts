import * as service from "../service";
import { Offer, OfferType } from "../models/token_offer";
import { Collection, CollectionMedia } from "../models/collection";
import { toClassicAddress } from "../utils";
import useWalletState from "./useWalletState";
import { singleUpload } from "../cloudUpload";
import { useState } from "react";

export default function useService()  {


    const {selectedWalletPubkey} = useWalletState();

    const [loading, setLoading] = useState(false);

    const addCollection = async  (collection : Collection,
        completion? : (res : Error|Collection) => void ) => {
        
        if ( selectedWalletPubkey) {

            setLoading(true);
            collection.created_by = selectedWalletPubkey;

            await service.addCollection(collection, completion);
            setLoading(false);
        }
        else {

            if (completion) {
                completion( new Error('No connected wallet!'));
            }
        }
        

    }

    const updateCollection = async  (collection : Collection,
        completion? : (res : Error|Collection) => void ) => {
        
        if ( selectedWalletPubkey) {

            setLoading(true);
            collection.created_by = selectedWalletPubkey;

            await service.updateCollection(collection, completion);
            setLoading(false);
        }
        else {

            if (completion) {
                completion( new Error('No connected wallet!'));
            }
        }
        

    }


    const getCollectionsBy = async (offset : number = 0, limit : number = 20 )
    : Promise<{res : Collection[], total? :number , offset? : number, limit? : number}> => {

        if ( selectedWalletPubkey) {
            setLoading(true);
            
            let c = await service.getCollectionsBy(selectedWalletPubkey , offset, limit);
            setLoading(false);
            return c; 
        }

        return {res: []};
    }



    const getPublishedCollections = async (offset : number = 0, limit : number = 20 )
    : Promise<{res : Collection[], total? :number , offset? : number, limit? : number}> => {

        setLoading(true);
        
        let c = await service.getCollectionsByStatus("P" , offset, limit);
        setLoading(false);
        return c; 
    
    }


    const deleteCollection = async (collection_id : string, 
        completion? : (res : Error|any ) => void ) => {

        if ( selectedWalletPubkey) {

            setLoading(true);

            let res = await service.deleteCollection(collection_id, selectedWalletPubkey);
            if (completion){
                completion(res);
            }

            setLoading(false);
        }
        else {

            if ( completion)
                completion(new Error('No connected wallet!'));
        }
        

     
    }


    const getCollectionBy = async (id : string )
    : Promise<Collection|undefined> =>{


        if ( selectedWalletPubkey) {
            setLoading(true);
            
            let c = await service.getCollectionBy(selectedWalletPubkey , id);
            setLoading(false);
            return c; 
        }

        return undefined;

    }

    const getCollectionsMediaBy = async (
    collection_id : string,     
    offset : number = 0, limit : number = 20 )
    : Promise<{res : CollectionMedia[], total? :number , offset? : number, limit? : number}> => {

        if ( selectedWalletPubkey) {
            setLoading(true);
            
            let c = await service.getCollectionsMediaBy(
                collection_id, selectedWalletPubkey , offset, limit);
            setLoading(false);
            return c; 
        }

        return {res: []};
    }


    const getOneCollectionMedia = async (
        collection_id : string )
        : Promise<CollectionMedia|undefined> => {

        setLoading(true);
        
        let c = await service.getOneCollectionMedia(collection_id);

        setLoading(false);
        
        return c; 
    }

    const getCollectionsMediaCountBy = async (
        collection_id : string)
        : Promise<{count : number}> => {
    
        if ( selectedWalletPubkey) {
            setLoading(true);
            
            let c = await service.getCollectionsMediaCountBy(
                collection_id, selectedWalletPubkey);
            setLoading(false);
            return c; 
        }

        return {count: 0};
    }

    const addCollectionMedia = async  (
        media : CollectionMedia,
        collection_id : string,
        mediaDataUrl? : string, 
        completion? : (res : Error|Collection) => void ) =>{

        if ( selectedWalletPubkey ) {

            setLoading(true);

            if ( mediaDataUrl ) {

                let uri = await singleUpload(mediaDataUrl, selectedWalletPubkey);

                if (uri instanceof Error){

                    if (completion){
                        completion(uri);
                    }
                    return;
                }
                else {
                    media.medias[0].value = uri;
                }
            }

            await service.addCollectionMedia({
                media : media,
                collection_id : collection_id,
                creator : selectedWalletPubkey,
            }, completion);

            setLoading(false);
        }
    }

    const addOffer = async  (offer : Offer,
        completion? : (res : Error|Offer) => void ) => {

        setLoading(true);

        await service.addOffer(offer, completion);

        setLoading(false);
    }

    const deleteOffer = async (offer_id : string) => {

        setLoading(true);

        await service.deleteOffer(offer_id);

        setLoading(false);
    }

    const getOffers = async (
        type : OfferType, 
        destination? : string,
        offset : number = 0, limit : number = 20 )
        : Promise<{res : Offer[], total? :number , offset? : number, limit? : number}> => {
    
        setLoading(true);
        
        let c = await service.getOffersBy(type , destination, offset, limit);
        setLoading(false);
        return c;         
    }

    const getPrivateOffers = async (
        type : OfferType, 
        offset : number = 0, limit : number = 20 )
        : Promise<{res : Offer[], total? :number , offset? : number, limit? : number}> => {

        if (selectedWalletPubkey) {

            return await getOffers(type, toClassicAddress(selectedWalletPubkey), offset, limit );
        }

        return {res :[]};
    }



    const hasOffer = async (tokenId : string, type : OfferType, destination? : string )
    : Promise<{has_offer : boolean}> =>{

        let c = await service.hasOffer(tokenId, type, destination);
        return c;
    }
    

    return {getCollectionsBy, addCollection, loading, updateCollection, getCollectionBy
    ,getCollectionsMediaBy, getCollectionsMediaCountBy, addCollectionMedia, addOffer, 
    getOffers,deleteOffer,hasOffer,getPrivateOffers,  
    getPublishedCollections, getOneCollectionMedia,
    deleteCollection} as const ;

}