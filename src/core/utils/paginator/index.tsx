"use client"

import { useState, ChangeEvent, useContext, FormEvent } from 'react';

import { NumericFormat } from 'react-number-format'
import { BarLoader } from 'react-spinners'

import { AiOutlinePlus } from 'react-icons/ai'

import Navigator from '@/utils/navigator';

import { PaginatorStyle, Label, LoaderStyle, ProblemStyle } from "./styles"


import { CharactersContext } from "@/contexts/characters";
import { useEffect } from 'react';

function Paginator() {

  const { getData, page, setPage, charactersLoading, fail, finishResults } = useContext(CharactersContext);

  const [changePage, setChangePage] = useState<number>(page + 1)

  const handlePageChange = (e: ChangeEvent<HTMLInputElement>) => {
    setChangePage(Number(e.target.value));
  };

  useEffect(() => {
    getData();
  }, [page])

  const handleActionSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setChangePage(changePage + 1)
    setPage(changePage)
  };

  const handleActionClick = (changePage: number) => {
    setPage(changePage)
  };


  if (charactersLoading) {
    return (
      <LoaderStyle>
        < BarLoader color='#f00c18' width={200} height={10} />
      </LoaderStyle >
    )
  } else {
    if (finishResults == false && fail == false) {
      return (
        <form onSubmit={handleActionSubmit}>

          <PaginatorStyle>
            <Label >
              <label htmlFor="pager" aria-label="Type a page">
                <NumericFormat
                  name="pager"
                  type="text"
                  value={Number(changePage)}
                  onChange={handlePageChange}
                />
              </label>
            </Label>
            <div >
              <div >
                <Navigator
                  title={`Add page ${changePage}`}
                  style="general-icon-text"
                  type='submit'
                  action={() => handleActionClick(changePage)}
                >
                  <AiOutlinePlus />
                  <span>More</span>
                </Navigator>
              </div>
            </div>
          </PaginatorStyle>
        </form>
      )
    } else {
      if (fail) {
        return (<ProblemStyle>
          <p>Some problem occurred</p>
        </ProblemStyle >)
      }
      if (finishResults) {
        return (<ProblemStyle>
          <p>Finish of results</p>
        </ProblemStyle>)
      }
    }
  }

  return (<></>)
}

export default Paginator;
