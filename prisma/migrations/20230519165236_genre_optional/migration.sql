-- RedefineTables
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_Book" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "genreId" TEXT,
    "illustratorId" TEXT,
    "publisherId" TEXT,
    "title" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "type" TEXT NOT NULL,
    "publicationDate" TEXT NOT NULL,
    "cover" TEXT NOT NULL,
    "secondaryImage" TEXT NOT NULL,
    CONSTRAINT "Book_genreId_fkey" FOREIGN KEY ("genreId") REFERENCES "Genre" ("id") ON DELETE SET NULL ON UPDATE CASCADE,
    CONSTRAINT "Book_illustratorId_fkey" FOREIGN KEY ("illustratorId") REFERENCES "User" ("id") ON DELETE SET NULL ON UPDATE CASCADE,
    CONSTRAINT "Book_publisherId_fkey" FOREIGN KEY ("publisherId") REFERENCES "User" ("id") ON DELETE SET NULL ON UPDATE CASCADE
);
INSERT INTO "new_Book" ("cover", "description", "genreId", "id", "illustratorId", "publicationDate", "publisherId", "secondaryImage", "title", "type") SELECT "cover", "description", "genreId", "id", "illustratorId", "publicationDate", "publisherId", "secondaryImage", "title", "type" FROM "Book";
DROP TABLE "Book";
ALTER TABLE "new_Book" RENAME TO "Book";
CREATE UNIQUE INDEX "Book_title_key" ON "Book"("title");
PRAGMA foreign_key_check;
PRAGMA foreign_keys=ON;
