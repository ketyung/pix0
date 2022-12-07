import { fetchAsNFTMedata } from "../../utils";
import { FC , useState, useCallback, useEffect} from "react";
import { SaleForm } from "./SaleForm";
import useXrp from "../../hooks/useXrp";
import { Spinner } from "../components/Spinner";
import { Modal } from "../components/Modal";
import { ViewType } from "./View";
import * as xrpl from 'xrpl';


import { AccountNFToken, NFTMetadata } from "../../models";

type Props = {

    nftToken? : AccountNFToken,

    setViewType? : (viewType : { viewType : ViewType, param? : any}) => void, 

}


export const NftDetailsView : FC <Props> = ({
    nftToken, setViewType
}) =>{

    const [mediaURI, setMediaURI] = useState<NFTMetadata>();

    const [processing, setProcessing] = useState(false);

    const [isBurned, setIsBurned] = useState(false);

    const fetchURI = useCallback( async ()=>{

        let m = await fetchAsNFTMedata( xrpl.convertHexToString(nftToken?.URI ?? ""));
        setMediaURI(m);

    },[]);

    useEffect(()=>{

        fetchURI();
    
    },[nftToken?.URI]);


    const {burnNft} = useXrp();


    const burnNftNow = async () =>{

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
     <img src={mediaURI === undefined ? xrpl.convertHexToString(nftToken?.URI ?? "")
        : mediaURI.image } 
        className="object-scale-down h-80 w-80 my-2 content-center mx-auto"
        title={mediaURI?.description ? mediaURI.description : "image..."}/>
    </div>
    {mediaURI?.name && <div className="mb-4 font-bold text-2xl">{mediaURI?.name}</div>}
    {mediaURI?.description && <div className="mb-4">{mediaURI?.description}</div>}

    <div className="mb-4">
    { !isBurned && 
    <Modal title="Create Sell Offer for this NFT" triggerButton={
    <><i className="fa fa-exchange mr-2" aria-hidden="true"/><span className="mr-6">Sell</span></>}
    triggerButtonClassName="text-sm w-64 font-bold ml-4 text-2xl p-2 mb-2 bg-gray-900 rounded-3xl text-white ease-linear transition-all duration-250"
    ><SaleForm nftToken={nftToken}/></Modal>}
    </div>

    {(nftToken?.Flags === 1 && !isBurned) && <div className="mb-4">
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