# Base Image 
FROM node:18.16.0-alpine3.17 AS base

WORKDIR /app

COPY package*.json .

RUN npm install

COPY . .

# Linting Stage

# FROM base as linter

# WORKDIR /app

# RUN npm run lint

# Building Stage

FROM base as builder

WORKDIR /app

RUN npm run build


# Production Build

FROM node:18.16.0-alpine3.17

WORKDIR /app

COPY package*.json ./

# Does not install dev dependencies
RUN npm install --only=production 

COPY --from=builder /app .

EXPOSE 8080

CMD ["npm","run","prod"]