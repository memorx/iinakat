// RUTA: src/app/api/admin/specialties/[id]/route.ts

import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { verifyToken } from '@/lib/auth';
import { cookies } from 'next/headers';

// Middleware para verificar que es admin
async function verifyAdmin() {
  const cookieStore = await cookies();
  const token = cookieStore.get('auth-token')?.value;

  if (!token) {
    return { error: 'No autenticado', status: 401 };
  }

  const payload = verifyToken(token);
  if (!payload?.userId) {
    return { error: 'Token inválido', status: 401 };
  }

  const user = await prisma.user.findUnique({
    where: { id: payload.userId }
  });

  if (!user || user.role !== 'admin') {
    return { error: 'Acceso denegado - Solo administradores', status: 403 };
  }

  return { user };
}

// Función para generar slug
function generateSlug(name: string): string {
  return name
    .toLowerCase()
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-+|-+$/g, '');
}

/**
 * GET /api/admin/specialties/[id]
 * Obtener una especialidad por ID
 */
export async function GET(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    const specialtyId = parseInt(id);

    if (isNaN(specialtyId)) {
      return NextResponse.json(
        { success: false, error: 'ID inválido' },
        { status: 400 }
      );
    }

    const specialty = await prisma.specialty.findUnique({
      where: { id: specialtyId }
    });

    if (!specialty) {
      return NextResponse.json(
        { success: false, error: 'Especialidad no encontrada' },
        { status: 404 }
      );
    }

    return NextResponse.json({
      success: true,
      data: specialty
    });
  } catch (error) {
    console.error('Error fetching specialty:', error);
    return NextResponse.json(
      { success: false, error: 'Error al obtener especialidad' },
      { status: 500 }
    );
  }
}

/**
 * PUT /api/admin/specialties/[id]
 * Actualizar una especialidad
 */
export async function PUT(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const auth = await verifyAdmin();
    if ('error' in auth) {
      return NextResponse.json(
        { success: false, error: auth.error },
        { status: auth.status }
      );
    }

    const { id } = await params;
    const specialtyId = parseInt(id);

    if (isNaN(specialtyId)) {
      return NextResponse.json(
        { success: false, error: 'ID inválido' },
        { status: 400 }
      );
    }

    // Verificar que existe
    const existing = await prisma.specialty.findUnique({
      where: { id: specialtyId }
    });

    if (!existing) {
      return NextResponse.json(
        { success: false, error: 'Especialidad no encontrada' },
        { status: 404 }
      );
    }

    const body = await request.json();
    const {
      name,
      description,
      icon,
      color,
      subcategories,
      sortOrder,
      isActive
    } = body;

    // Preparar datos de actualización
    const updateData: any = {};

    if (name !== undefined && name.trim() !== '') {
      // Verificar nombre único (excluyendo el actual)
      const duplicateName = await prisma.specialty.findFirst({
        where: {
          name: name.trim(),
          id: { not: specialtyId }
        }
      });

      if (duplicateName) {
        return NextResponse.json(
          {
            success: false,
            error: 'Ya existe otra especialidad con ese nombre'
          },
          { status: 409 }
        );
      }

      updateData.name = name.trim();

      // Actualizar slug si cambia el nombre
      const newSlug = generateSlug(name);
      const duplicateSlug = await prisma.specialty.findFirst({
        where: {
          slug: newSlug,
          id: { not: specialtyId }
        }
      });

      if (!duplicateSlug) {
        updateData.slug = newSlug;
      }
    }

    if (description !== undefined) {
      updateData.description = description?.trim() || null;
    }

    if (icon !== undefined) {
      updateData.icon = icon || null;
    }

    if (color !== undefined) {
      updateData.color = color || '#2b5d62';
    }

    if (subcategories !== undefined) {
      updateData.subcategories = subcategories || [];
    }

    if (sortOrder !== undefined) {
      updateData.sortOrder = sortOrder;
    }

    if (isActive !== undefined) {
      updateData.isActive = isActive;
    }

    // Actualizar
    const specialty = await prisma.specialty.update({
      where: { id: specialtyId },
      data: updateData
    });

    return NextResponse.json({
      success: true,
      message: 'Especialidad actualizada exitosamente',
      data: specialty
    });
  } catch (error) {
    console.error('Error updating specialty:', error);
    return NextResponse.json(
      { success: false, error: 'Error al actualizar especialidad' },
      { status: 500 }
    );
  }
}

/**
 * DELETE /api/admin/specialties/[id]
 * Eliminar una especialidad
 */
export async function DELETE(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const auth = await verifyAdmin();
    if ('error' in auth) {
      return NextResponse.json(
        { success: false, error: auth.error },
        { status: auth.status }
      );
    }

    const { id } = await params;
    const specialtyId = parseInt(id);

    if (isNaN(specialtyId)) {
      return NextResponse.json(
        { success: false, error: 'ID inválido' },
        { status: 400 }
      );
    }

    // Verificar que existe
    const existing = await prisma.specialty.findUnique({
      where: { id: specialtyId }
    });

    if (!existing) {
      return NextResponse.json(
        { success: false, error: 'Especialidad no encontrada' },
        { status: 404 }
      );
    }

    // Verificar si está siendo usada en PricingMatrix
    const usedInPricing = await prisma.pricingMatrix.findFirst({
      where: { profile: existing.name }
    });

    if (usedInPricing) {
      return NextResponse.json(
        {
          success: false,
          error:
            'No se puede eliminar: esta especialidad está siendo usada en la matriz de precios. Desactívala en su lugar.'
        },
        { status: 400 }
      );
    }

    // Verificar si hay candidatos con este perfil
    const usedInCandidates = await prisma.candidate.findFirst({
      where: { profile: existing.name }
    });

    if (usedInCandidates) {
      return NextResponse.json(
        {
          success: false,
          error:
            'No se puede eliminar: hay candidatos con esta especialidad. Desactívala en su lugar.'
        },
        { status: 400 }
      );
    }

    // Verificar si hay vacantes con este perfil
    const usedInJobs = await prisma.job.findFirst({
      where: { profile: existing.name }
    });

    if (usedInJobs) {
      return NextResponse.json(
        {
          success: false,
          error:
            'No se puede eliminar: hay vacantes con esta especialidad. Desactívala en su lugar.'
        },
        { status: 400 }
      );
    }

    // Eliminar
    await prisma.specialty.delete({
      where: { id: specialtyId }
    });

    return NextResponse.json({
      success: true,
      message: 'Especialidad eliminada exitosamente'
    });
  } catch (error) {
    console.error('Error deleting specialty:', error);
    return NextResponse.json(
      { success: false, error: 'Error al eliminar especialidad' },
      { status: 500 }
    );
  }
}
