-- CreateTable
CREATE TABLE "User" (
    "id" SERIAL NOT NULL,
    "email" TEXT NOT NULL,
    "password" TEXT NOT NULL,
    "nombre" TEXT NOT NULL,
    "apellidoPaterno" TEXT,
    "apellidoMaterno" TEXT,
    "role" TEXT NOT NULL DEFAULT 'user',
    "isActive" BOOLEAN NOT NULL DEFAULT true,
    "emailVerified" TIMESTAMP(3),
    "lastLogin" TIMESTAMP(3),
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "User_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "CompanyRequest" (
    "id" SERIAL NOT NULL,
    "nombre" TEXT NOT NULL,
    "apellidoPaterno" TEXT NOT NULL,
    "apellidoMaterno" TEXT NOT NULL,
    "nombreEmpresa" TEXT NOT NULL,
    "correoEmpresa" TEXT NOT NULL,
    "sitioWeb" TEXT,
    "razonSocial" TEXT NOT NULL,
    "rfc" TEXT NOT NULL,
    "direccionEmpresa" TEXT NOT NULL,
    "identificacionUrl" TEXT,
    "documentosConstitucionUrl" TEXT,
    "status" TEXT NOT NULL DEFAULT 'pending',
    "rejectionReason" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "approvedAt" TIMESTAMP(3),
    "userId" INTEGER,

    CONSTRAINT "CompanyRequest_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "ContactMessage" (
    "id" SERIAL NOT NULL,
    "nombre" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "telefono" TEXT,
    "mensaje" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "ContactMessage_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "User_email_key" ON "User"("email");

-- CreateIndex
CREATE INDEX "User_email_idx" ON "User"("email");

-- CreateIndex
CREATE INDEX "User_role_idx" ON "User"("role");

-- CreateIndex
CREATE INDEX "User_isActive_idx" ON "User"("isActive");

-- CreateIndex
CREATE UNIQUE INDEX "CompanyRequest_rfc_key" ON "CompanyRequest"("rfc");

-- CreateIndex
CREATE UNIQUE INDEX "CompanyRequest_userId_key" ON "CompanyRequest"("userId");

-- CreateIndex
CREATE INDEX "CompanyRequest_status_idx" ON "CompanyRequest"("status");

-- CreateIndex
CREATE INDEX "CompanyRequest_createdAt_idx" ON "CompanyRequest"("createdAt");

-- CreateIndex
CREATE INDEX "CompanyRequest_rfc_idx" ON "CompanyRequest"("rfc");

-- CreateIndex
CREATE INDEX "CompanyRequest_correoEmpresa_idx" ON "CompanyRequest"("correoEmpresa");

-- CreateIndex
CREATE INDEX "ContactMessage_createdAt_idx" ON "ContactMessage"("createdAt");

-- CreateIndex
CREATE INDEX "ContactMessage_email_idx" ON "ContactMessage"("email");

-- AddForeignKey
ALTER TABLE "CompanyRequest" ADD CONSTRAINT "CompanyRequest_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE SET NULL ON UPDATE CASCADE;
