FROM kkarczmarczyk/node-yarn

# Prepare app directory
RUN mkdir -p /axelrodui
WORKDIR /axelrodui
ADD . /axelrodui

# Install dependencies
RUN yarn

# Build the app
RUN npm run production
RUN npm rebuild node-sass

# Expose the app port
EXPOSE 4001
