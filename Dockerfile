ARG NODE_VERSION=24.11.1

FROM node:${NODE_VERSION}-slim

# Use production node environment by default.
ENV NODE_ENV production


WORKDIR /app

RUN apt-get update && apt-get install -y \
    python3 \
    make \
    g++ \
    && rm -rf /var/lib/apt/lists/*

COPY package*.json ./
COPY prisma ./prisma/

# This is to fix the error of npm install time-out
RUN npm config set fetch-retries 5
RUN npm config set fetch-retry-mintimeout 20000
RUN npm config set fetch-retry-maxtimeout 120000

# RUN npm logout

# RUN npm install better-sqlite3 @prisma/adapter-better-sqlite3

# RUN npm install --save-dev @types/better-sqlite3

RUN npm install

RUN npx prisma generate

RUN  chown -R node:node /app



# Run the application as a non-root user.
USER node

# Copy the rest of the source files into the image.
COPY --chown=node:node . .

# Expose the port that the application listens on.
EXPOSE 3000

# Run the application.
CMD ["npm", "run", "dev"]
