const CryptoJS = require('crypto-js');


export const encrypt = (text : string , secret : string ) =>{

    return CryptoJS.AES.encrypt(text, secret).toString();
}


export const decrypt = (ciphertext : string , secret : string ) =>{

    var bytes  = CryptoJS.AES.decrypt(ciphertext, secret);
    var originalText = bytes.toString(CryptoJS.enc.Utf8);
    return originalText;
}   