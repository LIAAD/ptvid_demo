# PTicola Website

The official website for the PTicola project, showcasing our research in Portuguese NLP.


## Production Deployment

### Using Docker (Recommended)

1. Build the Docker image:
```sh
docker build -t pticola-website:latest .
```

2. Run the container:
```sh
docker run -d -p 8080:8080 pticola-website:latest
```

The website will be available at `http://localhost:8080`

### Manual Deployment

To deploy the website on a server without Docker:

1. Clone the repository:
```sh
git clone <repository-url>
cd pticola-website
```

2. Install dependencies:
```sh
pip install -r requirements.txt
```

3. Run with gunicorn:
```sh
gunicorn --bind 0.0.0.0:8080 app:app
```

### Running as a Service

To make the website run on startup, create a systemd service:

1. Create a service file:
```sh
sudo nano /etc/systemd/system/pticola.service
```

2. Add the following content:
```ini
[Unit]
Description=PTicola Website
After=network.target

[Service]
User=<your-username>
WorkingDirectory=/path/to/pticola-website
ExecStart=/usr/local/bin/gunicorn --bind 0.0.0.0:8080 app:app
Restart=always

[Install]
WantedBy=multi-user.target
```

3. Enable and start the service:
```sh
sudo systemctl daemon-reload
sudo systemctl enable pticola.service
sudo systemctl start pticola.service
```

4. Check status:
```sh
sudo systemctl status pticola.service
```

## Development Setup

If you want to run the app locally, you can use the following commands:

```sh
conda create -p ./.conda python=3.11
conda activate ./.conda
pip install -r requirements.txt
```

To run the app in development mode:
```sh
python app.py
```

## Nginx Configuration (Optional)

If you want to use Nginx as a reverse proxy:

1. Install Nginx:
```sh
sudo apt update
sudo apt install nginx
```

2. Create a site configuration:
```sh
sudo nano /etc/nginx/sites-available/pticola
```

3. Add the configuration:
```nginx
server {
    listen 80;
    server_name your-domain.com;

    location / {
        proxy_pass http://localhost:8080;
        proxy_set_header Host $host;
        proxy_set_header X-Real-IP $remote_addr;
    }
}
```

4. Enable the site:
```sh
sudo ln -s /etc/nginx/sites-available/pticola /etc/nginx/sites-enabled/
sudo nginx -t
sudo systemctl restart nginx
```

## Security Considerations

1. Always use HTTPS in production
2. Keep dependencies updated
3. Use environment variables for sensitive data
4. Configure proper firewall rules
    
