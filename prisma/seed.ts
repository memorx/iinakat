import { PrismaClient } from '@prisma/client';
import bcrypt from 'bcryptjs';

const prisma = new PrismaClient();

async function main() {
  console.log('🌱 Iniciando seed completo...\n');

  // =============================================
  // CREAR USUARIOS ADMIN
  // =============================================
  console.log('👤 Creando usuarios admin...');

  const admins = [
    {
      email: process.env.ADMIN_EMAIL || 'admin@inakat.com',
      password: process.env.ADMIN_PASSWORD || 'AdminInakat2024!',
      nombre: process.env.ADMIN_NOMBRE || 'Administrador'
    },
    {
      email: 'guillermo.sanchezy@gmail.com',
      password: 'Guillermo2024!',
      nombre: 'Guillermo Sánchez'
    }
  ];

  for (const adminData of admins) {
    const existingAdmin = await prisma.user.findUnique({
      where: { email: adminData.email }
    });

    if (existingAdmin) {
      console.log(`✅ Usuario admin ya existe: ${adminData.email}`);
      continue;
    }

    const hashedPassword = await bcrypt.hash(adminData.password, 10);

    const admin = await prisma.user.create({
      data: {
        email: adminData.email,
        password: hashedPassword,
        nombre: adminData.nombre,
        role: 'admin',
        isActive: true,
        emailVerified: new Date()
      }
    });

    console.log(`✅ Usuario admin creado: ${admin.email}`);
    console.log(`   📧 Email: ${adminData.email}`);
    console.log(`   🔑 Password: ${adminData.password}\n`);
  }

  // =============================================
  // CREAR VACANTES DE EJEMPLO
  // =============================================
  console.log('\n💼 Creando vacantes de ejemplo...\n');

  const sampleJobs = [
    // TECNOLOGÍA
    {
      title: 'Desarrollador Full Stack',
      company: 'TechSolutions México',
      location: 'Monterrey, Nuevo León',
      salary: '$35,000 - $50,000 / mes',
      jobType: 'Tiempo Completo',
      isRemote: true,
      companyRating: 4.5,
      description: `Estamos buscando un desarrollador full stack apasionado para unirse a nuestro equipo dinámico.

Responsabilidades:
• Desarrollar aplicaciones web usando React y Node.js
• Colaborar con diseñadores y product managers
• Implementar APIs RESTful y GraphQL
• Mantener código de alta calidad con pruebas automatizadas

Ofrecemos:
• Ambiente de trabajo flexible
• Capacitación continua
• Seguro de gastos médicos mayores
• Vacaciones superiores a las de ley`,
      requirements: `• 3+ años de experiencia con JavaScript/TypeScript
• Experiencia sólida con React y Node.js
• Conocimientos de bases de datos SQL y NoSQL
• Familiaridad con Git y metodologías ágiles
• Inglés intermedio-avanzado
• Carrera en Ingeniería en Sistemas o afín`
    },
    {
      title: 'Ingeniero DevOps',
      company: 'CloudNative Inc',
      location: 'Ciudad de México',
      salary: '$45,000 - $65,000 / mes',
      jobType: 'Tiempo Completo',
      isRemote: false,
      companyRating: 4.7,
      description: `Únete a nuestro equipo de infraestructura cloud como Ingeniero DevOps.

Responsabilidades:
• Administrar infraestructura en AWS/Azure
• Implementar pipelines CI/CD
• Automatizar procesos con Terraform y Ansible
• Monitorear y optimizar sistemas en producción
• Garantizar alta disponibilidad de servicios`,
      requirements: `• 4+ años en roles DevOps o SRE
• Experiencia con Kubernetes y Docker
• Conocimientos de AWS o Azure
• Scripting en Python o Bash
• Certificaciones cloud (deseable)`
    },
    {
      title: 'Analista de Ciberseguridad',
      company: 'SecureNet Solutions',
      location: 'Guadalajara, Jalisco',
      salary: '$40,000 - $55,000 / mes',
      jobType: 'Tiempo Completo',
      isRemote: true,
      companyRating: 4.3,
      description: `Protege la infraestructura digital de empresas líderes.

Responsabilidades:
• Realizar análisis de vulnerabilidades
• Implementar controles de seguridad
• Responder a incidentes de seguridad
• Realizar auditorías de seguridad
• Capacitar al equipo en buenas prácticas`,
      requirements: `• Licenciatura en Ciberseguridad o Sistemas
• 2+ años en seguridad informática
• Conocimientos de herramientas SIEM
• Certificaciones como CEH, CISSP (deseable)
• Pensamiento analítico y atención al detalle`
    },

    // DISEÑO Y MARKETING
    {
      title: 'Diseñador UX/UI Senior',
      company: 'Creative Digital Studio',
      location: 'Ciudad de México',
      salary: '$30,000 - $45,000 / mes',
      jobType: 'Tiempo Completo',
      isRemote: true,
      companyRating: 4.6,
      description: `Crea experiencias digitales excepcionales para marcas reconocidas.

Responsabilidades:
• Diseñar interfaces web y móviles
• Crear prototipos interactivos en Figma
• Realizar investigación de usuarios
• Trabajar con equipos de desarrollo
• Mantener sistemas de diseño`,
      requirements: `• 4+ años de experiencia en UX/UI
• Dominio de Figma, Sketch o Adobe XD
• Portfolio sólido con casos de estudio
• Conocimientos de HTML/CSS (básico)
• Excelentes habilidades de comunicación`
    },
    {
      title: 'Especialista en Marketing Digital',
      company: 'Marketing Pro Agency',
      location: 'Monterrey, Nuevo León',
      salary: '$25,000 - $35,000 / mes',
      jobType: 'Tiempo Completo',
      isRemote: false,
      companyRating: 4.2,
      description: `Impulsa estrategias digitales para clientes B2B y B2C.

Responsabilidades:
• Planear y ejecutar campañas en redes sociales
• Gestionar presupuestos de publicidad digital
• Analizar métricas y ROI
• Crear contenido para diferentes plataformas
• Optimizar campañas de Google Ads y Facebook Ads`,
      requirements: `• 2+ años en marketing digital
• Experiencia con Google Analytics y Google Ads
• Conocimientos de SEO/SEM
• Creatividad y pensamiento estratégico
• Carrera en Marketing o afín`
    },
    {
      title: 'Community Manager',
      company: 'Social Media Masters',
      location: 'Remoto',
      salary: '$18,000 - $25,000 / mes',
      jobType: 'Tiempo Completo',
      isRemote: true,
      companyRating: 4.0,
      description: `Gestiona la presencia digital de marcas en redes sociales.

Responsabilidades:
• Crear y programar contenido
• Responder comentarios y mensajes
• Monitorear menciones de marca
• Analizar métricas de engagement
• Colaborar con equipo creativo`,
      requirements: `• 1-2 años como Community Manager
• Conocimiento de plataformas sociales
• Redacción creativa
• Manejo de herramientas de programación
• Disponibilidad de horario flexible`
    },

    // RECURSOS HUMANOS
    {
      title: 'Reclutador IT',
      company: 'TalentFinder',
      location: 'Ciudad de México',
      salary: '$22,000 - $32,000 / mes',
      jobType: 'Tiempo Completo',
      isRemote: false,
      companyRating: 4.4,
      description: `Conecta talento tech con las mejores oportunidades.

Responsabilidades:
• Reclutar perfiles de tecnología
• Realizar entrevistas técnicas básicas
• Gestionar proceso de selección end-to-end
• Mantener base de datos de candidatos
• Negociar ofertas laborales`,
      requirements: `• 2+ años en reclutamiento IT
• Conocimiento de tecnologías y roles tech
• Excelentes habilidades de comunicación
• Manejo de LinkedIn Recruiter
• Orientación a resultados`
    },
    {
      title: 'Generalista de Recursos Humanos',
      company: 'Corporativo Industrial',
      location: 'Querétaro, Querétaro',
      salary: '$25,000 - $35,000 / mes',
      jobType: 'Tiempo Completo',
      isRemote: false,
      companyRating: 4.1,
      description: `Apoya todas las funciones de RRHH en empresa manufacturera.

Responsabilidades:
• Administración de nómina
• Reclutamiento y selección
• Capacitación y desarrollo
• Relaciones laborales
• Cumplimiento legal`,
      requirements: `• Licenciatura en Psicología o RRHH
• 3+ años como generalista
• Conocimiento de LFT
• Manejo de sistema de nómina
• Habilidades de negociación`
    },

    // PSICOLOGÍA Y EDUCACIÓN
    {
      title: 'Psicólogo Organizacional',
      company: 'Consultoría Empresarial',
      location: 'Monterrey, Nuevo León',
      salary: '$20,000 - $30,000 / mes',
      jobType: 'Tiempo Completo',
      isRemote: false,
      companyRating: 4.3,
      description: `Desarrolla talento y mejora clima organizacional.

Responsabilidades:
• Aplicar evaluaciones psicométricas
• Diseñar programas de desarrollo
• Realizar estudios de clima laboral
• Coaching y mentoring
• Intervenciones de cambio organizacional`,
      requirements: `• Licenciatura en Psicología (cédula)
• Especialización en Psicología Organizacional
• 2+ años de experiencia
• Conocimiento de herramientas psicométricas
• Habilidades de facilitación`
    },
    {
      title: 'Diseñador Instruccional',
      company: 'EduTech Innovation',
      location: 'Remoto',
      salary: '$28,000 - $38,000 / mes',
      jobType: 'Tiempo Completo',
      isRemote: true,
      companyRating: 4.5,
      description: `Crea experiencias de aprendizaje digital innovadoras.

Responsabilidades:
• Diseñar cursos e-learning
• Desarrollar contenidos educativos
• Utilizar herramientas de autor
• Aplicar modelos pedagógicos
• Evaluar efectividad de capacitaciones`,
      requirements: `• Licenciatura en Pedagogía o Educación
• 3+ años en diseño instruccional
• Dominio de Articulate Storyline o similar
• Conocimientos de LMS
• Pensamiento creativo`
    },

    // NEGOCIOS Y ADMINISTRACIÓN
    {
      title: 'Analista Financiero',
      company: 'Grupo Financiero Nacional',
      location: 'Ciudad de México',
      salary: '$35,000 - $50,000 / mes',
      jobType: 'Tiempo Completo',
      isRemote: false,
      companyRating: 4.6,
      description: `Analiza inversiones y proyecciones financieras.

Responsabilidades:
• Elaborar modelos financieros
• Analizar estados financieros
• Preparar reportes ejecutivos
• Evaluar proyectos de inversión
• Presentar recomendaciones a dirección`,
      requirements: `• Licenciatura en Finanzas o Contaduría
• 3+ años en análisis financiero
• Excel avanzado y modelado financiero
• Inglés avanzado
• CFA o certificación financiera (deseable)`
    },
    {
      title: 'Project Manager',
      company: 'Consulting Group',
      location: 'Guadalajara, Jalisco',
      salary: '$40,000 - $55,000 / mes',
      jobType: 'Tiempo Completo',
      isRemote: true,
      companyRating: 4.4,
      description: `Lidera proyectos estratégicos de transformación digital.

Responsabilidades:
• Planificar y ejecutar proyectos
• Gestionar equipos multidisciplinarios
• Controlar presupuestos y timelines
• Comunicar con stakeholders
• Mitigar riesgos y resolver problemas`,
      requirements: `• 5+ años gestionando proyectos
• Certificación PMP o similar
• Experiencia con metodologías ágiles
• Excelentes habilidades de liderazgo
• Inglés fluido`
    },
    {
      title: 'Contador General',
      company: 'Corporativo Comercial',
      location: 'Puebla, Puebla',
      salary: '$25,000 - $35,000 / mes',
      jobType: 'Tiempo Completo',
      isRemote: false,
      companyRating: 4.0,
      description: `Gestiona contabilidad general de grupo empresarial.

Responsabilidades:
• Registro contable y conciliaciones
• Elaboración de estados financieros
• Declaraciones fiscales
• Auditorías internas y externas
• Análisis de cuentas`,
      requirements: `• Licenciatura en Contaduría (cédula)
• 4+ años como contador general
• Conocimiento de NIIF
• Manejo de CONTPAQi o SAP
• Orientación a detalles`
    },

    // INGENIERÍA
    {
      title: 'Ingeniero Mecatrónico',
      company: 'Automotive Parts Inc',
      location: 'Querétaro, Querétaro',
      salary: '$30,000 - $42,000 / mes',
      jobType: 'Tiempo Completo',
      isRemote: false,
      companyRating: 4.5,
      description: `Desarrolla soluciones de automatización industrial.

Responsabilidades:
• Diseñar sistemas automatizados
• Programar PLCs y robots
• Mantener equipos de producción
• Optimizar procesos industriales
• Supervisar proyectos de mejora`,
      requirements: `• Ingeniería Mecatrónica o Electrónica
• 3+ años en manufactura
• Programación de PLCs (Siemens, Allen Bradley)
• Conocimientos de robótica
• Lectura de planos técnicos`
    },
    {
      title: 'Ingeniero de Calidad',
      company: 'Manufacturing Excellence',
      location: 'Saltillo, Coahuila',
      salary: '$28,000 - $38,000 / mes',
      jobType: 'Tiempo Completo',
      isRemote: false,
      companyRating: 4.2,
      description: `Asegura estándares de calidad en producción automotriz.

Responsabilidades:
• Implementar sistemas de calidad
• Realizar auditorías internas
• Análisis de causa raíz
• Manejo de quejas de clientes
• Capacitar personal en calidad`,
      requirements: `• Ingeniería Industrial o Mecánica
• Conocimiento de IATF 16949
• Herramientas de calidad (8Ds, AMEF, etc.)
• 2+ años en sector automotriz
• Six Sigma (deseable)`
    },

    // VENTAS Y ATENCIÓN
    {
      title: 'Ejecutivo de Ventas B2B',
      company: 'Software Solutions Corp',
      location: 'Monterrey, Nuevo León',
      salary: '$20,000 - $30,000 + comisiones',
      jobType: 'Tiempo Completo',
      isRemote: false,
      companyRating: 4.3,
      description: `Vende soluciones de software empresarial.

Responsabilidades:
• Prospección de clientes corporativos
• Presentaciones de producto
• Negociación de contratos
• Seguimiento post-venta
• Alcanzar metas de ventas

Comisiones sin techo + prestaciones superiores`,
      requirements: `• 2+ años en ventas B2B
• Experiencia vendiendo software (deseable)
• Habilidades de negociación
• Orientación a resultados
• Licencia de conducir vigente`
    },
    {
      title: 'Customer Success Specialist',
      company: 'SaaS Company',
      location: 'Remoto',
      salary: '$22,000 - $32,000 / mes',
      jobType: 'Tiempo Completo',
      isRemote: true,
      companyRating: 4.7,
      description: `Asegura el éxito de clientes en plataforma SaaS.

Responsabilidades:
• Onboarding de nuevos clientes
• Capacitación en uso de plataforma
• Resolver dudas técnicas
• Identificar oportunidades de upsell
• Monitorear satisfacción del cliente`,
      requirements: `• 1-2 años en atención a clientes
• Conocimientos técnicos básicos
• Excelente comunicación
• Empatía y paciencia
• Inglés intermedio`
    },

    // MEDIO TIEMPO Y FREELANCE
    {
      title: 'Asistente Administrativo',
      company: 'Despacho Contable',
      location: 'Ciudad de México',
      salary: '$12,000 - $18,000 / mes',
      jobType: 'Medio Tiempo',
      isRemote: false,
      companyRating: 3.9,
      description: `Apoya funciones administrativas de despacho.

Responsabilidades:
• Atención a clientes
• Archivo y organización
• Elaboración de documentos
• Manejo de agenda
• Tareas administrativas generales

Horario: Lunes a Viernes 9am - 2pm`,
      requirements: `• Preparatoria o carrera técnica
• Experiencia mínima 6 meses
• Manejo de paquetería Office
• Buena presentación
• Disponibilidad inmediata`
    },
    {
      title: 'Desarrollador Frontend (Freelance)',
      company: 'Digital Agency',
      location: 'Remoto',
      salary: '$400 - $600 / hora',
      jobType: 'Por Proyecto',
      isRemote: true,
      companyRating: 4.4,
      description: `Proyectos web para clientes internacionales.

Esquema:
• Pago por proyecto o por hora
• Flexibilidad de horarios
• Proyectos variados y retadores
• Posibilidad de contrato indefinido

Tecnologías: React, Next.js, Vue.js`,
      requirements: `• Portfolio con proyectos reales
• 3+ años con React o Vue
• Manejo de Git
• Comunicación en inglés
• Disponibilidad mínima 20 hrs/semana`
    }
  ];

  for (const job of sampleJobs) {
    const created = await prisma.job.create({
      data: job
    });
    console.log(`✅ ${created.title} - ${created.company}`);
  }

  await createSampleApplications();

  console.log('\n🎉 ¡Seed completado exitosamente!');
  console.log(`   👤 ${admins.length} usuarios admin creados/verificados`);
  console.log(`   💼 ${sampleJobs.length} vacantes de ejemplo creadas`);
}

