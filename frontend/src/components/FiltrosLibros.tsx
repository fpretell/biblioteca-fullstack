// src/components/FiltrosLibros.tsx
import React from 'react';
import { Filtros } from '../types';

type Props = {
  filtros: Filtros;
  onFiltroChange: (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => void;
};

export default function FiltrosLibros({ filtros, onFiltroChange }: Props) {
  return (
    <div className="row mb-2">
      <div className="col-md-2">
        <input
          type="text"
          name="search"
          value={filtros.search}
          placeholder="Buscar título..."
          onChange={onFiltroChange}
          className="form-control"
        />
      </div>
      <div className="col-md-2">
        <select name="genero_id" value={filtros.genero_id} onChange={onFiltroChange} className="form-select">
          <option value="">-- Género --</option>
          <option value="1">Ficción</option>
          <option value="2">No ficción</option>
        </select>
      </div>
      <div className="col-md-2">
        <select name="editorial_id" value={filtros.editorial_id} onChange={onFiltroChange} className="form-select">
          <option value="">-- Editorial --</option>
          <option value="1">Editorial A</option>
          <option value="2">Editorial B</option>
        </select>
      </div>
      <div className="col-md-2">
        <select name="autor_id" value={filtros.autor_id} onChange={onFiltroChange} className="form-select">
          <option value="">-- Autor --</option>
          <option value="1">Autor 1</option>
          <option value="2">Autor 2</option>
        </select>
      </div>
      <div className="col-md-2">
        <select name="disponible" value={filtros.disponible} onChange={onFiltroChange} className="form-select">
          <option value="">-- Disponible --</option>
          <option value="true">Sí</option>
          <option value="false">No</option>
        </select>
      </div>
    </div>
  );
}
