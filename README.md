# Computer-Vision-Research-Human-Evaluation-Server
A well-developed server for human evaluation in computer vision research

## Preparation
1. We recommend you use docker and install `nginx` in it.
2. Configure `nginx` config.
```
server {
        listen 9090 default_server;
        listen [::]:9090 default_server;

        root /var/www/html;

        index index.html index.htm index.nginx-debian.html;

        server_name _;
        location ^~ /api/ {
                proxy_pass http://127.0.0.1:9292;
                proxy_set_header Host $host;
        }
}
```
3. Build the frontend server and move everything in `frontend/build/*` into `/var/www/html/` or somewhere you specifiy in the config.
4. Run the backend server.