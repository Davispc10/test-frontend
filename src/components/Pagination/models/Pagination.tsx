

type PageType = {
  number: number,
  isCurrent: boolean
}

export class Pagination {
    #currentPageNumber: number
    #numberOfPages: number
    #fistPage: number
    #buttonsLeft: number
    #maxFirst: number

    constructor (
      readonly limit: number,
      readonly offset: number,
      readonly buttonsPerPage: number,
      readonly totalItems: number,
    ) {
      this.#buttonsLeft = this.calculateButtonsLeft()
      this.#currentPageNumber = this.calculeCurrentPageNumber()
      this.#numberOfPages = this.calculateNumberOfPages()
      this.#maxFirst = this.calculateMaxFirst()
      this.#fistPage = this.calculateFirstPage()
    }

    private calculeCurrentPageNumber() {
      return this.offset ? this.offset / this.limit + 1 : 1;
    }

    private calculateNumberOfPages() {
      return Math.ceil(this.totalItems / this.limit);
    }

    private calculateButtonsLeft( ){
      return (this.buttonsPerPage - 1) / 2;
    }

    private calculateFirstPage() {
      return Math.min(Math.max(this.#currentPageNumber - this.#buttonsLeft, 1), this.#maxFirst);
    }
    private calculateMaxFirst() {
      return Math.max(this.#numberOfPages - (this.buttonsPerPage - 1), 1);
    }

    
    public getPages(): PageType[] {
      const length = Math.min(this.buttonsPerPage, this.numberOfPages)
     
      return Array.from({ length }).map((_, index) => {
        const number = index + this.#fistPage
        const page: PageType = {
          number,
          isCurrent: number === this.#currentPageNumber 
        }
        return page
      })
    }

    public getOffsetByPageNumber (number: number) {
      return (number - 1) * this.limit
    }

    public incrementPage () {
      return this.currentPageNumber + 1
    }
    public decrementPage () {
      return this.currentPageNumber - 1
    }

    get currentPageNumber () {
      return this.#currentPageNumber
    }
    get numberOfPages () {
      return this.#numberOfPages
    }

    get firstPage () {
      return this.#fistPage
    }


}


