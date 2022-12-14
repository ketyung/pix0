import { FC, useState } from "react";
import { shortenStringTo } from "../../utils";
import { Spinner } from "../components/Spinner";
import { MessageView } from "../components/MessageView";
import { Message, MessageType } from "../../models";
import { Offer, OfferType } from "../../models/token_offer";
import useXrp from "../../hooks/useXrp";
import useWalletState from "../../hooks/useWalletState";
import { toClassicAddress } from "../../utils";
import useService from "../../hooks/useService";
import { TextField, commonTextfieldClassName } from "../components/TextField";
import { AccountNFToken } from "../../models";
import './css/SellForm.css';

type Props = {
    nftToken? : AccountNFToken,

    refreshSellOffersCallback? : (refresh: boolean) => void,
}

export const SellForm : FC <Props> = ({
    nftToken, refreshSellOffersCallback
}) =>{

    const {selectedWalletPubkey} = useWalletState();

    const {addOffer, hasOffer} = useService();

    const [offer, setOffer] = useState<Offer>({type: OfferType.Sell, price : 1, 
    created_by : {pubkey :selectedWalletPubkey, classic_address: toClassicAddress(selectedWalletPubkey ?? "") 
    }, nft_token : nftToken});

    const [message, setMessage] = useState<Message>();

    const [processing,setProcessing] = useState(false);

    const {createNftOffer} = useXrp();

    const setMessageNow = (message : Message) =>{

        setMessage(message);

        setTimeout(()=>{
            setMessage(undefined);
        },5000);

    }

    const createSellOffer = async () =>{

        if ( nftToken?.NFTokenID) {

            setProcessing(true);

            let _hasOffer = await hasOffer(nftToken.NFTokenID, OfferType.Sell, offer.destination);
            if (_hasOffer.has_offer) {

                setMessageNow({text : 
                `You've already created a sell offer for "${offer.destination ?? "public"}" for this NFT!`, 
                type: MessageType.Error });
                setProcessing(false);
                return;
            }

           
            await createNftOffer(nftToken?.NFTokenID, offer.price ?? 1, 
                offer.destination, true, async (e)=>{

                if (e instanceof Error){

                    setMessageNow({text : e.message,type : MessageType.Error });
                }
                else {
                  
                    let o = {...offer, seq_num : `${e.seq_num}`, offer_id : e.offer_id };

                    await addOffer(o); // index it off-ledger/chain 
    
                    setMessageNow({text : "Success", type : MessageType.Info, hash: e.hash});

                    if ( refreshSellOffersCallback )
                        refreshSellOffersCallback(true);
                }
                setProcessing(false);
            });
        }
    }


    return <div className="mt-2 text-left SellForm">
        {message && <MessageView message={message}/>}
        <div className="mb-4">
        <span className="font-bold mr-2">Token ID:</span>
        <span title={nftToken?.NFTokenID}>{ shortenStringTo(nftToken?.NFTokenID ?? "", 24)}</span>  
        </div>
        <div className="mb-4">
        <TextField label="Price: " type="number" labelInline={true} 
        value={`${offer.price}`}
        onChange={(e)=>{
            let p = parseFloat(e.target.value);
            if (p < 0)return;
            if ( !isNaN(p)) {
                setOffer({...offer, price : p});
            }
        }} className={commonTextfieldClassName('ml-2 w-64')}/><span className="ml-2 font-bold">XRP</span>
        </div>

        <div className="mb-4">
        <TextField label="Destination" type="text" value={offer.destination}
        onChange={(e)=>{
            setOffer({...offer, destination : e.target.value});    
        }}/>
        <p className="text-xs">This is the XRP wallet address of the person 
        that this offer is intended to. Leave blank if it's meant for everyone.</p></div>
       
        <div className="mb-4">
        <TextField label="Remark" type="text" value={offer.remark}
        onChange={(e)=>{
            setOffer({...offer, remark : e.target.value});    
        }}/></div>
       
        <div className="mb-4">
        <button title="Create Offer..." disabled={processing}
        className="text-sm w-64 font-bold text-2xl p-2 mb-2 bg-gray-800 rounded-3xl text-white" 
        onClick={async (e)=>{
            e.preventDefault();
            await createSellOffer();
        }}>{processing ? <Spinner/> : <><i className="fa fa-flag mr-2" aria-hidden="true"/>
        <span className="mr-6">Create</span></>}</button> 
        </div>
    
    </div>
 
}