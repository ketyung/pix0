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

        return 'my-default-password';
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
    let pw = `${wallet.publicKey}-${WalletPasswordStorage.get()}`; 

    let e =  enc.encrypt(s, pw);

    console.log("en.wallet::",e, new Date());

    return e; 
}


export class WalletsStorage {

    private static key : string = "WalletsStorageKey";


    static add(wallet : Wallet) {

        let ws = LocalStorage.get(this.key);

        console.log("adding.wallet:",wallet.publicKey, new Date());

        console.log("add.ws::", ws, new Date());

        if ( ws != null) {

            let wss = JSON.parse(ws) as StoredWallet[];
            if (wss !== null && wss.filter(w => {
                return (w.pubkey === wallet.publicKey);
            })[0] === undefined ){

                let sw : StoredWallet = { pubkey : wallet.publicKey,
                encryptedValue : encryptWallet(wallet) }
                
                wss.push(sw);

                let s = JSON.stringify(wss);
                console.log("add.wallet.more", s, new Date());
                LocalStorage.set(this.key, s);    
            }  
        }
        else {

            let newWs : StoredWallet[] = [];

            let sw : StoredWallet = { pubkey : wallet.publicKey,
            encryptedValue : encryptWallet(wallet) }

            console.log("adding.sw:@:", sw, new Date());

            newWs.push(sw);

            let s = JSON.stringify(newWs);
            LocalStorage.set(this.key, s );

            console.log("add.wallet", s, new Date());
        }
    }

    static remove (pubkey : string) {

        let ws = LocalStorage.get(this.key);

        if ( ws !== undefined && ws !== null) {

            let wss = JSON.parse(ws) as StoredWallet[];
            wss.splice(wss.findIndex(w => w.pubkey === pubkey),1);
            LocalStorage.set(this.key, JSON.stringify(wss));    
         
        }
    }

    static removeAll () {

        LocalStorage.set(this.key, null);
    }

    static storedWallets() : StoredWallet[] {


        let ws = LocalStorage.get(this.key);

        console.log("ws::", ws);

        if ( ws !== undefined && ws !== null) {

            let wss = JSON.parse(ws) as StoredWallet[];
            return wss; 
        }

        return [];
    }


}