import { StoredWallet } from "../../models";
import { shortenStringTo } from "../../utils";
import { FC } from "react";


type Props = {

    index? : number, 
    wallet : StoredWallet,
}

export const WalletListRow : FC <Props> = ({
    wallet, index
}) =>{

    return <div className="items-left max-w-200 text-ellipsis m-4 bg-slate-50 hover:bg-slate-200 rounded-3xl p-2">
    <span className="max-w-30 mr-4">{(index ?? 0) + 1}.</span> {shortenStringTo(wallet.pubkey, 20)}
    </div>
}