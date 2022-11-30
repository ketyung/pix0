import * as service from "../service";
import { Collection } from "../models/collection";
import useWalletState from "./useWalletState";

export default function useService()  {


    const {selectedWalletPubkey} = useWalletState();


    const getCollectionsBy = async (offset : number = 0, limit : number = 20 )
    : Promise<Collection[]> => {

        if ( selectedWalletPubkey) {
            let c = await service.getCollectionsBy(selectedWalletPubkey , offset, limit);
            return c; 
        }

        return [];
    }


    return {getCollectionsBy} as const ;

}