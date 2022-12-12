# Pix0

Pix0 is an all-in-one NFT wallet which you can use to mint, creation collections, sell and buy NFTs on
the XRP Ledger. Currently, it's a project built from scratch for the XRP NFT hackathon https://devpost.com/software/pix0


## What it does
There are 5 sections in it:

1. The Wallet, this is a browser-based wallet, which stores the XRP wallets on the user's browser's local storage and the password on the session storage with 256 AES encryption. It does NOT store any wallets' private key and seed on the server backend. Only public key and the XRP classic address are being stored on the app's backend for referring back to any collections or other data created by the wallet users. Users are able to create up to 5 wallets.

2. The Collectibles section displays a list of NFTs the wallet users have minted into their wallets. And from each individual NFT, they can view the details, sell the NFT on the marketplace by creating sell offers for public or private for any intended wallet. Sell offers and buy offers can also be managed here.

3. The Mint NFT section has two tools - one is Simple Mint, which allows the users to simply provide a url or upload an image of the art piece they own and key in information including name, description and metadata of the NFT and mint it into their wallet. Once it is minted, the image and metadata NFT are uploaded to Arweave - the decentralised and permanent storage. The metadata of the NFT is based on OpenSea NFT metadata standard. 

The second one is users can mint any NFT randomly from any collections created by creators or artists in the Creator section. Minted NFT image and metadata are stored on Arweave.

4. The Buy NFT section lets users to buy any NFT from a public list of sell offers or a private list which the sell offers are created solely for them. They can also create buy offers from here.

5. The Creator section is for any artists or creators to create their collections of NFTs, so others can mint them randomly into their wallets. When a collection created, with its info and metadata such as name, description, price in XRP and transfer fee etc, they can start adding images for those collections. 

Images of these collections are temporarily stored on Cloudinary image storage. Once they are minted from the , they are then stored on decentralised and permanent storage - Arweave. The upcoming features of this section including creators are able to create their groups of minters with different prices such as OG, WhiteList etc.


A live demo version is available on https://test.pix0.xyz/

If you want to run this on localhost, you must do the followings:

## Include a .env file
You must include a .env file which contains a number of parameters as follows:

````
REACT_APP_SERVICE_API_URL=...
REACT_APP_ARWEAVE_KEY=..
REACT_APP_CLOUD_UPLOAD_URL=...
REACT_APP_CLOUDINARY_PARAMS=[{"name":"cloud1","api_key":"xxxxx","secret":"xxxxx", "upload_folder":"xxxx"}]
REACT_APP_SERVICE_API_USER=...
REACT_APP_LOCAL_WALLET_PASS_KEY=...
````

In the project directory, you can run:

### `yarn start`

Runs the app in the development mode.\
Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

# License 
MIT License
Copyright (c) 2022 Christopher Ket Yung Chee. See [License](https://github.com/ketyung/pix0/blob/master/LICENSE.md) for details
