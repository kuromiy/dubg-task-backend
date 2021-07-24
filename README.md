# dubg-task-backend

以下コマンドで開発環境を実行できる。
```cmd
npm run dev
```

SwaggerによるAPI仕様書

http://localhost:8080/spec

prismaによるDB操作
```cmd
npx prisma migrate dev --name <マイグレーション名>
```

prismaによるデータ投入
```cmd
npx prisma db seed --preview-feature
```