import { StoredWallet } from "../../models";
import { shortenStringTo } from "../../utils";
import { DeleteIcon } from "../icons/DeleteIcon";
import { FC } from "react";


type Props = {

    index? : number, 
    wallet : StoredWallet,
}

export const WalletListRow : FC <Props> = ({
    wallet, index
}) =>{

    return <div className="items-left max-w-200 text-ellipsis m-4 bg-slate-50 hover:bg-slate-200 rounded-3xl p-2">
    <span className="max-w-40 mr-4">{(index ?? 0) + 1}.</span> {shortenStringTo(wallet.pubkey, 20)}
    <button className="max-w-20 ml-4"><DeleteIcon/></button>
    </div>
}