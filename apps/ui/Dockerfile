# Production image, copy all the files and run next
FROM docker.io/node:lts-alpine as runner
RUN apk add --no-cache dumb-init
ENV NODE_ENV production
ENV PORT 3000
WORKDIR /usr/src/app
RUN echo $(ls -la)

COPY ./.output /usr/src/app/
RUN chown -R node:node .
USER node
EXPOSE 3000

CMD ["dumb-init", "node", "server/index.mjs"]
