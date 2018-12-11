# project

## How to run a bot in Terminal via Docker:

1. docker build -t username/project .
2. sh fix.sh
3. docker run -p 3978:3978 username/project

After bot website is up and running on the localhost on port 3978, please use botframework emulator to run the UI.

To enable LUIS please set up your account at luis.ai.
Once LUIS model URL is generated, please copy and paste it into server.js.
