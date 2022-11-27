import { FC } from "react";

type Props = {

    checked? : boolean,
}

export const CheckIcon : FC <Props> = ({
    checked
}) =>{

    return <svg className={"h-6 w-6 " + (checked ? "text-green-500" : "text-gray-300")}  
    width="24" height="24" viewBox="0 0 24 24" 
    strokeWidth="2" stroke="currentColor" fill="none" 
    strokeLinecap="round" strokeLinejoin="round">
    <path stroke="none" d="M0 0h24v24H0z"/>  
    <circle cx="12" cy="12" r="9" />  
    <path d="M9 12l2 2l4 -4" /></svg>
}