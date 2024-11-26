/*
  Warnings:

  - You are about to drop the `User` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropTable
PRAGMA foreign_keys=off;
DROP TABLE "User";
PRAGMA foreign_keys=on;

-- CreateTable
CREATE TABLE "quote" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "stock" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "logo" TEXT NOT NULL
);

-- CreateIndex
CREATE UNIQUE INDEX "quote_stock_key" ON "quote"("stock");
