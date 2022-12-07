import { StoredWallet } from "../models";
import { Wallet } from "xrpl";
import { WalletPasswordStorage } from "./sess-storage";
import { shortenStringTo } from ".";
const CryptoJS = require('crypto-js');

const keySize = 256
const iterations = 100

export const encrypt = (msg: string, pass: string) => {
    try 
    {
    
        const salt = CryptoJS.lib.WordArray.random(128 / 8);
  
        const key = CryptoJS.PBKDF2(pass, salt, {
            keySize: keySize / 32,
            iterations: iterations,
        });
    
        const iv = CryptoJS.lib.WordArray.random(128 / 8);
    
        const encrypted = CryptoJS.AES.encrypt(msg, key, {
            iv: iv,
            padding: CryptoJS.pad.Pkcs7,
            mode: CryptoJS.mode.CBC,
        });
  
       const transitmessage =
          salt.toString() + iv.toString() + encrypted.toString()
      
       return transitmessage
    } 
    catch (error) {
       return undefined
    }
}


export const decrypt = (transitmessage: string, pass: string) => {
    try 
    {
       
        /*
        const salt = CryptoJS.enc.Hex.parse(transitmessage.substr(0, 32))
        const iv = CryptoJS.enc.Hex.parse(transitmessage.substr(32, 32))
        const encrypted = transitmessage.substring(64)
        // substr - deprecated, use substring as the followings
        */

        const salt = CryptoJS.enc.Hex.parse(transitmessage.substring(0, 32));
        const iv = CryptoJS.enc.Hex.parse(transitmessage.substring(32, 64));
        const encrypted = transitmessage.substring(64);
       
        const key = CryptoJS.PBKDF2(pass, salt, {
            keySize: keySize / 32,
            iterations: iterations,
        });
    
        const decrypted = CryptoJS.AES.decrypt(encrypted, key, {
            iv: iv,padding: CryptoJS.pad.Pkcs7,
            mode: CryptoJS.mode.CBC,
        }).toString(CryptoJS.enc.Utf8);

        
        return decrypted;

    } 
    catch (error) {
      return undefined;
    }
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
