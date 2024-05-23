FROM node:18.20.2 as builder

COPY ./web /opt/csswitch-web
WORKDIR /opt/csswitch-web
RUN npm ci
RUN npm run build

FROM node:18.20.2-alpine3.19

COPY ./api /opt/csswitch-api
WORKDIR /opt/csswitch-api
COPY --from=builder /opt/csswitch-web/dist /opt/csswitch-api/web/build
RUN npm ci --only=production

EXPOSE 3000
CMD ["npm", "start"]