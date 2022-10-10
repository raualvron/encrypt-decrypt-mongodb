# Encrypt and decrypt strings using node js and mongo db
Encrypt and decrypt the strings using Node JS and Mongo DB. The encrypted strings will be saved in the database and upon retrieval will be decrypted.

## Install, build & development
- Modify your private key on .env file (must be of 32 characters)
```bash
$ npm install
$ docker-componse build
$ docker-compose up
```
Open your browser and visit http://localhost:6868

## Routes

- [locahost:6868/raw-data](http://locahost:6868/raw-data)
Route to get raw data (encrypted data)
- [locahost:6868/encrypted/:message](locahost:6868/encrypted/:message)
Route to add any string to the mongodb (data decrypted)
- [locahost:6868/decrypted](locahost:6868/decrypted)
Route to get descrypted data