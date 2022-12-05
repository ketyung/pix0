import Arweave from 'arweave';
import { JWKInterface } from 'arweave/node/lib/wallet';
import { NFTMetadata } from '../models';

export const uploadToArweave = async (
    imageDataUri? : string, 
    contentType?: string) : Promise<Error|string> =>{

    const arweave = Arweave.init({
        host: 'arweave.net',
        port: 443,
        protocol: 'https'
    });

    const akey = process.env.REACT_APP_ARWEAVE_KEY; 
    if ( akey === undefined ) {
        return new Error("Undefined ARWEAVE KEY");
    }

    if ( imageDataUri === undefined) {

        return new Error("No image data");
    }


    const arweaveKey = JSON.parse(akey) as JWKInterface;
    const arweaveWallet = await arweave.wallets.jwkToAddress(arweaveKey);
    const bal = await arweave.wallets.getBalance(arweaveWallet);

  
    const buf = Buffer.from(imageDataUri.split(",")[1], "base64");

   
    if ( parseFloat(bal) === 0 ) {

        return new Error(`Arweave wallet ${arweaveWallet} has ${bal} balance!`);

    }

    let transaction = await arweave.createTransaction({data: buf}, arweaveKey);
    transaction.addTag('Content-Type', contentType ?? "image/png");
    await arweave.transactions.sign(transaction, arweaveKey);
    await arweave.transactions.post(transaction);
    /*
    const status = await arweave.transactions.getStatus(transaction.id)
    console.log(`Completed transaction ${transaction.id} with status code ${status}!`,
    `https://www.arweave.net/${transaction.id}?ext=png`, new Date());
    */

    return `https://www.arweave.net/${transaction.id}?ext=png` ;
    
}


export const uploadMetadata = async (data : NFTMetadata) : Promise<string|Error> =>{

    const akey = process.env.REACT_APP_ARWEAVE_KEY; 
    if ( akey === undefined ) {
        return new Error("Undefined ARWEAVE KEY");
    }

    const arweave = Arweave.init({
        host: 'arweave.net',
        port: 443,
        protocol: 'https'
    });

    const arweaveKey = JSON.parse(akey) as JWKInterface;
    const arweaveWallet = await arweave.wallets.jwkToAddress(arweaveKey);
    const bal = await arweave.wallets.getBalance(arweaveWallet);

    if (parseFloat(bal) === 0) {

        return new Error(`Arweave wallet ${arweaveWallet} has ${bal} balance!`);
    }

    let tx = await arweave.createTransaction({
        data: JSON.stringify(data) 
    }, arweaveKey);

    tx.addTag('Content-Type', 'text/json');

    await arweave.transactions.sign(tx, arweaveKey);
    await arweave.transactions.post(tx);
    
    //const status = await arweave.transactions.getStatus(tx.id)

    //if (status.status === 200){

    return `https://www.arweave.net/${tx.id}` ;
    //}

    //return undefined; 
}