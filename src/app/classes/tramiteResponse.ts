import { Beneficiario } from "./beneciario";
import { Documento } from "./documento";

export class TramiteResponse{
    id:number;
    idBeneficiario:Beneficiario;
    idDocumento:Documento;
    folio:string;
    fechaGeneracion:Date;
    fechaModifico:Date;
    fechaElimino:Date;
    honorarios:number;
}