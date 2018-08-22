const express = require('express');
const app = express();
const apiController = require('./apiController');
var bodyParser = require('body-parser');
const port = process.env.PORT || 1000;
app.listen(port, function() {
    console.log('Server is listening on '+port);
});

app.get('/', function (req, res) {
    res.set('content-type', 'text/html');
    res.status(200).send('<h2>Rest Api: Text Justify</h2><br><h3>http://safe-temple-24569.herokuapp.com/api/token</h3><br>Post request: body= {email: exemple@gmail.com}<br>response: {Token : youToken} expire in one hour' +
        '<br><h3>http://safe-temple-24569.herokuapp.com/api/justify</h3><br>Post request: header={Authorization: Bearer youToken}, bodyRaw(text/plain)=you Text <br>response: your justified Text with 80 char a line.  </p>');
});
app.use('/api/', apiController);

module.exports = app;