import React, { useState, useEffect } from 'react';
import { useForm, SubmitHandler } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import type { Resolver } from 'react-hook-form';
import * as yup from 'yup';
import axios from '../config/axios';
import { useNavigate } from 'react-router-dom';

type FormInputs = {
  titulo: string;
  precio: number;
  cantidad: number;
  disponible: boolean;
  autor_id: number;
  editorial_id: number;
  genero_id: number;
  imagen: FileList;
};

const schema = yup.object().shape({
  titulo: yup.string().required('El título es obligatorio'),
  precio: yup.number().positive('El precio debe ser positivo').required('El precio es obligatorio'),
  cantidad: yup
  .number()
  .typeError('La cantidad debe ser un número')
  .integer('La cantidad debe ser un número entero')
  .required('La cantidad es obligatoria'),
  disponible: yup.boolean(),
  autor_id: yup.number().required('Debe seleccionar un autor'),
  editorial_id: yup.number().required('Debe seleccionar una editorial'),
  genero_id: yup.number().required('Debe seleccionar un género'),
  imagen: yup
    .mixed()
    .test('required', 'La imagen es obligatoria', (value) => {
      const files = value as FileList | undefined;
      return files && files.length > 0;
    })
    .test('fileSize', 'La imagen es muy grande', (value) => {
      const files = value as FileList | undefined;
      if (!files || files.length === 0) return true;
      return files[0].size <= 2000000;
    })
    .test('fileType', 'Formato de imagen no válido', (value) => {
      const files = value as FileList | undefined;
      if (!files || files.length === 0) return true;
      return ['image/jpeg', 'image/png', 'image/jpg'].includes(files[0].type);
    }),
});

export default function LibrosFormPage() {
  const navigate = useNavigate();
  const [preview, setPreview] = useState<string | null>(null);
  const [autores, setAutores] = useState<{ id: number; nombre: string }[]>([]);
  const [editoriales, setEditoriales] = useState<{ id: number; nombre: string }[]>([]);
  const [generos, setGeneros] = useState<{ id: number; nombre: string }[]>([]);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormInputs>({
    resolver: yupResolver(schema) as unknown as Resolver<FormInputs>,
  });

  useEffect(() => {
    axios.get('/autores').then(res => setAutores(res.data));
    axios.get('/editoriales').then(res => setEditoriales(res.data));
    axios.get('/generos').then(res => setGeneros(res.data));
  }, []);

  const onSubmit: SubmitHandler<FormInputs> = async (data) => {
  try {
    const formData = new FormData();

    formData.append('titulo', data.titulo);
    formData.append('precio', data.precio.toString());
    formData.append('cantidad', data.cantidad.toString());
    formData.append('disponible', data.disponible ? 'true' : 'false');
    formData.append('autor_id', data.autor_id.toString());
    formData.append('editorial_id', data.editorial_id.toString());
    formData.append('genero_id', data.genero_id.toString());

    for (const [key, value] of formData.entries()) {
      console.log(key, value);
    }

    if (data.imagen && data.imagen.length > 0) {
      formData.append('imagen', data.imagen[0]);
    }

    for (const [key, value] of formData.entries()) {
      console.log(key, value);
    }

    await axios.post('/libros', formData, {
      headers: { 'Content-Type': 'multipart/form-data' },
    });

    alert('Libro creado con éxito');
    navigate('/libros');
  } catch (err: any) {
    alert(err.response?.data?.message || 'Error al crear libro');
  }
};

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      const file = e.target.files[0];
      setPreview(URL.createObjectURL(file));
    } else {
      setPreview(null);
    }
  };

  return (
    <div className="container mt-5">
      <h2 className="mb-4">Alta / Edición de Libro</h2>
      <form onSubmit={handleSubmit(onSubmit)} encType="multipart/form-data">
        <div className="mb-3">
          <label className="form-label">Título</label>
          <input className="form-control" {...register('titulo')} />
          <div className="text-danger">{errors.titulo?.message}</div>
        </div>

        <div className="mb-3">
          <label className="form-label">Precio</label>
          <input type="number" step="0.01" className="form-control" {...register('precio')} />
          <div className="text-danger">{errors.precio?.message}</div>
        </div>

        <div className="mb-3">
          <label className="form-label">Cantidad</label>
          <input
            type="number"
            className="form-control"
            {...register('cantidad')}
          />
          <div className="text-danger">{errors.cantidad?.message}</div>
        </div>


        <div className="form-check mb-3">
          <input type="checkbox" className="form-check-input" id="disponible" {...register('disponible')} />
          <label className="form-check-label" htmlFor="disponible">Disponible</label>
        </div>

        <div className="mb-3">
          <label className="form-label">Autor</label>
          <select className="form-select" {...register('autor_id')}>
            <option value="">Selecciona un autor</option>
            {autores.map(a => (
              <option key={a.id} value={a.id}>{a.nombre}</option>
            ))}
          </select>
          <div className="text-danger">{errors.autor_id?.message}</div>
        </div>

        <div className="mb-3">
          <label className="form-label">Editorial</label>
          <select className="form-select" {...register('editorial_id')}>
            <option value="">Selecciona una editorial</option>
            {editoriales.map(e => (
              <option key={e.id} value={e.id}>{e.nombre}</option>
            ))}
          </select>
          <div className="text-danger">{errors.editorial_id?.message}</div>
        </div>

        <div className="mb-3">
          <label className="form-label">Género</label>
          <select className="form-select" {...register('genero_id')}>
            <option value="">Selecciona un género</option>
            {generos.map(g => (
              <option key={g.id} value={g.id}>{g.nombre}</option>
            ))}
          </select>
          <div className="text-danger">{errors.genero_id?.message}</div>
        </div>

        <div className="mb-3">
          <label className="form-label">Imagen</label>
          <input type="file" accept="image/*" className="form-control" {...register('imagen')} onChange={handleImageChange} />
          <div className="text-danger">{errors.imagen?.message}</div>
          {preview && (
            <div className="mt-3">
              <img src={preview} alt="Preview" className="img-thumbnail" style={{ maxWidth: '200px' }} />
            </div>
          )}
        </div>

        <button type="submit" className="btn btn-primary w-100">Guardar</button>
      </form>
    </div>
  );
}
