import React, { useEffect, useState, useCallback } from 'react';
import axios from '../config/axios';
import debounce from 'lodash.debounce';

import LibroTable from '../components/LibroTable';
import Paginacion from '../components/Paginacion';

type Autor = {
  id: number;
  nombre: string;
};

type Editorial = {
  id: number;
  nombre: string;
};

type Genero = {
  id: number;
  nombre: string;
};

export type Libro = {
  id: number;
  titulo: string;
  precio: number;
  disponible: boolean;
  autor_id: number;
  editorial_id: number;
  genero_id: number;
  editorial?: Editorial;
  genero?: Genero;
  imagen?: string;
};

type Filtros = {
  genero_id: string;
  editorial_id: string;
  autor_id: string;
  disponible: string;
  order1: string;
  order2: string;
  order3: string;
  order4: string;
  search: string;
};

export default function LibrosListPage() {
  const [libros, setLibros] = useState<Libro[]>([]);
  const [loading, setLoading] = useState(false);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [filtros, setFiltros] = useState<Filtros>({
    genero_id: '',
    editorial_id: '',
    autor_id: '',
    disponible: '',
    order1: '',
    order2: '',
    order3: '',
    order4: '',
    search: '',
  });

  const LIMIT = 10;

  const buildOrderParam = (f: Filtros) => {
    return [f.order1, f.order2, f.order3, f.order4].filter(Boolean).join(',');
  };

  const fetchLibros = useCallback(async (pageNum: number, filtrosActuales: Filtros) => {
    setLoading(true);
    try {
      const params: any = { page: pageNum, limit: LIMIT };

      if (filtrosActuales.genero_id) params.genero_id = filtrosActuales.genero_id;
      if (filtrosActuales.editorial_id) params.editorial_id = filtrosActuales.editorial_id;
      if (filtrosActuales.autor_id) params.autor_id = filtrosActuales.autor_id;
      if (filtrosActuales.disponible) params.disponible = filtrosActuales.disponible;
      if (filtrosActuales.search) params.search = filtrosActuales.search;

      const orderParam = buildOrderParam(filtrosActuales);
      if (orderParam) params.order = orderParam;

      const res = await axios.get('/libros', { params });
      setLibros(res.data.libros);
      setPage(res.data.page);
      setTotalPages(res.data.totalPages);
    } catch {
      alert('Error al cargar los libros');
    } finally {
      setLoading(false);
    }
  }, []);

  const debouncedSearch = useCallback(
    debounce((searchTerm: string, filtrosActuales: Filtros) => {
      fetchLibros(1, { ...filtrosActuales, search: searchTerm });
      setPage(1);
    }, 500),
    [fetchLibros]
  );

  const handleFiltroChange = (e: React.ChangeEvent<HTMLSelectElement | HTMLInputElement>) => {
    const { name, value } = e.target;
    const nuevosFiltros = { ...filtros, [name]: value };
    setFiltros(nuevosFiltros);

    if (name === 'search') {
      debouncedSearch(value, nuevosFiltros);
    } else {
      fetchLibros(1, nuevosFiltros);
      setPage(1);
    }
  };

  const handlePageChange = (newPage: number) => {
    if (newPage >= 1 && newPage <= totalPages) {
      fetchLibros(newPage, filtros);
      setPage(newPage);
    }
  };

  useEffect(() => {
    fetchLibros(page, filtros);
  }, []); // solo al montar

  return (
    <div className="container mt-4">
      <h1>Listado de Libros</h1>

      {/* Filtros */}
      <div className="row mb-2">
        <div className="col-md-2">
          <input
            type="text"
            name="search"
            value={filtros.search}
            placeholder="Buscar título..."
            onChange={handleFiltroChange}
            className="form-control"
          />
        </div>
        <div className="col-md-2">
          <select name="genero_id" value={filtros.genero_id} onChange={handleFiltroChange} className="form-select">
            <option value="">-- Género --</option>
            <option value="1">Ficción</option>
            <option value="2">No ficción</option>
          </select>
        </div>
        <div className="col-md-2">
          <select name="editorial_id" value={filtros.editorial_id} onChange={handleFiltroChange} className="form-select">
            <option value="">-- Editorial --</option>
            <option value="1">Editorial A</option>
            <option value="2">Editorial B</option>
          </select>
        </div>
        <div className="col-md-2">
          <select name="autor_id" value={filtros.autor_id} onChange={handleFiltroChange} className="form-select">
            <option value="">-- Autor --</option>
            <option value="1">Autor 1</option>
            <option value="2">Autor 2</option>
          </select>
        </div>
        <div className="col-md-2">
          <select name="disponible" value={filtros.disponible} onChange={handleFiltroChange} className="form-select">
            <option value="">-- Disponible --</option>
            <option value="true">Sí</option>
            <option value="false">No</option>
          </select>
        </div>
      </div>

      {/* Ordenamiento */}
      <div className="row mb-3">
        {['order1', 'order2', 'order3', 'order4'].map((orderKey, idx) => (
          <div className="col-md-3" key={orderKey}>
            <label className="form-label">Ordenar por ({idx + 1}°)</label>
            <select
              name={orderKey}
              value={(filtros as any)[orderKey]}
              onChange={handleFiltroChange}
              className="form-select"
            >
              <option value="">-- Orden {idx + 1} --</option>
              <option value="titulo:asc">Título ↑</option>
              <option value="titulo:desc">Título ↓</option>
              <option value="precio:asc">Precio ↑</option>
              <option value="precio:desc">Precio ↓</option>
              <option value="editorial:asc">Editorial ↑</option>
              <option value="editorial:desc">Editorial ↓</option>
              <option value="genero:asc">Género ↑</option>
              <option value="genero:desc">Género ↓</option>
            </select>
          </div>
        ))}
      </div>

      {/* Tabla de libros */}
      {loading ? (
        <p>Cargando libros...</p>
      ) : (
        <LibroTable libros={libros} />
      )}

      {/* Paginación */}
      <Paginacion page={page} totalPages={totalPages} onPageChange={handlePageChange} />
    </div>
  );
}
