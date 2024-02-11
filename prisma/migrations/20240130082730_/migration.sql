-- CreateTable
CREATE TABLE "Employee" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "designation" TEXT NOT NULL,
    "image" BYTEA NOT NULL,

    CONSTRAINT "Employee_pkey" PRIMARY KEY ("id")
);
