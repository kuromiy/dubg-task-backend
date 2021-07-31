/*
  Warnings:

  - The primary key for the `tasks` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to alter the column `task_id` on the `tasks` table. The data in that column could be lost. The data in that column will be cast from `String` to `Int`.

*/
-- RedefineTables
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_tasks" (
    "task_id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "task_name" TEXT NOT NULL,
    "task_status" TEXT NOT NULL,
    "parent_task_id" INTEGER,
    "user_id" TEXT NOT NULL,
    "created_at" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" DATETIME NOT NULL,
    FOREIGN KEY ("user_id") REFERENCES "users" ("user_id") ON DELETE CASCADE ON UPDATE CASCADE
);
INSERT INTO "new_tasks" ("created_at", "task_id", "task_name", "task_status", "updated_at", "user_id") SELECT "created_at", "task_id", "task_name", "task_status", "updated_at", "user_id" FROM "tasks";
DROP TABLE "tasks";
ALTER TABLE "new_tasks" RENAME TO "tasks";
PRAGMA foreign_key_check;
PRAGMA foreign_keys=ON;
