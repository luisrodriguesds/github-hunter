import React from 'react';
import { FiChevronLeft, FiChevronRight } from 'react-icons/fi';

import { Container } from './styles';

import IPaginate from '../../interfaces/IPaginate';

const Paginate: React.FC<IPaginate> = ({
  totalRow,
  currentPage,
  perPage,
  totalPage,
  handleLoadNewPage,
}) => {
  if (totalRow <= perPage) {
    return <div />;
  }

  let pages = [];
  let count = 0;
  for (let i = currentPage - 1; i <= currentPage + 1; i++) {
    if (currentPage <= 2) {
      count + 1 <= totalPage && pages.push(count + 1);
    } else if (currentPage === totalPage) {
      pages.push(currentPage - (count === 0 ? 2 : count === 1 ? 1 : 0));
    } else {
      pages.push(currentPage + (count === 0 ? -1 : count === 1 ? 0 : 1));
    }
    count++;
  }

  async function load(page: number): Promise<void> {
    await handleLoadNewPage(page);
  }

  return (
    <Container>
      <ul>
        <li
          onClick={() => load(currentPage - 1)}
          className={`${currentPage === 1 ? `disabled` : ``}`}
        >
          <FiChevronLeft size={20} />
        </li>
        {pages.map(page => (
          <li
            key={page + 1}
            onClick={() => load(page)}
            data-testid={`page-${page}`}
            className={`${page === currentPage ? `active` : ``}`}
          >
            {page}
          </li>
        ))}
        <li
          onClick={() => load(currentPage)}
          className={`${currentPage === totalPage ? `disabled` : ``}`}
        >
          <FiChevronRight size={20} />
        </li>
      </ul>
    </Container>
  );
};

export default Paginate;
