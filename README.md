# Reward Endpoints

### Setup dev env

- git clone
- cd to project
- run `docker-compose up`

### Check endpoints
```js
curl "http://localhost:4000/users/1/rewards?at=2020-03-22T02:00:00Z" // to get rewards data
curl -XPATCH "http://localhost:4000/users/1/rewards/2020-03-16T00:00:00.000Z/redeem" -d '{}' // to redeem

```

### Data structure stored on data.json file

```json
[
  {
    "userID": "1",
    "rewards": [
      {
        "availableAt": "2020-03-15T00:00:00.000Z",
        "redeemedAt": null,
        "expiresAt": "2020-03-16T00:00:00.000Z"
      },
      {
        "availableAt": "2020-03-16T00:00:00.000Z",
        "redeemedAt": null,
        "expiresAt": "2020-03-17T00:00:00.000Z"
      },
      {
        "availableAt": "2020-03-17T00:00:00.000Z",
        "redeemedAt": null,
        "expiresAt": "2020-03-18T00:00:00.000Z"
      },
      {
        "availableAt": "2020-03-18T00:00:00.000Z",
        "redeemedAt": null,
        "expiresAt": "2020-03-19T00:00:00.000Z"
      },
      {
        "availableAt": "2020-03-19T00:00:00.000Z",
        "redeemedAt": null,
        "expiresAt": "2020-03-20T00:00:00.000Z"
      },
      {
        "availableAt": "2020-03-20T00:00:00.000Z",
        "redeemedAt": null,
        "expiresAt": "2020-03-21T00:00:00.000Z"
      },
      {
        "availableAt": "2020-03-21T00:00:00.000Z",
        "redeemedAt": null,
        "expiresAt": "2020-03-22T00:00:00.000Z"
      }
    ]
  }
]
```
