export class Documento {
    id:number;
    nombre:string;
    costo:number;
    descripcion:string;
    activo:boolean = true;

    constructor(){
        this.nombre = '',
        this.costo = 0,
        this.descripcion = '',
        this.activo = true
    }
}