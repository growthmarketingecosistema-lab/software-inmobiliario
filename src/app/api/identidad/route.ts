/**
 * API: /api/identidad
 * GET: Obtener identidad de marca por empresaId
 * PUT: Crear o actualizar identidad de marca (upsert)
 */

import { NextResponse } from 'next/server';
import connectDB from '@/lib/mongodb';
import { BrandIdentity } from '@/models';

export async function GET(req: Request) {
    try {
        const { searchParams } = new URL(req.url);
        const empresaId = searchParams.get('empresaId');
        if (!empresaId) return NextResponse.json({ error: 'empresaId requerido' }, { status: 400 });

        await connectDB();
        const identity = await BrandIdentity.findOne({ empresaId });
        return NextResponse.json(identity || { empresaId, esencia: '', nicho: '', propuesta: '', tono: '' });
    } catch (error) {
        console.error("Error en GET /api/identidad:", error);
        return NextResponse.json({ error: 'Error al obtener identidad' }, { status: 500 });
    }
}

export async function PUT(req: Request) {
    try {
        const { empresaId, esencia, nicho, propuesta, tono } = await req.json();
        if (!empresaId) return NextResponse.json({ error: 'empresaId requerido' }, { status: 400 });

        await connectDB();
        const updated = await BrandIdentity.findOneAndUpdate(
            { empresaId },
            { esencia, nicho, propuesta, tono },
            { new: true, upsert: true, setDefaultsOnInsert: true }
        );

        return NextResponse.json({ success: true, data: updated });
    } catch (error) {
        console.error("Error en PUT /api/identidad:", error);
        return NextResponse.json({ error: 'Error al actualizar identidad' }, { status: 500 });
    }
}
