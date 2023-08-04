import { InitialStateProps } from "@/contexts/types"
import { Heading, HeadingSkeleton, InputBase } from "../../atoms"
import ReactPaginate from "react-paginate";

interface Props {
    state: InitialStateProps;
    onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
    placeholder?: string;
    loading?: boolean;
    setPage: (selectedPage: { selected: number }) => void;
}

export const Wrapper = ({state, onChange, placeholder, loading, setPage}: Props) => {

    return (
        <>
        <div id="header" className="w-full">
                <InputBase 
                    value={state.value}
                    onChange={onChange}
                    placeholder={placeholder}
                    className="px-7 py-4 w-full rounded-2xl"
                />
                <div className="mt-5 mb-5">
                    {loading ? (
                       <HeadingSkeleton />
                    ) : (
                        <div className="flex flex-col sm:flex-row sm:justify-between w-full">
                            <Heading as={"h1"} className="font-mono">
                                Lista de Personagens <span className="font-bold">({state.totalCharacters})</span>
                            </Heading>
                            
                            <div id="paginate" className="">
                                <ReactPaginate
                                    previousLabel="Anterior"
                                    nextLabel="Próxima"
                                    breakLabel="..."
                                    pageCount={state.totalCharacters}
                                    marginPagesDisplayed={0}
                                    pageRangeDisplayed={-1}
                                    onPageChange={setPage}
                                    containerClassName="pagination"
                                    activeClassName="active"
                                    className="flex gap-4"
                                />
                            </div>
                        </div>
                    )}
                </div>
        </div>
        </>
    )
}