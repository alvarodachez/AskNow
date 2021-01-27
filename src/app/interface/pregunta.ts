import { Respuesta } from "./respuesta";

export interface Pregunta {

    id?:string;
    titulo?:string;
    descripcion?:string;
    idUser?:string;
    respuestas?:Respuesta[];
    displayName?:string;
}
