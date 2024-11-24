# homepage





## プロジェクト構造

```
project/
├── backend/
│   ├── app.py                 # Flaskアプリのエントリーポイント
│   ├── requirements.txt       # Pythonの依存関係リスト
│   └── Dockerfile             # バックエンド用Dockerfile
├── frontend/
│   ├── src/                   # フロントエンドのソースコード
│   │   ├── components/
│   │   │   └── Calculator.tsx # 電卓コンポーネント
│   │   ├── App.tsx            # Reactアプリのメインファイル
│   │   └── index.tsx          # Reactエントリーポイント
│   ├── package.json           # npmプロジェクト設定
│   ├── tsconfig.json          # TypeScript設定
│   ├── vite.config.ts         # Vite設定
│   └── Dockerfile             # フロントエンド用Dockerfile
├── docker-compose.yml          # Docker Compose設定
└── .vscode/
    ├── settings.json          # VSCode設定
    └── launch.json            # VSCodeデバッグ設定
```
