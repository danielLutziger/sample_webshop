-- CreateTable
CREATE TABLE "Appointment" (
    "id" TEXT NOT NULL,
    "start_time" TIMESTAMP(3) NOT NULL,
    "end_time" TIMESTAMP(3) NOT NULL,
    "user_email" TEXT NOT NULL,
    "user_phone" TEXT NOT NULL,

    CONSTRAINT "Appointment_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Appointment_start_time_end_time_key" ON "Appointment"("start_time", "end_time");
