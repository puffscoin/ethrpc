FROM node:6.9

COPY package.json /puffsrpc/package.json
WORKDIR /puffsrpc
RUN npm install

COPY . /puffsrpc
RUN mkdir dist

ENTRYPOINT [ "/puffsrpc/node_modules/.bin/mocha" ]
