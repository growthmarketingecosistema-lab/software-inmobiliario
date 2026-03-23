import { NextResponse } from 'next/server';
import connectDB from '@/lib/mongodb';
import { Lead } from '@/models';

export async function GET(req: Request) {
    try {
        const { searchParams } = new URL(req.url);
        const empresaId = searchParams.get('empresaId');
        await connectDB();
        
        const query = empresaId ? { empresaId } : {};
        const leads = await Lead.find(query).sort({ createdAt: -1 });
        return NextResponse.json(leads);
    } catch (error) {
        return NextResponse.json({ error: 'Error fetching leads' }, { status: 500 });
    }
}

export async function POST(req: Request) {
    try {
        const data = await req.json();
        await connectDB();
        const newLead = await Lead.create(data);
        return NextResponse.json(newLead);
    } catch (error) {
        return NextResponse.json({ error: 'Error creating lead' }, { status: 500 });
    }
}

export async function PUT(req: Request) {
    try {
        const { _id, id, ...data } = await req.json();
        const documentId = _id || id;
        await connectDB();
        const updated = await Lead.findByIdAndUpdate(documentId, data, { new: true });
        return NextResponse.json(updated);
    } catch (error) {
        return NextResponse.json({ error: 'Error updating lead' }, { status: 500 });
    }
}
