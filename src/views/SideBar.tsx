import { FC } from "react";


export const SideBar : FC = () =>{

    return <div className=" min-h-0 flex-1 flex overflow-hidden">
    <nav aria-label="Sidebar" className="hidden lg:block flex-shrink-0 bg-gray-800 overflow-y-auto">
        <div className="relative w-30 flex space-y-16 flex-col p-3">

            <a href="#" className="text-gray-400 hover:text-orange-300">
                <div className="flex-shrink-0 inline-flex items-center justify-center w-14">
                    <i className="fa fa-money"></i>
                </div>
                <div className="text-center text-xs font-normal ">Wallet</div>
            </a>

            <a href="#" className="text-gray-400 hover:text-orange-300">
                <div className="flex-shrink-0 inline-flex items-center justify-center w-14">
                    <i className="fa fa-picture-o"></i>
                </div>
                <div className="text-center text-xs font-normal ">Mint NFT</div>
            </a>


            <a href="#" className="text-gray-400 hover:text-orange-300">
                <div className="flex-shrink-0 inline-flex items-center justify-center w-14">
                    <i className="fa fa-gift"></i>
                </div>
                <div className="text-center text-xs font-normal ">Your Collectibles</div>
            </a>

            <a href="#" className="text-gray-400 hover:text-orange-300">
                <div className="flex-shrink-0 inline-flex items-center justify-center w-14">
                    <i className="fa fa-file-image-o"></i>
                </div>
                <div className="text-center text-xs font-normal ">Create Collection</div>
            </a>

        </div>
    </nav>
</div>
}