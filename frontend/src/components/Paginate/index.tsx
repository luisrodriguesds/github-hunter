import React, { HTMLProps } from 'react';
import { FiChevronLeft, FiChevronRight } from 'react-icons/fi';

import { Container } from './styles';

interface Props extends HTMLProps<HTMLElement> {
  totalRow: number;
  currentPage: number;
  totalPage: number;
  perPage: number;
  handleLoadNewPage(newPage: number): Promise<void>;
}


const Paginate: React.FC<Props> = ({ totalRow, currentPage, perPage, totalPage, handleLoadNewPage }) => {

  if(totalRow <= perPage){
    return <div />;
  }

  const limitShowPages = 3
  let pages = []
  if (totalPage <= limitShowPages) {
    pages = Array(limitShowPages).fill(null).map((_,i) => i)
  }else if(currentPage <= totalPage && currentPage > (totalPage-limitShowPages)){
    pages = Array(limitShowPages).fill(null).map((_,i) => totalPage-i-1)
    pages.reverse()
  }else{
    for (let i = (currentPage-1); i < ((totalPage-limitShowPages)+(currentPage-1)); i++) {
      pages.push(i)
    }
  }

  async function load(page: number): Promise<void>{
    await handleLoadNewPage(page)
  }

  return (
    <Container>
      <ul>
        <li onClick={() => load(currentPage-1)} className={`${currentPage === 1 ? `disabled` : ``}`}>
          <FiChevronLeft size={20} />
        </li>
        {pages.map(page => (
          <li key={page} onClick={() => load(page+1)} className={`${(page+1) === currentPage ? `active` : ``}`}>{page+1}</li>
        ))}
        <li onClick={() => load(currentPage+1)} className={`${currentPage === totalPage ? `disabled` : ``}`}>
          <FiChevronRight size={20} />
        </li>
      </ul>
    </Container>
  );
}

export default Paginate;