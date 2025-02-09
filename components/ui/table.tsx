export function Table({ children }: { children: React.ReactNode }) {
    return <table className="w-full border-collapse">{children}</table>;
  }
  
  export function TableHeader({ children }: { children: React.ReactNode }) {
    return <thead className="bg-gray-100">{children}</thead>;
  }
  
  export function TableRow({ children }: { children: React.ReactNode }) {
    return <tr className="border-b hover:cursor-pointer">{children}</tr>;
  }
  
  export function TableHead({ children }: { children: React.ReactNode }) {
    return <th className="p-2 text-center">{children}</th>;
  }
  
  export function TableBody({ children }: { children: React.ReactNode }) {
    return <tbody className="p-2 text-center">{children}</tbody>;
  }
  
  export function TableCell({ children }: { children: React.ReactNode }) {
    return <td className="p-2" >{children}</td>;
  }
  