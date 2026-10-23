export interface FiltroBusqueda{
    busqueda?: string | null;
}

export const filtroVacio = (): FiltroBusqueda => ({
    busqueda: ""
})