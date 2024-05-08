'use client'

interface MenuItemProps{
    onClick: () => void;
    label: string
}

const MenuItem = ({onClick, label}:MenuItemProps) => {
    return (
        <div className="inset-0 overflow-hidden">
        <div onClick={onClick} className=" relative z-10 
        text-gray px-4 py-3 hover:bg-neutral-100 transition font-semibold">
            {label}
        </div>
        </div>
      );
}
 
export default MenuItem;