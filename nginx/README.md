# Nginx Configuration Guide

This guide is based on nginx version 1.28.0

## Basic Workflow

After deploying a new service URL on the server:
1. Add the appropriate configuration to the `nginx.conf` file
2. Restart nginx without any downtime using the reload command

```bash
nginx -s reload
```

## Additional Information

- The reload command signals nginx to reload its configuration without interrupting the processing of current requests
- Make sure to test your nginx configuration before reloading with `nginx -t`
- Configuration files are typically located in `/etc/nginx/` on Linux or in the nginx installation directory on Windows
- For more complex setups, consider using separate configuration files in the `conf.d/` directory
