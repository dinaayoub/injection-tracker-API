# Injection Tracker API

## Author: Dina Ayoub

## Links and Resources

- [Injection Tracker Android App](https://play.google.com/store/apps/details?id=com.yemry.injectiontracker&hl=en_US&gl=US)
- [ci/cd](https://github.com/dinaayoub/injection-tracker-api/actions) (GitHub Actions)
- [Back-end server deployed on Heroku](https://injection-tracker-api.herokuapp.com/)
- [Trello Board for this API](https://trello.com/b/ZtSxgVog/injection-tracker-api)
- [Trello Board for Android App](https://trello.com/b/v6gEVCil/injection-tracker-features)
- [AWS API gateway]()

## Setup

### `.env` requirements (where applicable)

- `PORT` - Port Number for the server
- `MONGOOSE_URI` - the uri including username and password to your mongo db

### How to run the server

- `npm start`

### How to use this api

- POST: /signup accepts a json body or a form with username and password fields and creates them in the db
- POST /signin accepts a username and password in basic auth headers (url encoded password)

### Tests

- `npm test`
- Tests will check:
  - valid user can sign up
  - invalid user (no username or pass) cannot sign up
  - valid user can sign in
  - invalid user (wrong username or pass) cannot sign in

### UML

![UML Diagram](assets/.png)