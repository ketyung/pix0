import { FC , useState, useCallback, useEffect} from "react";
import { NFTMetadataImageView } from "./NFTMetadataImageView";
import { SellForm } from "./SellForm";
import { OffersList } from "./OffersList";
import { NFTOffer } from "xrpl/dist/npm/models/common";
import useXrp from "../../hooks/useXrp";
import { Spinner } from "../components/Spinner";
import { Modal } from "../components/Modal";
import { ViewType } from "./View";


import { AccountNFToken, NFTMetadata } from "../../models";

type Props = {

    nftToken? : AccountNFToken,

    setViewType? : (viewType : { viewType : ViewType, param? : any}) => void, 

}


export const NftDetailsView : FC <Props> = ({
    nftToken, setViewType
}) =>{

    const [metadata, setMetadata] = useState<NFTMetadata>();

    const [processing, setProcessing] = useState(false);

    const [isBurned, setIsBurned] = useState(false);

    const [sellOffers, setSellOffers] = useState<NFTOffer[]>();

    const {burnNft, getNftSellOffers} = useXrp();

    const fetchSellOffers = useCallback( async () =>{

        if ( nftToken?.NFTokenID ) {

            let offrs = await getNftSellOffers(nftToken?.NFTokenID );
            setSellOffers(offrs);
        }
       
    },[getNftSellOffers]);


    const isBurnable = () =>{
        return nftToken?.Flags === 1 || nftToken?.Flags === (1+8) ||
        nftToken?.Flags === (1+2+8);
    }

    /*
    const isTransferable = () =>{
        return nftToken?.Flags === 8 || nftToken?.Flags === (1+8) ||
        nftToken?.Flags === (1+2+8);
    }*/

    useEffect(()=>{

        fetchSellOffers();
    
    },[nftToken]);


    const refreshSellOffersCallback = async (refresh : boolean) => {

        if ( refresh )
            await fetchSellOffers();
    }
   

    const burnNftNow = async () =>{

        if ((sellOffers?.length ?? 0) > 0 ){
            window.alert(
            `You are NOT allowed to burn it now as you have ${sellOffers?.length} sell offers. You should cancel them if you wanna burn this NFT`);
            return;
        }


        if ( window.confirm('To burn this NFT?')) {

            if ( nftToken?.NFTokenID ) {

                setProcessing(true);

                await burnNft(nftToken?.NFTokenID, (e)=>{

                    if ( e instanceof Error) {

                        window.alert(`Error :${e.message}`);
                    }
                    else {
                        setIsBurned(true);
                        window.alert('NFT successfully burned!');
                        
                        setTimeout(()=>{

                            if (setViewType){
                                setViewType({viewType : ViewType.List});
                            }
                        }, 2000);
                    }

                    setProcessing(false);
                });
            }
            else {

                window.alert('Undefined token ID');
            }
        }
    }


    return <div className="mt-2 border-2 border-gray-200 mx-auto mb-10 shadow-lg w-8/12 rounded-2xl text-center">
    <div className="text-right  p-2">
    <i className="fa fa-window-close m-4 cursor-pointer" 
    aria-hidden="true" onClick={()=>{

        if ( setViewType) {
            setViewType( { viewType :ViewType.List});
        }
    }}/>
    </div>
    <div className="mb-2 text-center mt-2 p-2">
        <NFTMetadataImageView hexUri={nftToken?.URI} setMetadataCallback={setMetadata}/>
    </div>
    {metadata?.name && <div className="mb-4 font-bold text-2xl">{metadata?.name}</div>}
    {metadata?.description && <div className="mb-4">{metadata?.description}</div>}

    <div className="mb-4">
    { !isBurned && 
    <Modal id="SellFormModal" title="Create Sell Offer for this NFT" triggerButton={
    <><i className="fa fa-exchange mr-2" aria-hidden="true"/><span className="mr-6">Sell</span></>}
    triggerButtonClassName="text-sm w-64 font-bold ml-4 text-2xl p-2 mb-2 bg-gray-900 rounded-3xl text-white ease-linear transition-all duration-250"
    ><SellForm nftToken={nftToken} refreshSellOffersCallback={refreshSellOffersCallback} /></Modal>}
    </div>
    
    {((sellOffers?.length ?? 0) > 0) && 
      <div className="mb-4">
         <Modal id="OffersModal" title="Offers" triggerButton={
    <><i className="fa fa-check mr-2" aria-hidden="true"/><span className="mr-4">Offers</span></>}
    triggerButtonClassName="text-sm w-64 font-bold ml-4 text-2xl p-2 mb-2 bg-blue-900 rounded-3xl text-white ease-linear transition-all duration-250"
    ><OffersList tokenId={nftToken?.NFTokenID ?? ""} /></Modal>
     </div>}

    {(isBurnable() && !isBurned ) && <div className="mb-4">
    <button title="Burn!!" disabled={processing}
    className="text-sm w-64 font-bold ml-4 text-2xl p-2 mb-2 bg-red-800 rounded-3xl text-white" 
    onClick={async (e)=>{
        e.preventDefault();
        await burnNftNow();
    }}>{processing ? <Spinner/> : <><i className="fa fa-fire mr-2" aria-hidden="true"/>
    <span className="mr-6">Burn?</span></>}</button> 
    </div>
    }
    </div>
}