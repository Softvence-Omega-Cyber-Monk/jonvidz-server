-- DropForeignKey
ALTER TABLE "public"."alarms_parameters" DROP CONSTRAINT "alarms_parameters_flowSheetId_fkey";

-- DropForeignKey
ALTER TABLE "public"."mar" DROP CONSTRAINT "mar_patientId_fkey";

-- DropForeignKey
ALTER TABLE "public"."mar" DROP CONSTRAINT "mar_userId_fkey";

-- DropForeignKey
ALTER TABLE "public"."measured_data" DROP CONSTRAINT "measured_data_flowSheetId_fkey";

-- DropForeignKey
ALTER TABLE "public"."measured_data" DROP CONSTRAINT "measured_data_patientId_fkey";

-- DropForeignKey
ALTER TABLE "public"."medications" DROP CONSTRAINT "medications_patientId_fkey";

-- DropForeignKey
ALTER TABLE "public"."offvent_monitoring" DROP CONSTRAINT "offvent_monitoring_flowSheetId_fkey";

-- DropForeignKey
ALTER TABLE "public"."patient_care_assignments" DROP CONSTRAINT "patient_care_assignments_staffId_fkey";

-- DropForeignKey
ALTER TABLE "public"."patients" DROP CONSTRAINT "patients_primaryDoctorId_fkey";

-- DropForeignKey
ALTER TABLE "public"."patients" DROP CONSTRAINT "patients_roomId_fkey";

-- DropForeignKey
ALTER TABLE "public"."post_suction_vitals" DROP CONSTRAINT "post_suction_vitals_suctionLogId_fkey";

-- DropForeignKey
ALTER TABLE "public"."pre_suction_vitals" DROP CONSTRAINT "pre_suction_vitals_suctionLogId_fkey";

-- DropForeignKey
ALTER TABLE "public"."secretions_description" DROP CONSTRAINT "secretions_description_suctionLogId_fkey";

-- DropForeignKey
ALTER TABLE "public"."vent_settings" DROP CONSTRAINT "vent_settings_flowSheetId_fkey";

-- DropForeignKey
ALTER TABLE "public"."vent_settings" DROP CONSTRAINT "vent_settings_patientId_fkey";

-- DropForeignKey
ALTER TABLE "public"."vital_parameters" DROP CONSTRAINT "vital_parameters_flowSheetId_fkey";

-- DropForeignKey
ALTER TABLE "public"."vital_parameters" DROP CONSTRAINT "vital_parameters_patientId_fkey";

-- AddForeignKey
ALTER TABLE "alarms_parameters" ADD CONSTRAINT "alarms_parameters_flowSheetId_fkey" FOREIGN KEY ("flowSheetId") REFERENCES "flow_sheets"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "mar" ADD CONSTRAINT "mar_userId_fkey" FOREIGN KEY ("userId") REFERENCES "users"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "mar" ADD CONSTRAINT "mar_patientId_fkey" FOREIGN KEY ("patientId") REFERENCES "patients"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "measured_data" ADD CONSTRAINT "measured_data_flowSheetId_fkey" FOREIGN KEY ("flowSheetId") REFERENCES "flow_sheets"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "measured_data" ADD CONSTRAINT "measured_data_patientId_fkey" FOREIGN KEY ("patientId") REFERENCES "patients"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "medications" ADD CONSTRAINT "medications_patientId_fkey" FOREIGN KEY ("patientId") REFERENCES "patients"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "offvent_monitoring" ADD CONSTRAINT "offvent_monitoring_flowSheetId_fkey" FOREIGN KEY ("flowSheetId") REFERENCES "flow_sheets"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "patients" ADD CONSTRAINT "patients_primaryDoctorId_fkey" FOREIGN KEY ("primaryDoctorId") REFERENCES "staffs"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "patients" ADD CONSTRAINT "patients_roomId_fkey" FOREIGN KEY ("roomId") REFERENCES "rooms"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "patient_care_assignments" ADD CONSTRAINT "patient_care_assignments_staffId_fkey" FOREIGN KEY ("staffId") REFERENCES "staffs"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "post_suction_vitals" ADD CONSTRAINT "post_suction_vitals_suctionLogId_fkey" FOREIGN KEY ("suctionLogId") REFERENCES "suction_logs"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "pre_suction_vitals" ADD CONSTRAINT "pre_suction_vitals_suctionLogId_fkey" FOREIGN KEY ("suctionLogId") REFERENCES "suction_logs"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "secretions_description" ADD CONSTRAINT "secretions_description_suctionLogId_fkey" FOREIGN KEY ("suctionLogId") REFERENCES "suction_logs"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "vent_settings" ADD CONSTRAINT "vent_settings_flowSheetId_fkey" FOREIGN KEY ("flowSheetId") REFERENCES "flow_sheets"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "vent_settings" ADD CONSTRAINT "vent_settings_patientId_fkey" FOREIGN KEY ("patientId") REFERENCES "patients"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "vital_parameters" ADD CONSTRAINT "vital_parameters_flowSheetId_fkey" FOREIGN KEY ("flowSheetId") REFERENCES "flow_sheets"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "vital_parameters" ADD CONSTRAINT "vital_parameters_patientId_fkey" FOREIGN KEY ("patientId") REFERENCES "patients"("id") ON DELETE CASCADE ON UPDATE CASCADE;
