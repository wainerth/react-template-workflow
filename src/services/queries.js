import { gql } from "@apollo/client";

export const GET_ALL_MODULES = gql` 
query ObtenerModulos($userId: ID!, $categoriaId: ID) {
  obtenerModulos(userId: $userId, categoriaId: $categoriaId) {
    success
    message
    data {
      id
      nombre
      descripcion
      clases
      duracion
      tipo
      tipo_nombre
      estado
      fecha_creacion
      fecha_modificacion
      fecha_desactivacion
      categorias
      total_videos
      vistos
      progreso
      icono
      orden
    }
  }
}
`


export const GET_LESSONS_BY_MODULE = gql`
query ObtenerVideo($moduloId: ID!, $userId: ID!) {
  obtenerVideo(moduloId: $moduloId, userId: $userId) {
    success
    message
    data {
      id
      modulo_id
      orden
      nombre
      descripcion
      link_video
      estado
      duracion
      visto
      fecha_creacion
      fecha_modificacion
      fecha_desactivacion
    }
  }
}`

export const GET_CATEGORIES = gql`
query ObtenerCategorias {
  obtenerCategorias {
    success
    message
    data {
      id
      nombre
      estado
      fecha_creacion
      fecha_modificacion
      fecha_desactivacion
    }
  }
}
`