import React from 'react';

type PaginacionProps = {
  page: number;
  totalPages: number;
  onPageChange: (newPage: number) => void;
};

export default function Paginacion({ page, totalPages, onPageChange }: PaginacionProps) {
  return (
    <nav>
      <ul className="pagination justify-content-center">
        <li className={`page-item ${page === 1 ? 'disabled' : ''}`}>
          <button className="page-link" onClick={() => onPageChange(page - 1)}>Anterior</button>
        </li>

        {[...Array(totalPages)].map((_, i) => {
          const pageNum = i + 1;
          return (
            <li key={pageNum} className={`page-item ${page === pageNum ? 'active' : ''}`}>
              <button className="page-link" onClick={() => onPageChange(pageNum)}>{pageNum}</button>
            </li>
          );
        })}

        <li className={`page-item ${page === totalPages ? 'disabled' : ''}`}>
          <button className="page-link" onClick={() => onPageChange(page + 1)}>Siguiente</button>
        </li>
      </ul>
    </nav>
  );
}

