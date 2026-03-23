/**
 * API: /api/personas
 * CRUD para Buyer Personas. Máximo 5 por empresa.
 */

import { NextResponse } from 'next/server';
import connectDB from '@/lib/mongodb';
import { BuyerPersona } from '@/models';

// GET: Listar personas por empresaId
export async function GET(req: Request) {
    try {
        const { searchParams } = new URL(req.url);
        const empresaId = searchParams.get('empresaId');
        if (!empresaId) return NextResponse.json({ error: 'empresaId requerido' }, { status: 400 });

        await connectDB();
        const personas = await BuyerPersona.find({ empresaId }).sort({ createdAt: -1 });
        return NextResponse.json(personas);
    } catch (error) {
        console.error("Error en GET /api/personas:", error);
        return NextResponse.json({ error: 'Error al obtener personas' }, { status: 500 });
    }
}

// POST: Crear nueva persona (máx 5 por empresa)
export async function POST(req: Request) {
    try {
        const data = await req.json();
        if (!data.empresaId || !data.nombre) {
            return NextResponse.json({ error: 'empresaId y nombre son requeridos' }, { status: 400 });
        }

        await connectDB();

        // Validar límite de 5
        const count = await BuyerPersona.countDocuments({ empresaId: data.empresaId });
        if (count >= 5) {
            return NextResponse.json({ error: 'Límite de 5 buyer personas alcanzado para esta empresa.' }, { status: 400 });
        }

        const persona = await BuyerPersona.create(data);
        return NextResponse.json(persona);
    } catch (error) {
        console.error("Error en POST /api/personas:", error);
        return NextResponse.json({ error: 'Error al crear persona' }, { status: 500 });
    }
}

// PUT: Actualizar persona existente
export async function PUT(req: Request) {
    try {
        const { _id, ...data } = await req.json();
        if (!_id) return NextResponse.json({ error: '_id requerido' }, { status: 400 });

        await connectDB();
        const updated = await BuyerPersona.findByIdAndUpdate(_id, data, { new: true });
        if (!updated) return NextResponse.json({ error: 'Persona no encontrada' }, { status: 404 });
        return NextResponse.json(updated);
    } catch (error) {
        console.error("Error en PUT /api/personas:", error);
        return NextResponse.json({ error: 'Error al actualizar persona' }, { status: 500 });
    }
}

// DELETE: Eliminar persona
export async function DELETE(req: Request) {
    try {
        const { searchParams } = new URL(req.url);
        const id = searchParams.get('id');
        if (!id) return NextResponse.json({ error: 'id requerido' }, { status: 400 });

        await connectDB();
        const deleted = await BuyerPersona.findByIdAndDelete(id);
        if (!deleted) return NextResponse.json({ error: 'Persona no encontrada' }, { status: 404 });
        return NextResponse.json({ success: true });
    } catch (error) {
        console.error("Error en DELETE /api/personas:", error);
        return NextResponse.json({ error: 'Error al eliminar persona' }, { status: 500 });
    }
}
