import { NextResponse } from 'next/server';
import { cookies } from 'next/headers';
import { verifyToken } from '@/lib/auth';
import { prisma } from '@/lib/prisma';

/**
 * GET /api/auth/me
 * Obtiene la información del usuario autenticado actual
 */
export async function GET() {
  try {
    // Obtener token de las cookies
    const cookieStore = await cookies();
    const token = cookieStore.get('auth-token')?.value;

    if (!token) {
      return NextResponse.json(
        {
          success: false,
          error: 'No autenticado'
        },
        { status: 401 }
      );
    }

    // Verificar token
    const payload = verifyToken(token);

    if (!payload) {
      return NextResponse.json(
        {
          success: false,
          error: 'Token inválido o expirado'
        },
        { status: 401 }
      );
    }

    // Obtener usuario actualizado de la base de datos
    const user = await prisma.user.findUnique({
      where: { id: payload.userId },
      select: {
        id: true,
        email: true,
        nombre: true,
        apellidoPaterno: true,
        apellidoMaterno: true,
        role: true,
        isActive: true,
        emailVerified: true,
        lastLogin: true,
        createdAt: true
      }
    });

    if (!user) {
      return NextResponse.json(
        {
          success: false,
          error: 'Usuario no encontrado'
        },
        { status: 404 }
      );
    }

    if (!user.isActive) {
      return NextResponse.json(
        {
          success: false,
          error: 'Usuario desactivado'
        },
        { status: 403 }
      );
    }

    return NextResponse.json({
      success: true,
      user
    });
  } catch (error) {
    console.error('Error in /api/auth/me:', error);
    return NextResponse.json(
      {
        success: false,
        error: 'Error al verificar autenticación'
      },
      { status: 500 }
    );
  }
}
