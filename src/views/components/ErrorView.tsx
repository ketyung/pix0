import { FC } from "react";

type Props ={
    title? : string,
    
    text? : string,
}

export const ErrorView : FC <Props> = ({
    title, text, 
}) =>{

    return <div role="alert">
    <div className="bg-red-500 text-white font-bold rounded-t px-4 py-2">
      {title ?? "Error"}
    </div>
    <div className="border border-t-0 border-red-400 rounded-b bg-red-100 px-4 py-3 text-red-700">
      <p>{text ?? "Some errors..."}</p>
    </div>
  </div>
}