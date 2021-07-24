import { PrismaClient, users } from "@prisma/client";

const prisma = new PrismaClient();

const main = async () => {
    // 1. 全テーブルクリア
    console.log("Delete Many");
    await prisma.tasks.deleteMany({});
    await prisma.users.deleteMany({});

    // 2. 開発用データ挿入
    await prisma.users.create({
        data: {
            user_id: "1",
            user_name: "test",
            user_mail: "test@example.com",
            user_password: "test",
        }
    });

    await prisma.tasks.create({
        data: {
            task_id: "1",
            task_name: "test",
            task_status: "1",
            user_id: "1",
        }
    });
};

main()
    .then(() => {
        console.log("SEED FIN.");
    })
    .catch(err => {
        console.log(err);
        process.exit(1);
    })
    .finally(() => {
        prisma.$disconnect();
    });
