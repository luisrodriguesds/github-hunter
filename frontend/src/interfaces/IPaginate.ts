import { HTMLProps } from 'react';

interface IPaginate extends HTMLProps<HTMLElement> {
  totalRow: number;
  currentPage: number;
  totalPage: number;
  perPage: number;
  handleLoadNewPage(newPage: number): Promise<void>;
}

export default IPaginate;
