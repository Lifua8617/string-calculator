# making_time_calculator

## Project setup
```
npm install
```

### Compiles and hot-reloads for development
```
npm run serve
```

### Compiles and minifies for production
```
npm run build
```

### Lints and fixes files
```
npm run lint
```

### Customize configuration
See [Configuration Reference](https://cli.vuejs.org/config/).

## deploy
# mainブランチにいるか確認
```
git checkout main
```
### ビルド
```
npm run build
```
### gh-pagesブランチに切り替え
```
git checkout gh-pages
```

### distディレクトリの中身をステージング
```
git add -f dist
```
# コミット
```
git commit -m "feat: Update to new version"
```

### GitHubにプッシュ
```
git push origin gh-pages
```
