FROM kkarczmarczyk/node-yarn

# Prepare app directory
RUN mkdir -p /axelrodui
WORKDIR /axelrodui
ADD . /axelrodui

# Install dependencies
RUN yarn
RUN npm rebuild node-sass

# Build the app
RUN npm run production

# Expose the app port
EXPOSE 4001
