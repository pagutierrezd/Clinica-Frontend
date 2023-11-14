import { ActualizarHorarioDTO } from "./ActualizarHorarioDTO"

export class ActualizarMedicoDTO {
    cedula: string = ""

    nombre: string = ""

    foto: string = ""

    ciudad: string = ""

    telefono: string = ""

    email: string = ""

    especialidad: string = ""

    precioConsulta: number = 0

    horarioDTO:ActualizarHorarioDTO[] = []

    estado: boolean = true
}