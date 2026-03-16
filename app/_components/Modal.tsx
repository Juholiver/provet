export default function Modal() {
    return (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
            <div className="bg-white rounded-lg p-6 w-full max-w-sm shadow-lg"> 
                <h2 className="text-xl font-bold mb-4">Modal Title</h2>
                <p className="mb-6">This is a simple modal component. You can add any content here.</p>
                <button className="w-full rounded-lg bg-blue-600 py-3 text-white font-bold hover:bg-blue-700 transition-colors">
                    Close
                </button>
            </div>
        </div>
    );
}