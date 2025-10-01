FROM nginx:1.25.1-alpine3.17-slim
RUN rm -rf /etc/nginx/sites-enabled/default
COPY nginx.conf /etc/nginx/conf.d/default.conf
COPY dist/ /usr/share/nginx/html/
STOPSIGNAL SIGTERM
CMD ["nginx", "-g", "daemon off;"]
