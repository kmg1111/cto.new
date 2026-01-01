# Deployment Guide

## 🚀 Production Deployment Options

### Option 1: Full Stack on Single Server (Recommended for MVP)

#### Prerequisites
- Ubuntu/Debian server with root access
- Node.js 16+ installed
- Docker installed
- Domain name (optional)

#### Steps

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd 3d-container-home-designer
   ```

2. **Install dependencies**
   ```bash
   npm run install:all
   ```

3. **Start MongoDB**
   ```bash
   docker run -d \
     --name mongodb \
     --restart unless-stopped \
     -p 27017:27017 \
     -v mongodb-data:/data/db \
     mongo:latest
   ```

4. **Configure environment variables**
   ```bash
   # server/.env
   MONGODB_URI=mongodb://localhost:27017/container-home-designer
   PORT=5000
   NODE_ENV=production
   ```

5. **Build frontend**
   ```bash
   cd client
   npm run build
   cd ..
   ```

6. **Install PM2 (process manager)**
   ```bash
   npm install -g pm2
   ```

7. **Start backend**
   ```bash
   cd server
   pm2 start server.js --name container-home-api
   pm2 save
   pm2 startup
   ```

8. **Serve frontend with Nginx**
   ```bash
   sudo apt-get install nginx
   
   # Copy build files
   sudo cp -r client/build/* /var/www/html/
   
   # Configure Nginx
   sudo nano /etc/nginx/sites-available/default
   ```
   
   Nginx config:
   ```nginx
   server {
       listen 80;
       server_name your-domain.com;
       
       root /var/www/html;
       index index.html;
       
       location / {
           try_files $uri $uri/ /index.html;
       }
       
       location /api {
           proxy_pass http://localhost:5000;
           proxy_http_version 1.1;
           proxy_set_header Upgrade $http_upgrade;
           proxy_set_header Connection 'upgrade';
           proxy_set_header Host $host;
           proxy_cache_bypass $http_upgrade;
       }
   }
   ```
   
   ```bash
   sudo systemctl restart nginx
   ```

9. **Setup SSL (optional but recommended)**
   ```bash
   sudo apt-get install certbot python3-certbot-nginx
   sudo certbot --nginx -d your-domain.com
   ```

---

### Option 2: Separate Deployments (Scalable)

#### Frontend - Vercel/Netlify

1. **Vercel**
   ```bash
   cd client
   npm install -g vercel
   vercel
   ```
   
   Add environment variable:
   ```
   REACT_APP_API_URL=https://your-api.com
   ```

2. **Netlify**
   ```bash
   cd client
   npm run build
   # Upload build/ folder to Netlify
   ```

#### Backend - Heroku

1. **Create Heroku app**
   ```bash
   cd server
   heroku create your-app-name
   ```

2. **Add environment variables**
   ```bash
   heroku config:set MONGODB_URI=your-mongodb-atlas-uri
   heroku config:set PORT=5000
   ```

3. **Create Procfile**
   ```
   web: node server.js
   ```

4. **Deploy**
   ```bash
   git subtree push --prefix server heroku main
   ```

#### Database - MongoDB Atlas

1. Go to https://www.mongodb.com/cloud/atlas
2. Create free cluster
3. Get connection string
4. Whitelist IPs (0.0.0.0/0 for all)
5. Update MONGODB_URI in backend

---

### Option 3: Docker Compose (Container-based)

1. **Create docker-compose.yml**
   ```yaml
   version: '3.8'
   
   services:
     mongodb:
       image: mongo:latest
       ports:
         - "27017:27017"
       volumes:
         - mongodb-data:/data/db
       restart: unless-stopped
     
     backend:
       build: ./server
       ports:
         - "5000:5000"
       environment:
         - MONGODB_URI=mongodb://mongodb:27017/container-home-designer
         - PORT=5000
       depends_on:
         - mongodb
       restart: unless-stopped
     
     frontend:
       build: ./client
       ports:
         - "3000:80"
       depends_on:
         - backend
       restart: unless-stopped
   
   volumes:
     mongodb-data:
   ```

2. **Create server/Dockerfile**
   ```dockerfile
   FROM node:16-alpine
   WORKDIR /app
   COPY package*.json ./
   RUN npm install
   COPY . .
   EXPOSE 5000
   CMD ["node", "server.js"]
   ```

3. **Create client/Dockerfile**
   ```dockerfile
   FROM node:16-alpine as build
   WORKDIR /app
   COPY package*.json ./
   RUN npm install
   COPY . .
   RUN npm run build
   
   FROM nginx:alpine
   COPY --from=build /app/build /usr/share/nginx/html
   EXPOSE 80
   CMD ["nginx", "-g", "daemon off;"]
   ```

4. **Deploy**
   ```bash
   docker-compose up -d
   ```

---

### Option 4: AWS (Professional)

#### Frontend - S3 + CloudFront

1. **Build and upload**
   ```bash
   cd client
   npm run build
   aws s3 sync build/ s3://your-bucket-name
   ```

2. **Configure S3 bucket for static hosting**

3. **Create CloudFront distribution**

#### Backend - EC2 or Elastic Beanstalk

1. **EC2 Option**
   - Launch Ubuntu instance
   - Follow "Option 1" steps
   
2. **Elastic Beanstalk**
   ```bash
   cd server
   eb init
   eb create
   eb deploy
   ```

#### Database - DocumentDB or MongoDB Atlas

---

## 🔒 Security Checklist

- [ ] Change default MongoDB credentials
- [ ] Enable MongoDB authentication
- [ ] Use environment variables for secrets
- [ ] Enable CORS properly (specific origins)
- [ ] Add rate limiting
- [ ] Enable HTTPS
- [ ] Use helmet.js for Express
- [ ] Sanitize user inputs
- [ ] Regular dependency updates
- [ ] Backup database regularly

## 📊 Monitoring

### Backend Monitoring

1. **PM2 Monitor**
   ```bash
   pm2 monit
   pm2 logs
   ```

2. **Log Files**
   ```bash
   pm2 logs container-home-api
   ```

### Database Monitoring

```bash
docker logs mongodb
```

### Frontend Monitoring

- Use browser DevTools
- Google Analytics (optional)
- Error tracking (Sentry)

## 🔄 Updates & Maintenance

### Update Application

```bash
# Pull latest code
git pull origin main

# Update dependencies
npm run install:all

# Rebuild frontend
cd client && npm run build

# Restart backend
pm2 restart container-home-api

# Clear Nginx cache (if needed)
sudo systemctl reload nginx
```

### Database Backup

```bash
# Backup
docker exec mongodb mongodump \
  --out=/backup \
  --db=container-home-designer

# Copy backup
docker cp mongodb:/backup ./mongodb-backup-$(date +%Y%m%d)

# Restore
docker exec mongodb mongorestore \
  --db=container-home-designer \
  /backup/container-home-designer
```

## 📈 Scaling

### Horizontal Scaling

1. **Load Balancer** (Nginx/HAProxy)
2. **Multiple Backend Instances**
3. **MongoDB Replica Set**
4. **CDN for Frontend**

### Vertical Scaling

1. Increase server resources
2. Optimize database queries
3. Add caching (Redis)
4. Optimize bundle size

## 🐛 Troubleshooting

### Issue: Frontend can't connect to backend

**Solution:**
- Check CORS configuration
- Verify API_URL environment variable
- Check network/firewall rules

### Issue: MongoDB connection failed

**Solution:**
- Verify MongoDB is running: `docker ps | grep mongodb`
- Check connection string
- Verify network access

### Issue: Build fails

**Solution:**
- Clear node_modules: `rm -rf node_modules && npm install`
- Clear npm cache: `npm cache clean --force`
- Check Node.js version: `node --version`

## 📝 Post-Deployment Checklist

- [ ] Application accessible via URL
- [ ] API endpoints responding
- [ ] Database connected
- [ ] Save/load functionality works
- [ ] 3D scene renders correctly
- [ ] No console errors
- [ ] SSL certificate valid (if HTTPS)
- [ ] Backup system configured
- [ ] Monitoring setup
- [ ] Error tracking enabled

## 🎯 Performance Optimization

1. **Frontend**
   - Enable gzip compression
   - Use CDN for static assets
   - Lazy load components
   - Optimize images/textures

2. **Backend**
   - Add Redis caching
   - Enable compression
   - Optimize database queries
   - Use connection pooling

3. **Database**
   - Add indexes
   - Enable compression
   - Regular maintenance
   - Monitor query performance

## 💰 Cost Estimation

### Small Scale (MVP)
- **DigitalOcean Droplet**: $5-10/month
- **MongoDB Atlas Free**: $0
- **Domain**: $10-15/year
- **Total**: ~$8/month

### Medium Scale
- **Heroku Standard**: $25/month
- **MongoDB Atlas**: $9/month
- **Vercel Pro**: $20/month
- **Total**: ~$54/month

### Large Scale
- **AWS EC2**: $50-100/month
- **MongoDB Atlas**: $57/month
- **CloudFront**: $10-20/month
- **Total**: ~$120-180/month

---

## 📞 Support

For deployment issues:
1. Check logs first
2. Review documentation
3. Check GitHub issues
4. Contact support team

---

**Last Updated**: January 2025  
**Version**: 1.0.0
