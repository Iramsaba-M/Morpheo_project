#!/bin/sh

rm /usr/share/nginx/html/runtime.js
envsubst < /usr/share/nginx/html/runtime.js.k8s > /usr/share/nginx/html/runtime.js

exec "$@"
