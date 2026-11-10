import React, { useState } from 'react';
import { Loader2 } from 'lucide-react';
import { crearCita } from '../services/citasApi';

type FormData = {
    mascota: string;
    cliente: string;
    servicio: string;
    fecha: string;
    hora: string;
    notas: string;
};

const ESTADO_INICIAL: FormData = {
    mascota: '',
    cliente: '',
    servicio: '',
    fecha: '',
    hora: '',
    notas: '',
};

type RegistroCitaFormProps = {
    onCancel?: () => void;
    onSuccess?: () => void;
};

export function RegistroCitaForm({ onCancel, onSuccess }: RegistroCitaFormProps) {
    const [formData, setFormData] = useState<FormData>(ESTADO_INICIAL);
    const [cargando, setCargando] = useState(false);
    const [enviado, setEnviado] = useState(false);
    const [error, setError] = useState('');

    const handleChange = (
        e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>
    ) => {
        const { name, value } = e.target;
        setFormData((prev) => ({ ...prev, [name]: value }));
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setCargando(true);
        setError('');
        setEnviado(false);

        try {
            await crearCita(formData);
            setEnviado(true);
            setFormData(ESTADO_INICIAL);

            if (onSuccess) {
                onSuccess();
            } else {
                setTimeout(() => setEnviado(false), 3000);
            }
        } catch (err) {
            setError(err instanceof Error ? err.message : 'Ocurrió un error al guardar.');
        } finally {
            setCargando(false);
        }
    };

    return (
        <div className="p-6">
            <div className="mb-4">
                <h2 className="text-xl font-bold text-slate-900">Nueva Cita</h2>
                <p className="text-xs text-slate-500">Ingresa los datos correspondientes.</p>
            </div>

            {enviado && (
                <div className="mb-4 rounded-lg bg-teal-50 p-3 text-xs font-semibold text-teal-800 border border-teal-200">
                    ¡Cita registrada exitosamente!
                </div>
            )}

            {error && (
                <div className="mb-4 rounded-lg bg-red-50 p-3 text-xs font-semibold text-red-800 border border-red-200">
                    {error}
                </div>
            )}

            <form onSubmit={handleSubmit} className="space-y-4">
                <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                    <div>
                        <label htmlFor="mascota" className="block text-xs font-medium text-slate-700 mb-1">
                            Mascota
                        </label>
                        <input
                            type="text"
                            id="mascota"
                            name="mascota"
                            required
                            value={formData.mascota}
                            onChange={handleChange}
                            disabled={cargando}
                            placeholder="Ej. Firulais"
                            className="w-full rounded-lg border border-slate-300 px-3 py-2 text-sm focus:border-teal-700 focus:outline-none"
                        />
                    </div>

                    <div>
                        <label htmlFor="cliente" className="block text-xs font-medium text-slate-700 mb-1">
                            Propietario
                        </label>
                        <input
                            type="text"
                            id="cliente"
                            name="cliente"
                            required
                            value={formData.cliente}
                            onChange={handleChange}
                            disabled={cargando}
                            placeholder="Ej. Juan Pérez"
                            className="w-full rounded-lg border border-slate-300 px-3 py-2 text-sm focus:border-teal-700 focus:outline-none"
                        />
                    </div>
                </div>

                <div>
                    <label htmlFor="servicio" className="block text-xs font-medium text-slate-700 mb-1">
                        Servicio
                    </label>
                    <select
                        id="servicio"
                        name="servicio"
                        required
                        value={formData.servicio}
                        onChange={handleChange}
                        disabled={cargando}
                        className="w-full rounded-lg border border-slate-300 px-3 py-2 text-sm bg-white focus:border-teal-700 focus:outline-none"
                    >
                        <option value="">Selecciona servicio...</option>
                        <option value="Consulta General">Consulta General</option>
                        <option value="Vacunación">Vacunación</option>
                        <option value="Desparasitación">Desparasitación</option>
                        <option value="Estética Canina/Felina">Estética Canina/Felina</option>
                        <option value="Cirugía">Cirugía (Programada)</option>
                    </select>
                </div>

                <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                    <div>
                        <label htmlFor="fecha" className="block text-xs font-medium text-slate-700 mb-1">
                            Fecha
                        </label>
                        <input
                            type="date"
                            id="fecha"
                            name="fecha"
                            required
                            value={formData.fecha}
                            onChange={handleChange}
                            disabled={cargando}
                            className="w-full rounded-lg border border-slate-300 px-3 py-2 text-sm focus:border-teal-700 focus:outline-none"
                        />
                    </div>

                    <div>
                        <label htmlFor="hora" className="block text-xs font-medium text-slate-700 mb-1">
                            Hora
                        </label>
                        <input
                            type="time"
                            id="hora"
                            name="hora"
                            required
                            value={formData.hora}
                            onChange={handleChange}
                            disabled={cargando}
                            className="w-full rounded-lg border border-slate-300 px-3 py-2 text-sm focus:border-teal-700 focus:outline-none"
                        />
                    </div>
                </div>

                <div>
                    <label htmlFor="notas" className="block text-xs font-medium text-slate-700 mb-1">
                        Notas (Opcional)
                    </label>
                    <textarea
                        id="notas"
                        name="notas"
                        rows={2}
                        value={formData.notas}
                        onChange={handleChange}
                        disabled={cargando}
                        placeholder="Observaciones adicionales..."
                        className="w-full rounded-lg border border-slate-300 px-3 py-2 text-sm focus:border-teal-700 focus:outline-none resize-none"
                    />
                </div>

                <div className="flex justify-end gap-2 pt-4 border-t border-slate-100">
                    {onCancel && (
                        <button
                            type="button"
                            onClick={onCancel}
                            disabled={cargando}
                            className="rounded-lg px-4 py-2 text-sm font-medium text-slate-600 hover:bg-slate-100"
                        >
                            Cancelar
                        </button>
                    )}
                    <button
                        type="submit"
                        disabled={cargando}
                        className="inline-flex items-center gap-2 rounded-lg bg-teal-700 px-4 py-2 text-sm font-semibold text-white hover:bg-teal-800 disabled:opacity-50"
                    >
                        {cargando && <Loader2 className="h-4 w-4 animate-spin" />}
                        {cargando ? 'Guardando...' : 'Guardar Cita'}
                    </button>
                </div>
            </form>
        </div>
    );
}