# syntax=docker/dockerfile:1

# Comments are provided throughout this file to help you get started.
# If you need more help, visit the Dockerfile reference guide at
# https://docs.docker.com/go/dockerfile-reference/


FROM node:21-alpine3.18

# Use production node environment by default.
ENV NODE_ENV production

WORKDIR /usr/src/app

ARG UID=2000
ARG GID=2000
ARG SOURCE

USER root

# adds usermod and groupmod
RUN apk --no-cache add shadow

# RUN usermod -u ${UID} node && groupmod -g ${GID} node
RUN usermod -u 1000 node && groupmod -g 1000 node

# FROM assets as assets
RUN mkdir -p /vols/serveral

# RUN chown -R ${UID}:${GID} /home/node/app
RUN chown -R 1000:1000 /vols



# Download dependencies as a separate step to take advantage of Docker's caching.
# Leverage a cache mount to /root/.npm to speed up subsequent builds.
# Leverage a bind mounts to package.json and package-lock.json to avoid having to copy them into
# into this layer.
RUN --mount=type=bind,source=package.json,target=package.json \
    --mount=type=bind,source=package-lock.json,target=package-lock.json \
    --mount=type=cache,target=/root/.npm \
    npm ci --omit=dev

# Run the application as a non-root user.
USER node

# Copy the rest of the source files into the image.
COPY . .


# Expose the port that the application listens on.
EXPOSE 3000
# Run the application.
CMD npm start

