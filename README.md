# shrtn
Simple, powerful URL shortening service built using NodeJS and MongoDb.

## Prerequisites
1. Mongo database.
2. NodeJS (latest version preferable).

### MongoDB Setup
Visit http://mongodb.org and choose the appropriate OS platform and install the latest version.

### NodeJS Setup
Visit https://nodejs.org and choose the appropriate OS platform and install the latest version.

## APIs supported in v1.0

1. Get all the short URLs for corresponding long URLs  
**URL: <your-domain>/api/v1/shorten**  
HTTP METHOD: GET  

2. Get one short URL for corresponding long URL by passing the shortid (_id)  
**URL: <your-domain>/api/v1/shorten/:shortid**  
HTTP METHOD: GET  

3. Request a short URL for a long URL  
**URL: <your-domain>/api/v1/shorten**  
HTTP METHOD: POST  
**Request body (json)**  
{  
    "shortDomain" : "your-short-domain",  
    "longUrl : "some-long-url"  
}  
**Response data (json)**  
{  
    "status" : "OK",  
    "shortUrl : "your-short-domain/shortId"  
}  
If a shortUrl for a longUrl already exists, then the same short URL is returned as response.  
**Response data (json)**  
{  
    "status" : "OK",  
    "message" : "ALREADY_EXISITS",  
    "shortUrl : "your-short-domain/shortId"  
}  

4. Update a long URL for a shortened URL  
**URL: <your-domain>/api/v1/shorten**  
HTTP METHOD: PUT  
**Request body (json)**  
{  
    "shortUrl" : "your-short-domain/shortId",  
    "longUrl : "new-long-url"  
}  
**Response parameters (json)**  
{  
  "status" : "OK",  
  "message": "UPDATED"  
}  

5. Delete a short URL entry  
**URL: <your-domain>/api/v1/shorten**  
HTTP METHOD: DELETE  
**Request body**  
{  
    "shortUrl" : "your-short-domain/shortId",  
}  
**Response parameters (json)**  
{  
  "status" : "OK",  
  "message": "DELETED"  
}  

6. Check service status  
**URL: <your-domain>/ping**  
HTTP METHOD: GET  
**Response parameters (json)**  
{  
  "status": "OK",  
  "ts": "2016-07-26T15:49:35.101Z",  
  "message": "Hello from shrtn!"  
}  
