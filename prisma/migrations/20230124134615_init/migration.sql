-- CreateTable
CREATE TABLE "airports" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "code" TEXT,
    "city" TEXT
);

-- CreateTable
CREATE TABLE "flights" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "origin_id" INTEGER,
    "destination_id" INTEGER,
    "duration" INTEGER,
    CONSTRAINT "flights_destination_id_fkey" FOREIGN KEY ("destination_id") REFERENCES "airports" ("id") ON DELETE NO ACTION ON UPDATE NO ACTION,
    CONSTRAINT "flights_origin_id_fkey" FOREIGN KEY ("origin_id") REFERENCES "airports" ("id") ON DELETE NO ACTION ON UPDATE NO ACTION
);

-- CreateTable
CREATE TABLE "passengers" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "person_id" INTEGER,
    "flight_id" INTEGER,
    CONSTRAINT "passengers_flight_id_fkey" FOREIGN KEY ("flight_id") REFERENCES "flights" ("id") ON DELETE NO ACTION ON UPDATE NO ACTION,
    CONSTRAINT "passengers_person_id_fkey" FOREIGN KEY ("person_id") REFERENCES "people" ("id") ON DELETE NO ACTION ON UPDATE NO ACTION
);

-- CreateTable
CREATE TABLE "people" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "first" TEXT,
    "last" TEXT
);
