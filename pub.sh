#!/usr/bin/env sh
echo "打包项目"
pnpm build
echo "打包完成"

cd dist
echo "发布项目"
docker cp . 591658bd739b:/usr/share/nginx/html/
echo "发布完成"
