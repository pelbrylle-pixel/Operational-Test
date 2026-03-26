# Deployment Guide

## Local Development Setup (Quick Start)

### Option 1: Automated Setup (Recommended)

```bash
# Clone the repository
git clone <repository-url>
cd Operational-Test

# Backend setup
cd backend
pip install -r requirements.txt
python manage.py makemigrations
python manage.py migrate
python manage.py runserver &

# Frontend setup (in a new terminal)
cd frontend
npm install
npm run dev
```

Visit `http://localhost:3000` in your browser.

## Production Deployment

### Backend Deployment (Django)

#### Option 1: Deploy to Heroku

1. **Install Heroku CLI:**
   ```bash
   npm install -g heroku
   heroku login
   ```

2. **Create Heroku App:**
   ```bash
   cd backend
   heroku create your-app-name
   ```

3. **Add PostgreSQL Database:**
   ```bash
   heroku addons:create heroku-postgresql:hobby-dev
   ```

4. **Update settings.py for Production:**
   ```python
   # In task_manager/settings.py
   import dj_database_url
   
   DATABASES = {
       'default': dj_database_url.config()
   }
   
   DEBUG = False
   ALLOWED_HOSTS = ['your-app-name.herokuapp.com']
   
   # Add WhiteNoise for static files
   MIDDLEWARE = [
       'whitenoise.middleware.WhiteNoiseMiddleware',
       # ... other middleware
   ]
   ```

5. **Create Procfile:**
   ```
   web: gunicorn task_manager.wsgi:application --log-file -
   ```

6. **Create requirements.txt for production:**
   ```
   Django==4.2.0
   djangorestframework==3.14.0
   django-cors-headers==4.0.0
   gunicorn==21.2.0
   whitenoise==6.4.0
   dj-database-url==2.0.0
   psycopg2-binary==2.9.6
   ```

7. **Deploy:**
   ```bash
   git push heroku main
   heroku run python manage.py migrate
   ```

#### Option 2: Deploy to AWS

1. **Create EC2 instance** (Ubuntu 20.04)

2. **Install dependencies:**
   ```bash
   sudo apt-get update
   sudo apt-get install python3.9 python3-pip postgresql nginx supervisor
   ```

3. **Clone repository and setup:**
   ```bash
   git clone <repo-url>
   cd Operational-Test/backend
   pip install -r requirements.txt
   ```

4. **Configure Nginx:**
   ```nginx
   server {
       listen 80;
       server_name your-domain.com;
       
       location / {
           proxy_pass http://127.0.0.1:8000;
           proxy_set_header Host $host;
           proxy_set_header X-Real-IP $remote_addr;
       }
   }
   ```

5. **Run with Gunicorn:**
   ```bash
   gunicorn task_manager.wsgi:application --bind 0.0.0.0:8000
   ```

### Frontend Deployment (React)

#### Option 1: Deploy to Vercel (Recommended for Vite+React)

1. **Install Vercel CLI:**
   ```bash
   npm install -g vercel
   ```

2. **Deploy:**
   ```bash
   cd frontend
   vercel
   ```

3. **Update API URL in production:**
   Edit `src/api.js`:
   ```javascript
   const API_BASE_URL = process.env.VITE_API_URL || 'http://localhost:8000/api';
   
   const api = axios.create({
     baseURL: API_BASE_URL,
   });
   ```

4. **Create .env.production:**
   ```
   VITE_API_URL=https://your-api-domain.com/api
   ```

#### Option 2: Deploy to Netlify

1. **Build the project:**
   ```bash
   cd frontend
   npm run build
   ```

2. **Deploy:**
   ```bash
   npm install -g netlify-cli
   netlify deploy --prod --dir=dist
   ```

3. **Configure Netlify redirects** (netlify.toml):
   ```toml
   [[redirects]]
     from = "/*"
     to = "/index.html"
     status = 200
   ```

#### Option 3: Deploy to GitHub Pages

1. **Update vite.config.js:**
   ```javascript
   export default defineConfig({
     base: '/',
     // ... rest of config
   })
   ```

2. **Build:**
   ```bash
   npm run build
   ```

3. **Push dist folder to gh-pages branch**

### Environment Variables

**Backend (.env or settings.py):**
```
DEBUG=False
SECRET_KEY=your-secret-key-here
ALLOWED_HOSTS=your-domain.com,www.your-domain.com
DATABASE_URL=postgresql://user:password@localhost/dbname
CORS_ALLOWED_ORIGINS=https://your-frontend-domain.com
```

**Frontend (.env.production):**
```
VITE_API_URL=https://api.your-domain.com
```

## Database Migration for Production

```bash
# Create migration
python manage.py makemigrations

# Apply migration
python manage.py migrate --database=production
```

## Monitoring & Maintenance

### Health Check Endpoint

Add to `backend/task_manager/urls.py`:
```python
def health_check(request):
    return JsonResponse({'status': 'ok'})

urlpatterns = [
    path('health/', health_check),
    # ... rest of urls
]
```

### Logging

In `settings.py`:
```python
LOGGING = {
    'version': 1,
    'disable_existing_loggers': False,
    'handlers': {
        'file': {
            'level': 'WARNING',
            'class': 'logging.FileHandler',
            'filename': '/var/log/django/task_manager.log',
        },
    },
    'root': {
        'handlers': ['file'],
        'level': 'WARNING',
    },
}
```

## SSL/HTTPS Configuration

### Using Let's Encrypt

```bash
sudo apt-get install certbot python3-certbot-nginx
sudo certbot certonly --nginx -d your-domain.com
```

Update Nginx config to use SSL certificates.

## Scaling Strategies

1. **Use PostgreSQL** instead of SQLite
2. **Add Redis** for caching
3. **Use Celery** for async tasks
4. **Implement CDN** for static files
5. **Load balance** with Nginx
6. **Container deployment** with Docker

## Backup Strategy

```bash
# Backup database
python manage.py dumpdata > backup.json

# Restore database
python manage.py loaddata backup.json

# Auto-backup with cron
0 2 * * * cd /path/to/backend && python manage.py dumpdata > backups/backup-$(date +\%Y\%m\%d).json
```

## Troubleshooting Deployment

### CORS Issues
Ensure frontend URL is in `CORS_ALLOWED_ORIGINS`

### Static Files Not Loading
```bash
python manage.py collectstatic
```

### Database Connection Error
```bash
python manage.py migrate --run-syncdb
```

### Port Already in Use
```bash
lsof -i :8000
kill -9 <PID>
```

## Performance Optimization

1. **Enable Gzip compression** in Nginx
2. **Use HTTP/2** in production
3. **Minify frontend assets** (done automatically by Vite build)
4. **Add database indexing** on frequently queried fields
5. **Cache API responses** with Redis
6. **Lazy load components** in React
7. **Implement pagination** for large task lists

## Security Best Practices

- [ ] Change SECRET_KEY in production
- [ ] Set DEBUG=False
- [ ] Use HTTPS only
- [ ] Implement rate limiting
- [ ] Add authentication/authorization
- [ ] Sanitize user input
- [ ] Use environment variables for sensitive data
- [ ] Keep dependencies updated
- [ ] Implement CSRF protection
- [ ] Use strong CORS policies
