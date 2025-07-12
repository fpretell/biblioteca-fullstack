// LibroRow.tsx
import React from 'react';
import type { Libro } from '../types';

type LibroRowProps = {
  libro: Libro;
};

export default function LibroRow({ libro }: LibroRowProps) {
  return (
    <tr>
      <td>{libro.id}</td>
      <td>{libro.titulo}</td>
      <td>
        {libro.imagen ? (
          <img
            src={`http://localhost:3000/uploads/${libro.imagen}`}
            alt={libro.titulo}
            style={{
              width: '50px',
              height: '75px',
              objectFit: 'cover',
              borderRadius: '4px',
              boxShadow: '0 0 3px rgba(0,0,0,0.2)'
            }}
          />
        ) : (
          <span className="text-muted">Sin imagen</span>
        )}
      </td>
      <td>{libro.precio}</td>
      <td>{libro.editorial?.nombre || '—'}</td>
      <td>{libro.genero?.nombre || '—'}</td>
      <td>{libro.disponible ? 'Sí' : 'No'}</td>
    </tr>
  );
}
