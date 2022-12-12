import { FC } from "react";
import { Dropdown, DropdownItem } from "./components/Dropdown";
import usePage from "../hooks/usePage";
import { Page } from "../models";

export const MenuDropdown : FC = () =>{

    const {setPage} = usePage();

    const dropdownItems : DropdownItem[] = [
        {label:<><i className="fa fa-money mr-2"/>Wallet</>, action :()=>{
            setPage(Page.Wallet);
        } },
        {label:<><i className="fa fa-gift mr-2"/>Collectibles</>,action:()=>{
            setPage(Page.Collectibles);
        }},
        {label:<><i className="fa fa-picture-o mr-2"/>Mint NFT</>,action:()=>{

            setPage(Page.MintNFT);
        }},
        {label:<><i className="fa fa-exchange mr-2"/>Buy NFT</>,action:()=>{

            setPage(Page.Market);
        }},
        {label:<><i className="fa fa-file-image-o mr-2"/>Creator</>,action:()=>{

            setPage(Page.CreateCollection);
        }},
       
    ];
    


    return <>
        <Dropdown button={<button className="inline-block lg:hidden bg-gray-800 p-1 
        rounded-2xl w-16 my-2 text-gray-100 text-center mr-10"><i className="fa fa-bars"
        aria-hidden="true"/></button>}
        items={dropdownItems} />
    </>
}