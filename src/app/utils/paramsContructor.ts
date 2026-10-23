import { HttpParams } from "@angular/common/http";
import { FiltroBusqueda } from "../interfaces/filtroBusqueda";

export function construirParametros(filtro: FiltroBusqueda, page: number, size: number): HttpParams {
    let params = new HttpParams()
        .set('page', page)
        .set('size', size);

    Object.entries(filtro).forEach(([clave, valor]) => {
        if (valor !== null && valor !== undefined && valor !== '') {
            params = params.set(clave, String(valor));
        }
    });

    return params;
}