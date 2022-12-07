import { FC } from "react";

type Props = {

    title? : string, 

    id?: string, 

    children?: React.ReactNode,

    actionButton? : {title? : string,
    action? : ()=>void },
}

export const Modal : FC <Props> = ({
    children, title, id, actionButton 
}) =>{

    return <div className="modal fade fixed top-0 left-0 hidden w-full h-full 
    outline-none overflow-x-hidden overflow-y-auto"
      id={ id ?? "exampleModal"} tabIndex={-1} aria-labelledby="exampleModalLabel" aria-hidden="true">
      <div className="modal-dialog relative w-auto pointer-events-none">
        <div
          className="modal-content border-none shadow-lg relative flex flex-col w-full pointer-events-auto bg-white bg-clip-padding rounded-md outline-none text-current">
          <div
            className="modal-header flex flex-shrink-0 items-center justify-between p-4 border-b border-gray-200 rounded-t-md">
            <h5 className="text-xl font-medium leading-normal text-gray-800">{title ?? "A Modal"}</h5>
            <button type="button"
              className="btn-close box-content w-4 h-4 p-1 text-black border-none rounded-none opacity-50 
              focus:shadow-none focus:outline-none focus:opacity-100 hover:text-black hover:opacity-75 hover:no-underline"
              data-bs-dismiss="modal" aria-label="Close"></button>
          </div>
          <div className="modal-body relative p-4">
            {children}
          </div>
          <div
            className="modal-footer flex flex-shrink-0 flex-wrap items-center justify-end p-4 border-t border-gray-200 rounded-b-md">
            <button type="button" className="px-6
              py-2.5
              bg-purple-600
              text-white
              font-medium
              text-xs
              leading-tight
              uppercase
              rounded
              shadow-md
              hover:bg-purple-700 hover:shadow-lg
              focus:bg-purple-700 focus:shadow-lg focus:outline-none focus:ring-0
              active:bg-purple-800 active:shadow-lg
              transition
              duration-150
              ease-in-out" data-bs-dismiss="modal">Close</button>
           { actionButton  && <button type="button" 
           onClick={(e)=>{e.preventDefault();
            
                if ( actionButton.action){
                    actionButton.action();
                }
           }}
           className="px-6 py-2.5 bg-blue-600 text-white
          font-medium text-xs leading-tight
          uppercase rounded shadow-md hover:bg-blue-700 hover:shadow-lg
          focus:bg-blue-700 focus:shadow-lg focus:outline-none focus:ring-0
          active:bg-blue-800 active:shadow-lg
          transition duration-150 ease-in-out ml-1">{actionButton.title}</button>}
          </div>
        </div>
      </div>
    </div>
}


type Props2 = {

    title? : string|React.ReactElement, 

    modalId? : string, 
}

export const ModalTriggerButton : FC <Props2> = ({
    title, modalId
}) =>{

    return <button type="button" className="px-6
    py-2.5 bg-blue-600 text-white font-medium text-xs
    leading-tight uppercase rounded
    shadow-md hover:bg-blue-700 hover:shadow-lg
    focus:bg-blue-700 focus:shadow-lg focus:outline-none focus:ring-0
    active:bg-blue-800 active:shadow-lg
    transition duration-150 ease-in-out" data-bs-toggle="modal" 
    data-bs-target={`#${modalId}`}>{title}</button>
}


export const TestModalView : FC = () =>{

    return <div className="m-4">
        <ModalTriggerButton title="Click" modalId="MyTestModal"/>
        <Modal title="My Modal" id="MyTestModal">Hello world what's up??</Modal>
    </div>
} 