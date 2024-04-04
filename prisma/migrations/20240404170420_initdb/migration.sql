-- CreateTable
CREATE TABLE "TextEmbedding" (
    "id" SERIAL NOT NULL,
    "text" TEXT NOT NULL,
    "embedding" DOUBLE PRECISION[],

    CONSTRAINT "TextEmbedding_pkey" PRIMARY KEY ("id")
);
