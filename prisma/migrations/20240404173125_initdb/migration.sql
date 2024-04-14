/*
  Warnings:

  - You are about to drop the `TextEmbedding` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropTable
DROP TABLE "TextEmbedding";

-- CreateTable
CREATE TABLE "TextVectors" (
    "id" SERIAL NOT NULL,
    "text" TEXT NOT NULL,
    "vector" DOUBLE PRECISION[],

    CONSTRAINT "TextVectors_pkey" PRIMARY KEY ("id")
);
