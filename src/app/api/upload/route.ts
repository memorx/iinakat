import { put } from '@vercel/blob';
import { NextResponse } from 'next/server';

export const runtime = 'nodejs';

export async function POST(request: Request) {
  try {
    const formData = await request.formData();
    const file = formData.get('file') as File;

    if (!file) {
      return NextResponse.json(
        { success: false, error: 'No file provided' },
        { status: 400 }
      );
    }

    // Validar tipo de archivo
    const allowedTypes = [
      'application/pdf',
      'image/jpeg',
      'image/png',
      'image/jpg'
    ];
    if (!allowedTypes.includes(file.type)) {
      return NextResponse.json(
        {
          success: false,
          error: 'Tipo de archivo no permitido. Solo PDF, JPG, PNG'
        },
        { status: 400 }
      );
    }

    // Validar tamaño (máximo 5MB)
    const maxSize = 5 * 1024 * 1024; // 5MB
    if (file.size > maxSize) {
      return NextResponse.json(
        {
          success: false,
          error: 'Archivo muy grande. Máximo 5MB'
        },
        { status: 400 }
      );
    }

    // Subir a Vercel Blob
    const blob = await put(file.name, file, {
      access: 'public'
    });

    return NextResponse.json({
      success: true,
      url: blob.url,
      filename: file.name
    });
  } catch (error) {
    console.error('Error uploading file:', error);
    return NextResponse.json(
      { success: false, error: 'Error al subir archivo' },
      { status: 500 }
    );
  }
}
