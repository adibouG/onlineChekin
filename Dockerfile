# Filename: Dockerfile 
FROM node:16-alpine

# Uncomment if use of `process.dlopen` is necessary
# apk add --no-cache libc6-compat

ENV PORT 8080
EXPOSE 3000

ARG NODE_ENV=dev
ENV NODE_ENV $NODE_ENV

WORKDIR /home/ec2-user/gitTest/checkin_docker
COPY package.json .
RUN npm install
COPY . .

CMD [ "npm", "run" , "dev" ]
