# Installation
## Server
- NodeJS
    - express (web server)
    - handlebars (template engine)
    - yargs (Command line parsing)
    - [some websocket library]

## Client
all served from local copies

# Usage
Run with `node index.js --dev`. Serves by default on port 8000.

Widgets when running in dev mode are in `/public/widgets_dev` and assets in `/public/images_dev` while for production a separate route is used.