import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';

/**
 * GET /api/my-applications
 * Obtiene todas las aplicaciones del usuario logueado
 */
export async function GET(request: NextRequest) {
  try {
    // Obtener userId del header (viene del middleware)
    const userId = request.headers.get('x-user-id');
    const userEmail = request.headers.get('x-user-email');

    if (!userId || !userEmail) {
      return NextResponse.json(
        { success: false, error: 'No autenticado' },
        { status: 401 }
      );
    }

    // Obtener aplicaciones del usuario
    const applications = await prisma.application.findMany({
      where: {
        OR: [{ userId: parseInt(userId) }, { candidateEmail: userEmail }]
      },
      include: {
        job: {
          select: {
            id: true,
            title: true,
            company: true,
            location: true,
            salary: true,
            jobType: true,
            workMode: true,
            status: true
          }
        }
      },
      orderBy: {
        createdAt: 'desc'
      }
    });

    // Calcular estadísticas
    const stats = {
      total: applications.length,
      pending: applications.filter((app) => app.status === 'pending').length,
      reviewing: applications.filter((app) => app.status === 'reviewing')
        .length,
      interviewed: applications.filter((app) => app.status === 'interviewed')
        .length,
      accepted: applications.filter((app) => app.status === 'accepted').length,
      rejected: applications.filter((app) => app.status === 'rejected').length
    };

    return NextResponse.json({
      success: true,
      data: {
        applications,
        stats
      }
    });
  } catch (error) {
    console.error('Error fetching user applications:', error);
    return NextResponse.json(
      {
        success: false,
        error: 'Error al obtener aplicaciones'
      },
      { status: 500 }
    );
  }
}
