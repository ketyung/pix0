import Arweave from 'arweave';
import { JWKInterface } from 'arweave/node/lib/wallet';

export const uploadToArweave = async (
    imageDataUri? : string, 
    contentType?: string, 
    completion? : (e : Error|string)=> void) =>{

    const arweave = Arweave.init({
        host: 'arweave.net',
        port: 443,
        protocol: 'https'
    });

    const akey = process.env.REACT_APP_ARWEAVE_KEY; 
    if ( akey === undefined ) {
        if ( completion )
         completion(new Error("Undefined ARWEAVE KEY"));

        return;
    }

    if ( imageDataUri === undefined) {

        if ( completion )
            completion(new Error("No image data"));

        return;
    }


    const arweaveKey = JSON.parse(akey) as JWKInterface;
    const arweaveWallet = await arweave.wallets.jwkToAddress(arweaveKey);
    const bal = await arweave.wallets.getBalance(arweaveWallet);

  
    const buf = Buffer.from(imageDataUri.split(",")[1], "base64");

   
    if ( parseFloat(bal) === 0 ) {

        if ( completion )
            completion(new Error(`Arweave wallet ${arweaveWallet} has ${bal} balance!`));
        return; 
    }

    let transaction = await arweave.createTransaction({data: buf}, arweaveKey);
    transaction.addTag('Content-Type', contentType ?? "image/png");
    await arweave.transactions.sign(transaction, arweaveKey);
    await arweave.transactions.post(transaction);
    const status = await arweave.transactions.getStatus(transaction.id)
    console.log(`Completed transaction ${transaction.id} with status code ${status}!`,
    `https://www.arweave.net/${transaction.id}?ext=png`, new Date());
 
    if ( completion ) {

        completion( `https://www.arweave.net/${transaction.id}?ext=png` );
    }
    
}