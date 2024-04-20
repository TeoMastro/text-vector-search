CREATE EXTENSION IF NOT EXISTS vector;

-- CreateTable
CREATE TABLE "TextVectors" (
    "id" SERIAL NOT NULL,
    "text" TEXT NOT NULL,
    "vector" vector,

    CONSTRAINT "TextVectors_pkey" PRIMARY KEY ("id")
);
