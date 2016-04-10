window.onload = removeSpecial
var tweet = ["js sucks's's's''s's 3 4O#4302"]
function removeSpecial( )
{
	var convertedString = tweet.split(" ");
	for(i=0;i<convertedString.length; i++)
	{
		if(convertedString[i]===" ")
		{
			convertedString[i]="%20"
		}
		else if(convertedString[i]==="#")
		{
			convertedString[i]="%23"
		}
		else if(convertedString[i]==="'")
		{
			convertedString[i]="%27"
		}
	}
	console.dir(convertedString);

}
