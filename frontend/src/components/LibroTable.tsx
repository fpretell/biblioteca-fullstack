// src/components/LibroTable.tsx
import React from 'react';
import type { Libro } from '../types';
import LibroRow from './LibroRow';

type LibroTableProps = {
  libros: Libro[];
};

export default function LibroTable({ libros }: LibroTableProps) {
  return (
    <table className="table table-bordered">
      <thead>
        <tr>
          <th>ID</th>
          <th>Título</th>
          <th>Imagen</th>
          <th>Precio</th>
          <th>Editorial</th>
          <th>Género</th>
          <th>Disponible</th>
        </tr>
      </thead>
      <tbody>
        {libros.length === 0 ? (
          <tr>
            <td colSpan={7} className="text-center">No se encontraron libros</td>
          </tr>
        ) : (
          libros.map(libro => (
            <LibroRow key={libro.id} libro={libro} />
          ))
        )}
      </tbody>
    </table>
  );
}
