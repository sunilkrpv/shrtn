# shrtn
Simple, powerful URL shortening service built using NodeJS and MongoDb.

##Prerequisites
1. Mongo database setup.
2. NodeJS - latest version preferable.

##Mongo 
Visit http://mongodb.org and choose the appropriate OS platform and install the latest version.
##NodeJS
Visit https://nodejs.org and choose the appropriate OS platform and install the latest version.

###APIs supported for v1.0
1. Get all the short URLs for corresponding long URLs
URL: <your-domain>/api/v1/shorten
HTTP METHOD: GET
2. Get one short URL for corresponding long URL by passing the shortid (_id)
URL: <your-domain>/api/v1/shorten/:shortid
HTTP METHOD: GET
3. Request a short URL for a long URL
URL: <your-domain>/api/v1/shorten
HTTP METHOD: POST
Request parameters:
{
    "shortDomain" : "your-short-domain",
    "longUrl : "some-long-url"
}
Response parameters:
{
    "status" : "OK",
    "shortUrl : "your-short-domain/shortId"
}
If a shortUrl for a longUrl already exists, then the same short URL is returned as response. 
Response parameters:
{
    "status" : "OK",
    "message" : "ALREADY_EXISITS",
    "shortUrl : "your-short-domain/shortId"
}
4. Update a long URL for a short URL
URL: <your-domain>/api/v1/shorten
HTTP METHOD: PUT
Request parameters:
{
    "shortUrl" : "your-short-domain/shortId",
    "longUrl : "new-long-url"
}
Response parameters:
{
  "status" : "OK",
  "message": "UPDATED"
}
5. Delete a short URL entry
URL: <your-domain>/api/v1/shorten
HTTP METHOD: DELETE
Request parameters:
{
    "shortUrl" : "your-short-domain/shortId",
}
Response parameters:
{
  "status" : "OK",
  "message": "DELETED"
}
6. Check service status
URL: <your-domain>/ping
HTTP METHOD: GET
Response parameters:
{
  "status": "OK",
  "ts": "2016-07-26T15:49:35.101Z",
  "message": "Hello from shrtn!"
}