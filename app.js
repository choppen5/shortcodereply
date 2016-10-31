const express = require('express');
const bodyParser = require('body-parser');


var app = express();
app.use(bodyParser.urlencoded({ extended: true })); 


app.post('/shortcodereply', function (req, res) {
  console.log(req.body);
  var messagebody = req.body.Body;
  var sender = req.body.From;
  var shortcode = req.body.To;
  var replystring;

  console.log(`got a body of ${messagebody} from ${sender}`);

  if (messagebody.match(/STOP|END|CANCEL|UNSUBSCRIBE|QUIT/i)) {
    console.log(`matched a stop from ${sender}`);
      //TODO:  do a database update to remove ${sender} from your application when sending outbound messages
    replystring = `You have been unsubscribed from ${shortcode}. Reply START, YES or UNSTOP to begin recieving messages.`;
  
  } else if (messagebody.match(/HELP|INFO/i))  {
    replystring = `Reply with STOP, STOPALL, UNSUBSCRIBE, CANCEL, END, or QUIT to remove yourself.   Reply with START, YES and UNSTOP to opt back in.`;

  } else if (messagebody.match(/START|YES|UNSTOP/i)) {
    replystring = `You will now recieve messages from ${shortcode}`;
    //TODO: do database update to add ${sender} to be allowed 
  } else {
    //none of the keywords have been matched - now do whatver it is you do with SMS messages
    replystring = `Thanks for your message: ${messagebody}`;
  }


  res.send(`<Response>
              <Message>${replystring}</Message>
            </Response>`);
});

app.listen(3000, function () {
  console.log('Example app listening on port 3000!');
});