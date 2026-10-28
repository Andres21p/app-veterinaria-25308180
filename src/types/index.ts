export type EstadoCita = 'solicitada' | 'confirmada' | 'atendida';

export type Cita = {
  id: number;
  mascota: string;
  cliente: string;
  servicio: string;
  hora: string;
  estado: EstadoCita;
};
