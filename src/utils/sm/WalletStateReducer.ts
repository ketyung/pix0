import * as WalletActions from './WalletActions';


export type WalletState = {

    selectedWalletPubkey? : string ,

    walletsCount? : number,

    dateUpdated? : Date, 

    lastError? : Error, 

}

const INIT_STATE : WalletState = {
    
    dateUpdated : new Date(), 
};


export const WalletReducer = (state : WalletState = INIT_STATE, 
    action : WalletActions.WalletAction ) : WalletState => {

 
    switch(action.type) {

        case WalletActions.SET_WALLETS_COUNT :
 
            return {...state, walletsCount : action.walletsCount, 
                dateUpdated : new Date() };

        case WalletActions.SET_SELECTED_WALLET :

            return {...state, selectedWalletPubkey : action.selectedWalletPubkey, 
                dateUpdated : new Date() };

            
        default :

            return state; 
    }
}