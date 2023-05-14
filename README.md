# Shrinkly

This is a URL shortener project, designed to efficiently and quickly shorten your URLs for easier sharing and better presentation. This project is written in Node.js and uses Redis as its database. 

## Prerequisites
Docker (23.05)
Node.js (20.1.0)
npm

## Getting Started
First, you will need to start Redis locally. You can do this using Docker. Run the following command in your terminal:
```bash
docker run -d --name redis-stack -p 6379:6379 -p 8001:8001 redis/redis-stack:latest
```
This command will run Redis in detached mode, assign the name "redis-stack" to the running container, and map ports 6379 and 8001 from the container to your host. You can check your Redis control panel at 8001 port.


## (test)
```bash
npm run dev
````


## (prod) Installation and Running the Service
Once you have the prerequisites installed and your Redis running, navigate to the project's root directory and run the following commands:
```bash
# Install dependencies
npm i

# Build the project
npm run build

# Start the production service
npm run start
````

## UI
visit localhost:3000 for the UI
![popular and search home page]([url](https://github.com/Steven0706/urlshorten-next13-redis/assets/15137242/17f4a319-7469-47e0-b322-225e0ea2e6ed)
![create new shortUrl page](https://github.com/Steven0706/urlshorten-next13-redis/assets/15137242/bada59c0-1813-470b-8eb6-1697ef76d091)


## Inject Data to Redis (Optional)
If you want to inject some initial data into Redis, you can use the provided bash script. Run the following command in your terminal:
```bash
bash init.sh
````

# API Features
You can visit: http://localhost:3000/api/yourshortUrl to obtain your long URL.

This service can be further integrated into your Chrome plugin.

The API provides multiple functionalities:

### Convert the long URL to short (POST):
```bash
curl --location 'http://localhost:3000/api/urls/new' \
--header 'Content-Type: application/json' \
--data '{
    "longUrl":"www.google.com",
    "title": "search",
    "customUrl": "anything123"
}'
```
### List most popular URLs (GET):
```bash
curl --location 'http://localhost:3000/api/search/popular'
```
### Convert short to long with details (GET):
```bash
curl --location 'http://localhost:3000/api/urls?shortUrl=yourshortUrl'
```
### Convert short to long without details (GET):
```bash
curl --location 'http://localhost:3000/api/yourshortUrl'
```
### Search (POST):
```bash
curl --location 'http://localhost:3000/api/search' \
--header 'Content-Type: application/json' \
--data '{
    "searchQuery": ".com"
}'
```
