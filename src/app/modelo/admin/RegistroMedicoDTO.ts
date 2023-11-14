import { RegistroHorarioDTO } from "./RegistroHorarioDTO"

export class RegistroMedicoDTO {
    cedula: string = ""

    nombre: string = ""

    foto: string = ""

    ciudad: string = ""

    telefono: string = ""

    email: string = ""

    especialidad: string = ""

    password:string=""

    confirmaPassword:string=""

    horarioDTO:RegistroHorarioDTO[] = []
}