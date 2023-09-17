export default function ThirdButton({ type = 'submit', className = '', processing, children, onClick, color ='blue' }) {
    const colorVariants = {
        blue: 'bg-blue-50 text-blue-500 hover:bg-blue-100 focus:bg-blue-100 active:bg-blue-100 focus:ring-blue-100',
        red: 'bg-red-50 text-red-500 hover:bg-red-100 focus:bg-red-100 active:bg-red-100 focus:ring-red-100',
        yellow: 'bg-yellow-50 text-yellow-500 hover:bg-yellow-100 focus:bg-yellow-100 active:bg-yellow-100 focus:ring-yellow-100',
        amber: 'bg-amber-50 text-amber-500 hover:bg-amber-100 focus:bg-amber-100 active:bg-amber-100 focus:ring-amber-100',
        teal: 'bg-teal-50 text-teal-500 hover:bg-teal-100 focus:bg-teal-100 active:bg-teal-100 focus:ring-teal-100',
        emerald: 'bg-emerald-50 text-emerald-500 hover:bg-emerald-100 focus:bg-emerald-100 active:bg-emerald-100 focus:ring-emerald-100',
        cyan: 'bg-cyan-50 text-cyan-500 hover:bg-cyan-100 focus:bg-cyan-100 active:bg-cyan-100 focus:ring-cyan-100',
        sky: 'bg-sky-50 text-sky-500 hover:bg-sky-100 focus:bg-sky-100 active:bg-sky-100 focus:ring-sky-100',
        gray: 'bg-gray-50 text-gray-500 hover:bg-gray-100 focus:bg-gray-100 active:bg-gray-100 focus:ring-gray-100',
        green: 'bg-green-50 text-green-500 hover:bg-green-100 focus:bg-green-100 active:bg-green-100 focus:ring-green-100',
      }
    return (
        <button
            type={type}
            onClick={onClick}
            className={ 
                `${colorVariants[color]} inline-flex items-center px-4 py-2 border border-transparent rounded font-semibold text-xs uppercase tracking-wide focus:outline-none focus:ring-2 focus:ring-offset-2 transition ease-in-out duration-150 ${
                    processing && 'opacity-25'
                } ` + className
            }
            disabled={processing}
        >
            {children}
        </button>
    );
}
