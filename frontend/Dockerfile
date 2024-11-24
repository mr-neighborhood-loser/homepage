# ベースイメージ
FROM node:18-alpine

# 作業ディレクトリ
WORKDIR /app

# 新しいユーザーとグループを作成
RUN addgroup -S myuser && adduser -S myuser -G myuser

# 依存関係をコピーしてインストール
COPY package.json package-lock.json ./
RUN npm install

# ViteとReactプラグインをインストール
RUN npm install vite @vitejs/plugin-react --save-dev

# アプリケーションをコピー
COPY . .

# ファイルのオーナーをmyuserに変更
RUN chown -R myuser:myuser /app

# 作業ユーザーを切り替え（非root）
USER myuser

# 開発サーバーを起動
CMD ["npm", "run", "dev"]
