import { FC } from "react";
import { SideBar } from "./SideBar";

export const View : FC = () =>{


    return <div className="flex flex-row min-h-screen bg-gray-100 text-gray-800">
        <aside className="sidebar w-30 md:shadow transform -translate-x-full md:translate-x-0 
        transition-transform duration-150 ease-in bg-gray-800">
            <SideBar/>
        </aside>
        <main className="main flex flex-col flex-grow -ml-64 md:ml-0 
        transition-all duration-150 ease-in">
            This is the main page
        </main>
      </div>
}