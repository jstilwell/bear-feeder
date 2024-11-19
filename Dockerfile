FROM node:hydrogen-alpine3.20

WORKDIR /app

RUN chown -R node:node /app
USER node

COPY --chown=node:node package*.json .
RUN npm ci

COPY --chown=node:node . .

EXPOSE 3000

ENTRYPOINT ["docker-entrypoint.sh"]
CMD ["node", "src/server.js"]
