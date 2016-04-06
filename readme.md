# League Stats
A proof of concept [express.js](http://expressjs.com/) application presenting League of Legends stats via the [Riot Games API](https://developer.riotgames.com/api/methods).

# Technologies
- [express.js](http://expressjs.com/)
- [jQuery](http://code.jquery.com)
- [Heroku](https://www.heroku.com/)
- [Twitter Bootstrap](http://getbootstrap.com/2.3.2/)

# Feature Set
- Query a League of Legends user within the North America (NA) region. Note that the app uses the [summoner-v1.4](https://developer.riotgames.com/api/methods#!/1061/3663) endpoint and default to the NA region only.
- Given the user query, find the last 10 games for the user and display the champion the summoner used, kills, deaths, assists and Kills-Deaths-Assists (KDA) ratio. Note the app uses the [game-v1.3](https://developer.riotgames.com/api/methods#!/1060) endpoint and defaults to the NA region only.

# Running the app in dev
```
leagueApiKey=`cat league_api_key` supervisor node ./bin/www
```
