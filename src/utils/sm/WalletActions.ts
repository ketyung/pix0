export const SET_WALLETS_COUNT = "SET_WALLETS_COUNT";

export const SET_SELECTED_WALLET = "SET_SELECTED_WALLET";

export type WalletAction = {

    type: string,

    dateUpdated? : Date, 

    walletsCount? : number, 

    selectedWalletPubkey? : string, 

}


export function setWalletsCount(count : number) {

    const action: WalletAction = {
        type: SET_WALLETS_COUNT,
        walletsCount : count,
        dateUpdated : new Date(), 
    } 
  
    return action;
}



export function setSelectedWallet(selectedWalletPubkey?: string ) {

    const action: WalletAction = {
        type: SET_WALLETS_COUNT,
        selectedWalletPubkey : selectedWalletPubkey,
        dateUpdated : new Date(), 
    } 
  
    return action;
}
