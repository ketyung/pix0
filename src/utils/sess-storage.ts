import * as enc from './enc';

export class SessionStorage {
	static get(name: string) {
		return sessionStorage.getItem(name);
	}

	static set(name: string, val: any) {
		return sessionStorage.setItem(name, val);
	}

	static remove(name : string){

		sessionStorage.removeItem(name);
	}
}


export class WalletPasswordStorage {

    private static key : string = "SessPasswordKey";

    private static getPassEncKey() {

        return process.env.REACT_APP_LOCAL_WALLET_PASS_KEY ?? 
        "Vfaf42X6273#nMAj93HAJkxwPv66253XA3355x53HBA345XxJKad233";
    }

    static hasPass() {

        let p = SessionStorage.get(this.key);
        return ( p !== null && p!==undefined);
    }

    static get() {

        let p = SessionStorage.get(this.key);

       
        if ( p !== null ) {

            return  enc.decrypt(p, this.getPassEncKey());

        }

        return 'my-default-password';
    }

    static set(password : string) {
        SessionStorage.set(this.key, enc.encrypt(password, this.getPassEncKey()));
    }

    static get_encrypted() {

        let p = SessionStorage.get(this.key);
        return p;
    }   


    static remove(){
        SessionStorage.remove(this.key);
    }

}


export class JWTStorage {

    private static key : string = "SessJwtKey";


    static get() {

        let p = SessionStorage.get(this.key);
        if ( p !== null) {

            let pp = null;

            try {
                pp = JSON.parse(p) as {jwt : string, date : number};
            }
            catch(e : any){}

            if ( pp === undefined || pp === null ){

                this.remove();
                return null;
            }
            //revoke if more than 1 hour
            if ((new Date().getTime() - pp.date) > (1000*60*60)){

                this.remove();
                return null;
            }
              
            return pp.jwt;
        }
        return p;
    }

    static set(jwt : string) {

        let jwtObj : {jwt : string, date : number} =  
        { jwt : jwt, date : new Date().getTime()};

        SessionStorage.set(this.key, JSON.stringify(jwtObj));
    }

    static remove(){
        SessionStorage.remove(this.key);
    }

}