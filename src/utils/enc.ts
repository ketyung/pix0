import { StoredWallet } from "../models";
import { Wallet } from "xrpl";
import { WalletPasswordStorage } from "./sess-storage";
import { shortenStringTo } from ".";
const CryptoJS = require('crypto-js');


export const encrypt = (text : string , secret : string ) =>{

    return CryptoJS.AES.encrypt(text, secret).toString();
}


export const decrypt = (ciphertext : string , secret : string ) =>{

    var bytes  = CryptoJS.AES.decrypt(ciphertext, secret);
    var originalText = bytes.toString(CryptoJS.enc.Utf8);
    return originalText;
}   



export const decryptStoredWallet = (storedWallet : StoredWallet) : Wallet|undefined =>{

    let pw = `${WalletPasswordStorage.get()}-${shortenStringTo(storedWallet.pubkey,10)}`; 

    try {

        let txt =  decrypt(storedWallet.encryptedValue, pw);

        return JSON.parse(txt) as Wallet;
    }
    catch(e : any) {


    }
}
