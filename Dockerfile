FROM zzswang/docker-nginx-react
MAINTAINER zzswang@gmail.com

ENV BASE_URL=/data \
    API_REGEX=/api_vd? \ 
    API_GATEWAY=https://api.your.domain

COPY ./dist /app