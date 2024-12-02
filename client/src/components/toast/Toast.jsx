import {useState} from 'react'

function Toast({ type, children }) {
    const [isVisible, setIsVisible] = useState(true);
    
  const handleClose = () => {
    setIsVisible(false);
    window.location.reload();
  };

  
    console.log(isVisible);
  if (!isVisible) return null;

  return (
    <div id="toast" className={`fixed flex items-center w-full max-w-xs p-4 space-x-3 text-black ${type === 'success' ? 'bg-green-500' : type === 'error' ? 'bg-red-500' : 'bg-white' } rounded-lg shadow right-5 bottom-5`} role="alert">
    {children}
    <button type="button" onClick={handleClose} className="absolute right-2 top-2 bg-white text-gray-400 hover:text-gray-900 rounded-lg focus:ring-2 focus:ring-gray-300 p-1.5 hover:bg-gray-100 inline-flex items-center justify-center h-6 w-6" data-dismiss-target="#toast" aria-label="Close">
        <span className="sr-only">Close</span>
        <svg className="w-3 h-3" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 14 14">
            <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="m1 1 6 6m0 0 6 6M7 7l6-6M7 7l-6 6"/>
        </svg>
    </button>
</div>
  )
}

export default Toast
