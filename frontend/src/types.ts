// src/types.ts
export type Filtros = {
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

export type Libro = {
  id: number;
  titulo: string;
  precio: number;
  disponible: boolean;
  autor_id: number;
  editorial_id: number;
  genero_id: number;
  editorial?: { id: number; nombre: string };
  genero?: { id: number; nombre: string };
  imagen?: string;
};
