import { FC } from "react";

export interface Tab {

    id? : string,

    title? : string, 

    content? : string| React.ReactElement,
    
}

type Props ={

    tabs?: Tab[],

    id? : string,
}


export const TabbedView : FC <Props> = ({
    tabs , id 
}) =>{

    function changeAtiveTab(event : any,tabID : string){
        let element = event.target;
        while(element.nodeName !== "A"){
          element = element.parentNode;
        }
        let ulElement = element.parentNode.parentNode;
        let aElements = ulElement.querySelectorAll("li > a");
        let tabContents = document.getElementById(id ?? "tabs-id")?.querySelectorAll(".tab-content > div");

        if ( tabContents ) {

            for(let i = 0 ; i < aElements.length; i++){
                aElements[i].classList.remove("text-white");
                aElements[i].classList.remove("bg-stone-600");
                aElements[i].classList.add("text-stone-600");
                aElements[i].classList.add("bg-white");
                tabContents[i].classList.add("hidden");
                tabContents[i].classList.remove("block");
            }
        }

        element.classList.remove("text-stone-600");
        element.classList.remove("bg-white");
        element.classList.add("text-white");
        element.classList.add("bg-stone-600");
    
        document.getElementById(tabID)?.classList.remove("hidden");
        document.getElementById(tabID)?.classList.add("block");
  }

  return <div className="flex flex-wrap" id={id ?? "tabs-id"}>
  <div className="w-full">
    <ul className="flex mb-0 list-none flex-wrap pt-3 pb-4 flex-row">
        {tabs?.map((t,i)=>{

            return   <li key={`tab_${id}_${i}`} className="-mb-px mr-2 last:mr-0 flex-auto text-center">
            <a className={`text-xs font-bold uppercase px-5 py-3 shadow-lg rounded block leading-normal 
            ${i===0 ? "bg-stone-600 text-white" : "bg-white"} cursor-pointer`} onClick={(e)=>{
                changeAtiveTab(e,t.id ?? `tb_${i}`);}
            }>
            {t.title}
            </a>
          </li>
        
        })}
    </ul>
    <div className="relative flex flex-col min-w-0 break-words bg-white w-full mb-6 shadow-lg rounded">
      <div className="px-4 py-5 flex-auto">
        <div className="tab-content tab-space">
        {tabs?.map((t,i)=>{
            return <div className={i===0 ? "block" : "hidden"} id={t.id}>
            {t.content}
            </div>;
        })}
        </div>
        </div>
      </div>
    </div>
    </div>
}