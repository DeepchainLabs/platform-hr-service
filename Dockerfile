# Stage 1: Build the NestJS application
FROM node:16.16.0 as builder
#FROM node:16.16.0

WORKDIR /app

# Copy package.json and package-lock.json (or yarn.lock if you use yarn)
COPY package*.json ./

RUN yarn install

COPY . .

#RUN rm -rf node_modules

#RUN rm yarn.lock

#RUN  npm install -g node-gyp

#RUN yarn install

# Copy the rest of the application files
#COPY . .

# Build the NestJS application
RUN yarn run build

# Stage 2: Create a light Docker image
FROM node:16.16.0

WORKDIR /app

# Copy only necessary files from the previous stage
#COPY --from=builder /app/package*.json  ./
COPY package*.json ./

RUN yarn install --only=production
#RUN pwd
COPY --from=builder /app/dist/ ./dist
COPY .env ./
# Install production dependencies (only needed for running the app)
#RUN yarn install --only=production

# Start the NestJS application
CMD ["node", "dist/main.js"]
#CMD  yarn start