async function createSampleApplications() {
  console.log('\n💼 Creando aplicaciones de ejemplo...\n');

  const jobs = await prisma.job.findMany({ take: 10 });

  if (jobs.length === 0) {
    console.log('⚠️  No hay vacantes, saltando creación de aplicaciones.');
    return;
  }

  const sampleApplications = [
    {
      jobId: jobs[0].id,
      candidateName: 'María González Hernández',
      candidateEmail: 'maria.gonzalez@email.com',
      candidatePhone: '81 2345 6789',
      coverLetter:
        'Estimado equipo, me dirijo a ustedes con gran entusiasmo...',
      status: 'pending'
    },
    {
      jobId: jobs[0].id,
      candidateName: 'Carlos Ramírez López',
      candidateEmail: 'carlos.ramirez@email.com',
      candidatePhone: '33 8765 4321',
      coverLetter: 'Tengo 5 años de experiencia...',
      status: 'reviewing'
    },
    {
      jobId: jobs[1]?.id || jobs[0].id,
      candidateName: 'Ana Patricia Martínez',
      candidateEmail: 'ana.martinez@email.com',
      candidatePhone: '55 1234 5678',
      coverLetter: 'Soy Licenciada en Administración...',
      status: 'interviewed'
    },
    {
      jobId: jobs[1]?.id || jobs[0].id,
      candidateName: 'Roberto Sánchez García',
      candidateEmail: 'roberto.sanchez@email.com',
      candidatePhone: null,
      coverLetter: null,
      status: 'pending'
    },
    {
      jobId: jobs[2]?.id || jobs[0].id,
      candidateName: 'Laura Fernández Torres',
      candidateEmail: 'laura.fernandez@email.com',
      candidatePhone: '81 9876 5432',
      coverLetter: 'Me gustaría formar parte de su empresa...',
      status: 'accepted'
    },
    {
      jobId: jobs[2]?.id || jobs[0].id,
      candidateName: 'Pedro Jiménez Ruiz',
      candidateEmail: 'pedro.jimenez@email.com',
      candidatePhone: '33 5555 6666',
      coverLetter: 'Quiero el trabajo. Tengo experiencia.',
      status: 'rejected',
      notes: 'Aplicación muy básica.'
    },
    {
      jobId: jobs[3]?.id || jobs[0].id,
      candidateName: 'Sofía Morales Vega',
      candidateEmail: 'sofia.morales@email.com',
      candidatePhone: '55 7777 8888',
      coverLetter: 'Es un placer dirigirme a ustedes...',
      status: 'pending'
    },
    {
      jobId: jobs[3]?.id || jobs[0].id,
      candidateName: 'Jorge Alberto Castro',
      candidateEmail: 'jorge.castro@email.com',
      candidatePhone: '81 3333 4444',
      coverLetter: null,
      status: 'reviewing'
    },
    {
      jobId: jobs[4]?.id || jobs[0].id,
      candidateName: 'Daniela Reyes Méndez',
      candidateEmail: 'daniela.reyes@email.com',
      candidatePhone: '33 9999 0000',
      coverLetter: '¡Hola! Me encantaría trabajar con ustedes...',
      status: 'interviewed',
      notes: 'Candidata prometedora.'
    },
    {
      jobId: jobs[4]?.id || jobs[0].id,
      candidateName: 'Miguel Ángel Torres',
      candidateEmail: 'miguel.torres@email.com',
      candidatePhone: null,
      coverLetter: 'Adjunto mi curriculum...',
      status: 'pending'
    },
    {
      jobId: jobs[5]?.id || jobs[0].id,
      candidateName: 'Gabriela Herrera Silva',
      candidateEmail: 'gabriela.herrera@email.com',
      candidatePhone: '55 1111 2222',
      coverLetter: 'Como profesional apasionada...',
      status: 'accepted',
      notes: 'Excelente candidata, oferta enviada.'
    },
    {
      jobId: jobs[5]?.id || jobs[0].id,
      candidateName: 'Ricardo Flores Pérez',
      candidateEmail: 'ricardo.flores@email.com',
      candidatePhone: '81 6666 7777',
      coverLetter: 'Me interesa la vacante.',
      status: 'rejected',
      notes: 'Perfil no coincide.'
    }
  ];

  let created = 0;
  for (const appData of sampleApplications) {
    try {
      await prisma.application.create({ data: appData });
      created++;
    } catch (error) {
      // Ignorar duplicados
    }
  }

  console.log(`✅ ${created} aplicaciones de ejemplo creadas\n`);
}

main()
  .catch((e) => {
    console.error('❌ Error:', e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
