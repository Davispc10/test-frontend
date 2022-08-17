import { useRouter } from "next/router";
import { Button, ButtonGroup, IconButton, List } from "@chakra-ui/react"
import {Pagination as PaginationHelper} from './models/Pagination'
import { LIMIT } from "../../modules/character/repository/CharacterRepository";
import { ArrowLeft, ArrowRight } from "./Icons";


type PaginationProps = {
    total: number,
    offset: number,
    buttonsPerPage: number,
  }

 
export const Pagination = ({total, offset, buttonsPerPage}: PaginationProps) => {
    const helper = new PaginationHelper(LIMIT, offset, buttonsPerPage, total)
    const router = useRouter();
    
    function onPageChange(number: number) {
        router.push(`/?offset=${helper.getOffsetByPageNumber(number)}`, undefined, { shallow: true })
    }
    
      return (
        <List 
          display='flex' 
          justifyContent='space-around'
          padding='0' 
          height='36px' 
          marginBottom='36px' 
          width='330px'
        >
          <li>
            <IconButton 
              aria-label="icon-left"
              icon={<ArrowLeft aria-label="icon-left"/>}
              fontSize='12px'
              onClick={() => onPageChange(helper.decrementPage())}
              disabled={helper.currentPageNumber === 1}
              borderRadius='100%'
              background='none'
             
              
            />
          </li>
          <ButtonGroup height='26px'>
            {
              helper.getPages().map((page) => {
                return  (
                  <Button
                    borderRadius='100%'
                    bgColor='gray.30'
                    color='gray.40'

                    fontSize='12px'
                    style={ page.isCurrent ? {
                      backgroundColor: "var(--chakra-colors-red-10)",
                      color: 'var(--chakra-colors-gray-10)',
                      width: '26px'
                    }: undefined}
                      key={page.number}
                      onClick={() => onPageChange(page.number)}
                  >
                  {page.number}
                  </Button>
                )
              })
            }
    
          </ButtonGroup>
          <li>
          <IconButton 
              aria-label="icon-right"
              icon={<ArrowRight aria-label="icon-right"/>}
              fontSize='12px'
              width='20px'
              onClick={() => onPageChange(helper.incrementPage())}
              disabled={helper.currentPageNumber === helper.numberOfPages}
              borderRadius='100%'
              background='none'
            />
          </li>
        </List>
      );
    }