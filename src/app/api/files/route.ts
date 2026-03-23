/**
 * API: /api/files
 * CRUD para archivos de proyecto almacenados en MongoDB.
 * POST: Subir archivo (base64), GET: Listar por projectId, DELETE: Eliminar por id
 */

import { NextResponse } from 'next/server';
import connectDB from '@/lib/mongodb';
import { ProjectFile } from '@/models';

// GET: Listar archivos de un proyecto
export async function GET(req: Request) {
    try {
        const { searchParams } = new URL(req.url);
        const projectId = searchParams.get('projectId');
        if (!projectId) return NextResponse.json({ error: 'projectId requerido' }, { status: 400 });

        await connectDB();
        const files = await ProjectFile.find({ projectId }).sort({ createdAt: -1 }).lean();
        return NextResponse.json(files);
    } catch (error) {
        return NextResponse.json({ error: 'Error al listar archivos' }, { status: 500 });
    }
}

// POST: Subir archivo
export async function POST(req: Request) {
    try {
        const body = await req.json();
        const { projectId, empresaId, nombre, tipo, url } = body;

        if (!projectId || !nombre || !url) {
            return NextResponse.json({ error: 'projectId, nombre y url son requeridos' }, { status: 400 });
        }

        await connectDB();
        const file = await ProjectFile.create({
            projectId,
            empresaId: empresaId || '',
            nombre,
            tipo: tipo || 'documento',
            url
        });

        return NextResponse.json(file);
    } catch (error) {
        return NextResponse.json({ error: 'Error al subir archivo' }, { status: 500 });
    }
}

// DELETE: Eliminar archivo
export async function DELETE(req: Request) {
    try {
        const { searchParams } = new URL(req.url);
        const id = searchParams.get('id');
        if (!id) return NextResponse.json({ error: 'id requerido' }, { status: 400 });

        await connectDB();
        const deleted = await ProjectFile.findByIdAndDelete(id);
        if (!deleted) return NextResponse.json({ error: 'Archivo no encontrado' }, { status: 404 });
        return NextResponse.json({ success: true });
    } catch (error) {
        return NextResponse.json({ error: 'Error al eliminar archivo' }, { status: 500 });
    }
}
