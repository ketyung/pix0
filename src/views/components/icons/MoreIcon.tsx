import { FC } from "react";

type Props ={

    textColorClassName? : string, 
}

export const MoreIcon : FC <Props> = ({
    textColorClassName
}) =>{

    return <svg className={`h-6 w-6 ${textColorClassName ?? "text-gray-800"}`}  
    viewBox="0 0 24 24"  fill="none"  stroke="currentColor"  
    strokeWidth="2"  strokeLinecap="round"  strokeLinejoin="round"> 
    <circle cx="12" cy="12" r="1" />  <circle cx="19" cy="12" r="1" />  
    <circle cx="5" cy="12" r="1" /></svg>
}