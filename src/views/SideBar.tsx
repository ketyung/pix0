import { FC } from "react";
import usePage from "../hooks/usePage";
import { Page } from "../models";


export const SideBar : FC = () =>{

    const {setPage, isPage} = usePage();

    const classNamesIfPageIs = ( page : Page) => {

        return isPage(page) ? "text-sky-300 bg-gray-700 p-2 rounded-md" : 
        "cursor-pointer text-gray-400 hover:text-orange-300 p-2"

    }


    return <div className=" min-h-0 flex-1 flex overflow-hidden">
    <nav aria-label="Sidebar" className="hidden lg:block flex-shrink-0 bg-gray-800 overflow-y-auto">
        <div className="relative w-30 flex space-y-16 flex-col p-3">

            <a onClick={()=>{
                setPage(Page.Wallet);
            }} className={ classNamesIfPageIs(Page.Wallet)}>
                <div className="flex-shrink-0 inline-flex items-center justify-center w-14">
                    <i className="fa fa-money"></i>
                </div>
                <div className="text-center text-xs font-normal ">Wallet</div>
            </a>

            <a onClick={()=>{
                setPage(Page.MintNFT);
            }} className={ 
                classNamesIfPageIs(Page.MintNFT)}>
                <div className="flex-shrink-0 inline-flex items-center justify-center w-14">
                    <i className="fa fa-picture-o"></i>
                </div>
                <div className="text-center text-xs font-normal ">Mint NFT</div>
            </a>


            <a onClick={()=>{
                setPage(Page.Collectibles);
            }} className={classNamesIfPageIs(Page.Collectibles)}>
                <div className="flex-shrink-0 inline-flex items-center justify-center w-14">
                    <i className="fa fa-gift"></i>
                </div>
                <div className="text-center text-xs font-normal ">Your Collectibles</div>
            </a>

            <a onClick={()=>{
                setPage(Page.CreateCollection);
            }} className={classNamesIfPageIs(Page.CreateCollection)}>
                <div className="flex-shrink-0 inline-flex items-center justify-center w-14">
                    <i className="fa fa-file-image-o"></i>
                </div>
                <div className="text-center text-xs font-normal ">Create Collection</div>
            </a>

            <a onClick={()=>{
                setPage(Page.Market);
            }} className={classNamesIfPageIs(Page.Market)}>
                <div className="flex-shrink-0 inline-flex items-center justify-center w-14">
                    <i className="fa fa-exchange"></i>
                </div>
                <div className="text-center text-xs font-normal ">Sell/Buy NFT</div>
            </a>

        </div>
    </nav>
</div>
}