# dubg-task-backend

## git cloneしたら行うこと
### 1 nodeモジュールをインストールする。  
以下コマンドのどちらかを実行し、必要なnodeモジュールをインストールする。
```cmd
yarn
```
```cmd
npm install
```
### 2 prismaによるDB準備/開発用データ準備  
以下コマンドを順番に実行し、開発用のDBとデータを準備する。  
DB準備
```cmd
npx prisma migrate dev
```
開発用データ準備
```cmd
npx prisma db seed --preview-feature
```
### 3 開発用サーバー起動
以下コマンドのどちらかを実行し開発用サーバーを起動する。
```cmd
yarn dev
```
```cmd
npm run dev
```

## SwaggerによるAPI仕様書
http://localhost:8080/spec
