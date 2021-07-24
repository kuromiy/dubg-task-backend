-- CreateTable
CREATE TABLE "users" (
    "user_id" TEXT NOT NULL PRIMARY KEY,
    "user_name" TEXT NOT NULL,
    "user_mail" TEXT NOT NULL,
    "user_password" TEXT NOT NULL,
    "created_at" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" DATETIME NOT NULL
);

-- CreateTable
CREATE TABLE "tasks" (
    "task_id" TEXT NOT NULL PRIMARY KEY,
    "task_name" TEXT NOT NULL,
    "task_status" TEXT NOT NULL,
    "user_id" TEXT NOT NULL,
    "created_at" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" DATETIME NOT NULL,
    FOREIGN KEY ("user_id") REFERENCES "users" ("user_id") ON DELETE CASCADE ON UPDATE CASCADE
);
