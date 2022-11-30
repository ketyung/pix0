import { FC } from "react";

export interface Item {

    value?: string,

    name? : string, 
}

type Props = {

    items?: Item[],

    firstItem? : Item,

    id? : string,

    onChange? : (e : any ) => void, 
}


export const Select : FC <Props> = ({
    items, firstItem, id , onChange
}) =>{

    return <select className="form-select appearance-none
    block w-72 px-3 py-1.5 text-base
    font-normal text-gray-700 bg-white bg-clip-padding bg-no-repeat
    border border-solid border-gray-300
    rounded transition ease-in-out m-0
    focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none" 
    aria-label="Default select example" onChange={onChange}>
      <option key={`selOpt_${id}_0`}  
      selected>{firstItem?.name ?? "Please select"}</option>
      {
        items?.map((e, i) =>{

            return <option key={`selOpt_${id}_${(i+1)}`} 
                value={e.value}>{e.name}</option>
        })
      }
  </select>
}