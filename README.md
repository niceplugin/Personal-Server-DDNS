# Dynamic IP Web Server

This project aims to provide web services using a personal PC with dynamic IP as a server.
The PC that will serve as the server is assumed to be directly connected to the modem, not through a router.
(If using a router, port forwarding configuration is required.)

The server requires both nginx and nodejs batch files to be running.
For the nodejs batch file, use the output of `npm run build` (modify the `/src/*` source files if necessary).
Set up the environment variables needed for the nodejs batch file by referring to the `/.env.example` file.
(You need to create an `.env` file.)

Cloudflare workers are used to detect changes in your server's IP address.
Refer to the `/workers/.env.example` file for the environment variables used by the worker.
Worker deployment is done manually through the Cloudflare dashboard.
(GitHub connected auto-deployment is excluded as it's a beta feature at the time of writing this document.)
