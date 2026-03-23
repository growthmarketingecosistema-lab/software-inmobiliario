/**
 * API: /api/identidad
 * Acción: Actualiza la Identidad de Marca (ADN) y los Buyer Personas.
 * Persiste los datos en la colección de Company en MongoDB.
 */

import { NextResponse } from 'next/server';
import connectDB from '@/lib/mongodb';
import { Company } from '@/models';

export async function PUT(req: Request) {
    try {
        const { empresaId, base } = await req.json();
        await connectDB();

        // Guardamos la identidad como campos extra en la empresa
        const updated = await Company.findOneAndUpdate(
            { empresaId },
            {
                $set: {
                    'identidad.esencia': base?.esencia || '',
                    'identidad.nicho': base?.nicho || '',
                    'identidad.propuesta': base?.propuesta || '',
                    'identidad.tono': base?.tono || '',
                }
            },
            { new: true, upsert: false }
        );

        if (!updated) {
            return NextResponse.json({ error: 'Empresa no encontrada' }, { status: 404 });
        }

        return NextResponse.json({ success: true, empresaId, identidad: updated });
    } catch (error) {
        console.error("Error en API PUT /api/identidad:", error);
        return NextResponse.json({ error: 'Error al actualizar identidad' }, { status: 500 });
    }
}
