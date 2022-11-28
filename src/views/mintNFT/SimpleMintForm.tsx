import { FC } from "react";

export const SimpleMintForm : FC = () =>{

    return <div className="m-auto p-10 mt-4 border-2 border-gray-200 rounded-3xl w-5/6 text-left">
        <h1 className="font-bold">Simple Mint</h1>
        You can mint an NFT by simply providing a media URI or upload an image/video etc below :
        <form className="bg-white shadow-md rounded-2xl px-8 pt-6 pb-8 mb-4 mt-4">
        <div className="mb-4">
            <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="mediaURI">
                Media URI
            </label>
            <input className="shadow appearance-none border rounded w-full 
            py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" 
            id="mediaURI" type="text" placeholder="Media URI"/>
        </div>
        <div className="mb-4">
        <button className="shadow bg-purple-500 hover:bg-purple-400 
        focus:shadow-outline focus:outline-none text-white font-bold py-2 px-4 rounded" type="button">
        Mint The NFT Now
        </button>
        </div>
        </form> 
    </div>
}