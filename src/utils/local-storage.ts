import * as enc from './enc';

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

        return process.env.REACT_APP_LOCAL_WALLET_PASS_KEY ?? "v66253XA3355x53HBA345X233";
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