import { FC, ReactElement} from "react";

export interface Item {

    title? : string,

    icon? : ReactElement,

    action? : () => void, 
}


type Props = {

    menuButtonId? : string, 

    items?: Item[],
}


export const DropdownList : FC <Props> = ({
    menuButtonId, items 
}) =>{

    return <ul className="dropdown-menu min-w-max absolute hidden bg-white text-base
      z-50 float-left py-2 list-none text-left rounded-lg shadow-lg mt-1 hidden m-0
      bg-clip-padding border-none" aria-labelledby={menuButtonId}>
        {items?.map((e,i)=>{

              return <li key={`${menuButtonId}_Item${i}`} className="dropdown-item text-sm
                py-2 px-4 font-normal block w-full whitespace-nowrap
                bg-transparent text-gray-700 hover:bg-gray-100" onClick={()=>{
                if (e.action){
                    e.action();
                }
            }}>{e.icon ? <span className="mr-2">{e.icon}</span> :<></>}{e.title}</li>
        })}
    </ul>
}