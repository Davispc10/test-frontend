
interface PageNumberProps {
    number: number
    isCurrentPage: boolean
    handleClick: (pageNumber: number) => void
}

export default function PageNumber({ number, isCurrentPage, handleClick }: PageNumberProps) {
    return (
        <div onClick={() => handleClick(number)} className={`flex group justify-center items-center w-10 h-10 cursor-pointer rounded-lg ${isCurrentPage ? "bg-red-600" : "hover:bg-neutral-800"}`}>
            <p className={`text-lg font-bold group-hover:text-slate-200 ${isCurrentPage ? "text-neutral-100" : "text-neutral-500"} `}>{number}</p>
        </div>
    );
}