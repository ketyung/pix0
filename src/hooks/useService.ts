import * as service from "../service";
import { Collection, CollectionMedia } from "../models/collection";
import useWalletState from "./useWalletState";
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


    return {getCollectionsBy, addCollection, loading, updateCollection, getCollectionBy
    ,getCollectionsMediaBy} as const ;

}