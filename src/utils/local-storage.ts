import * as enc from './enc';
import { Wallet } from 'xrpl';
import { shortenStringTo } from '.';
import { WalletPasswordStorage } from './sess-storage';
import { StoredWallet } from '../models';

export class LocalStorage {
	static get(name: string) {
		return localStorage.getItem(name);
	}

	static set(name: string, val: any) {
		return localStorage.setItem(name, val);
	}

	static remove(name : string){

		localStorage.removeItem(name);
	}
}



const encryptWallet = (wallet : Wallet) =>{

    let s = JSON.stringify(wallet);
    let pw = `${WalletPasswordStorage.get()}-${shortenStringTo(wallet.publicKey,10)}`; 

    let e =  enc.encrypt(s, pw);

    return e; 
}


export class WalletsStorage {

    private static key : string = "WalletsStorageKey";


    private static getKey () {

        let k = `${this.key}`
        return k;

    }

    static add(wallet : Wallet) {

        let ws = LocalStorage.get(this.getKey());

        if ( ws !== null) {

            let wss = JSON.parse(ws) as StoredWallet[];
            if (wss !== null && wss.length >= 5 ){
                window.alert("Has exceeded the max no of wallet allowed!");
                return;
            }
            
            if (wss !== null && wss.filter(w => {
                return (w.pubkey === wallet.publicKey);
            })[0] === undefined ){

                let sw : StoredWallet = { pubkey : wallet.publicKey,
                encryptedValue : encryptWallet(wallet) }
                
                wss.push(sw);

                let s = JSON.stringify(wss);
               
                LocalStorage.set(this.key, s);    
            }  
            else {

                this.createAndAdd(wallet);
            }
        }
        else {

            this.createAndAdd(wallet);
        }
    }

    private static createAndAdd(wallet : Wallet) {


        let newWs : StoredWallet[] = [];

        let sw : StoredWallet = { pubkey : wallet.publicKey,
        encryptedValue : encryptWallet(wallet) }


        newWs.push(sw);

        let s = JSON.stringify(newWs);
        LocalStorage.set(this.getKey(), s );

    }

    static remove (pubkey : string) {

        let ws = LocalStorage.get(this.getKey());

        if ( ws !== undefined && ws !== null) {

            let wss = JSON.parse(ws) as StoredWallet[];
            wss.splice(wss.findIndex(w => w.pubkey === pubkey),1);
            LocalStorage.set(this.key, JSON.stringify(wss));    
         
        }
    }

    static removeAll () {

        LocalStorage.set(this.getKey(), null);
    }

    static storedWalletsCount() : number {
        return this.storedWallets()?.length;
    }
    
    static storedWallets() : StoredWallet[] {

        let ws = LocalStorage.get(this.getKey());

        if ( ws !== undefined && ws !== null) {

            let wss = JSON.parse(ws) as StoredWallet[];
            return wss; 
        }

        return [];
    }


    static testIfPassValid () : boolean {

        let sw = this.storedWallets();
        if ( sw.length > 0 ){

            return ( enc.decryptStoredWallet(sw[0]) !== undefined);
        }

        return false;
    }


    static get(pubkey? : string) : StoredWallet|undefined {

        if ( pubkey ) {

            let ws = LocalStorage.get(this.getKey());

            if ( ws !== null) {

                let wss = JSON.parse(ws) as StoredWallet[];
        
                if ( wss !== undefined  && wss !== null) {
                    return wss.filter(w => {
                        return (w.pubkey === pubkey);
                    })[0];
                }
            
            }
        }

    }


}


export class SelectedWalletStorage {


    private static key : string = "SelectedWalletStorageKey";


    static setSelected(pubkey : string) {

        LocalStorage.set(this.key, pubkey);    
    }

    static getSelected() {

        let s =LocalStorage.get(this.key);    
        return (s===null) ? undefined : s;
    }

    static remove () {

        LocalStorage.set(this.key, null);
    }


}