'use client';
import CadastroPets from "../_components/CadastroPets";
import ListaPets from "../_components/ListaPets";
import Sidebar from "../_components/Sidebar";

export default function Pets() {
    return (
        <>
            <div className="flex min-h-screen bg-gradient-to-tr from-slate-50 via-blue-50 to-blue-100">
                <Sidebar />
                <div className="flex-1 flex flex-col min-w-0">
                    <CadastroPets />
                    <ListaPets />
                </div>
                
            </div>
            
        </>
    )
}