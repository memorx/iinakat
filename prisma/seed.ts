import { PrismaClient } from '@prisma/client';
import bcrypt from 'bcryptjs';

const prisma = new PrismaClient();

async function main() {
  console.log('🌱 Iniciando seed...');

  const adminEmail = process.env.ADMIN_EMAIL || 'admin@inakat.com';
  const adminPassword = process.env.ADMIN_PASSWORD || 'AdminInakat2024!';
  const adminNombre = process.env.ADMIN_NOMBRE || 'Administrador';

  const existingAdmin = await prisma.user.findUnique({
    where: { email: adminEmail }
  });

  if (existingAdmin) {
    console.log('✅ Usuario admin ya existe');
    return;
  }

  const hashedPassword = await bcrypt.hash(adminPassword, 10);

  const admin = await prisma.user.create({
    data: {
      email: adminEmail,
      password: hashedPassword,
      nombre: adminNombre,
      role: 'admin',
      isActive: true,
      emailVerified: new Date()
    }
  });

  console.log('✅ Usuario admin creado:', admin.email);
  console.log('📧 Email:', adminEmail);
  console.log('🔑 Password:', adminPassword);
}

main()
  .catch((e) => {
    console.error('❌ Error:', e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
