import * as enc from './enc';
import { Wallet } from 'xrpl';
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


export class WalletPasswordStorage {

    private static key : string = "LocalPasswordKey";

    private static getPassEncKey() {

        return process.env.REACT_APP_LOCAL_WALLET_PASS_KEY ?? 
        "Vfaf42X6273#nMAj93HAJkxwPv66253XA3355x53HBA345XxJKad233";
    }

    static get() {

        let p = LocalStorage.get(this.key);
        if ( p !== null && p!==undefined) {

            return enc.decrypt(p, this.getPassEncKey());
        }

        return undefined;
    }

    static set(password : string) {

        LocalStorage.set(this.key, enc.encrypt(password, this.getPassEncKey()));
    }


    static remove(){
        LocalStorage.remove(this.key);
    }

}


const encryptWallet = (wallet : Wallet) =>{

    let s = JSON.stringify(wallet);
    let pw = WalletPasswordStorage.get(); 

    return enc.encrypt(s, pw);
}


export class WalletsStorage {

    private static key : string = "WalletsStorageKey";


    static add(wallet : Wallet) {

        let ws = LocalStorage.get(this.key);

        if (ws === null || ws === undefined) {

            let newWs : StoredWallet[] = [];

            let sw : StoredWallet = { pubkey : wallet.publicKey,
            encryptedValue : encryptWallet(wallet) }
            newWs.push(sw);

            LocalStorage.set(this.key, newWs);
        }
        else {

            let wss = JSON.parse(ws) as StoredWallet[];
            if (wss.filter(w => {
                return (w.pubkey === wallet.publicKey);
            })[0] === undefined ){

                let sw : StoredWallet = { pubkey : wallet.publicKey,
                encryptedValue : encryptWallet(wallet) }
                   
                wss.push(sw);
                LocalStorage.set(this.key, wss);    
            }
          
        }
    }

    static remove (pubkey : string) {


    }


}