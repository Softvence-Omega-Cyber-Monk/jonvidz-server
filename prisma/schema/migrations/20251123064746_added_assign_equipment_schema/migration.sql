-- CreateTable
CREATE TABLE "list_equipment" (
    "id" TEXT NOT NULL,
    "comments" TEXT,
    "signature" TEXT,
    "time_of_record" TEXT,
    "full_e_cylinder" TEXT,
    "empty_e_cylinder" TEXT,
    "patientCareAssignmentId" TEXT NOT NULL,
    "userId" TEXT,
    "patientId" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "list_equipment_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "assign_equipment" (
    "id" TEXT NOT NULL,
    "date" TIMESTAMP(3),
    "status" TEXT NOT NULL,
    "equipmentId" TEXT NOT NULL,
    "listOfEquipmentId" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "assign_equipment_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "list_equipment_patientCareAssignmentId_key" ON "list_equipment"("patientCareAssignmentId");

-- AddForeignKey
ALTER TABLE "list_equipment" ADD CONSTRAINT "list_equipment_patientCareAssignmentId_fkey" FOREIGN KEY ("patientCareAssignmentId") REFERENCES "patient_care_assignments"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "list_equipment" ADD CONSTRAINT "list_equipment_userId_fkey" FOREIGN KEY ("userId") REFERENCES "users"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "list_equipment" ADD CONSTRAINT "list_equipment_patientId_fkey" FOREIGN KEY ("patientId") REFERENCES "patients"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "assign_equipment" ADD CONSTRAINT "assign_equipment_equipmentId_fkey" FOREIGN KEY ("equipmentId") REFERENCES "master_equipment_list"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "assign_equipment" ADD CONSTRAINT "assign_equipment_listOfEquipmentId_fkey" FOREIGN KEY ("listOfEquipmentId") REFERENCES "list_equipment"("id") ON DELETE CASCADE ON UPDATE CASCADE;
