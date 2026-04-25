interface ButtonProps {
  children: React.ReactNode;
  onClick?: () => void;
  variant?: 'primary' | 'secondary' | 'accent';
}

export default function Button({ 
  children, 
  onClick, 
  variant = 'primary'
}: ButtonProps) {
  
  const baseStyles = "px-6 py-3 rounded-lg font-semibold transition-all duration-300 hover:scale-105 hover:shadow-lg";
  
  const variantStyles = {
    primary: "bg-indigo-900 text-amber-50 hover:bg-indigo-800 shadow-md shadow-indigo-900/50",
    secondary: "bg-amber-800 text-amber-50 hover:bg-amber-700 shadow-md shadow-amber-900/50",
    accent: "bg-cyan-500 text-slate-900 hover:bg-cyan-400 shadow-md shadow-cyan-500/50 font-bold"
  };

  return (
    <button 
      className={`${baseStyles} ${variantStyles[variant]}`}
      onClick={onClick}
    >
      {children}
    </button>
  );
}