var twitter = require('twitter')
var express = require('express')
var app = express()

var client = new Twitter({
  consumer_key: '8i8HaHXWRGQh1vIShPCfYAoea',
  consumer_secret: 'dM4REw5wMV5gd3ufdWw5ALU5GgjT2QRmbwsWX3Zzz9mHxqOL5Y',
  access_token_key: '2840635218-E2PgN3ztC0WG71eMhBGgsYPi0bIs1swPk6TMOMh',
  access_token_secret: 'PfTtap0Wq4pEfT3fp6VhtXxCSWtBnUjwdzyR247OW8uck'
});

app.get('/tweets', function(req, res){
	var params = {screen_name: req.body.screen_name };
	client.get('statuses/user_timeline', params, function(error, tweets, response){
  	if (!error) {
	    res.send(tweets)
  	}
	});
});

app.post('/update', function(req, res){
	client.post('statuses/update', { status: req.body.status }, function(error, tweet, response){
		if(error) throw error;
		res.send(tweet)
	})
});

app.listen(3000, function () {
  console.log('Example app listening on port 3000!');
});
