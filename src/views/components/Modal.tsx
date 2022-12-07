import { FC , useState} from "react";

type Props = {

    title? : string, 

    children?: React.ReactNode,

    footer? : string, 

    triggerButton? : string| React.ReactElement,

    triggerButtonClassName? : string,

    actionButton? : {title? : string,
    action? : ()=>void },
}

export const Modal : FC <Props> = ({
    children, title, actionButton , triggerButton, triggerButtonClassName
}) =>{


    const [showModal, setShowModal] = useState(false);

    return <>
    <button className={ triggerButtonClassName ?? "bg-gray-500 text-white active:bg-gray-600 font-bold text-sm px-6 py-3 rounded shadow hover:shadow-lg outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"}
      type="button" onClick={() => setShowModal(true)}>
      {triggerButton ?? "Open"}
    </button>
    {showModal ? (
      <>
        <div className="justify-center items-center flex overflow-x-hidden overflow-y-auto fixed inset-0 z-50 outline-none focus:outline-none">
          <div className="relative w-auto my-6 mx-auto max-w-3xl">
            {/*content*/}
            <div className="border-0 rounded-lg shadow-lg relative flex flex-col w-full bg-white outline-none focus:outline-none">
              {/*header*/}
              <div className="flex items-start justify-between p-2 border-b border-solid border-slate-200 rounded-t">
                <h3 className="text-lg font-semibold uppercase">
                {title ?? "Modal Title"}
                </h3>
                <button
                  className="p-1 ml-auto bg-transparent border-0 text-black opacity-5 float-right text-3xl leading-none font-semibold outline-none focus:outline-none"
                  onClick={() => setShowModal(false)}>
                  <span className="bg-transparent text-black opacity-5 h-6 w-6 text-2xl block outline-none focus:outline-none">
                    ×
                  </span>
                </button>
              </div>
              {/*body*/}
              <div className="relative p-6 flex-auto">
                {children}
              </div>
              {/*footer*/}
              <div className="flex items-center justify-end p-1 border-t border-solid border-slate-200 rounded-b">
                <button
                  className="text-red-500 background-transparent font-bold uppercase px-6 py-2 text-sm outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
                  type="button"
                  onClick={() => setShowModal(false)}>
                  Close
                </button>
                {actionButton &&
                <button className="bg-emerald-500 text-white active:bg-emerald-600 font-bold uppercase text-sm px-6 py-3 rounded shadow hover:shadow-lg outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
                  type="button"
                  onClick={(e) => {
                    e.preventDefault();
                    if ( actionButton.action ){
                        actionButton.action();
                    }
                    setShowModal(false);
                  }}>
                </button>}
              </div>
            </div>
          </div>
        </div>
        <div className="opacity-25 fixed inset-0 z-40 bg-black"></div>
      </>
    ) : null }
  </>
    
}


export const TestModalView : FC = () =>{

    return <div className="m-4">
        <Modal title="My Modal">
        <div style={{minWidth:"700px"}}>

        <p>Hello world what's up??</p>
        <p>Hello world what's up??</p>
        <p>Hello world what's up??</p>
        <p>Hello world what's up??</p>

        </div>
      
        </Modal>
    </div>
} 