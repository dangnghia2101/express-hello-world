const express = require('express')
const path = require("path");
const app = express()

// #############################################################################
// Logs all request paths and method
app.use(function (req, res, next) {
  res.set('x-timestamp', Date.now())
  res.set('x-powered-by', 'cyclic.sh')
  console.log(`[${new Date().toISOString()}] ${req.ip} ${req.method} ${req.path}`);
  next();
});

// #############################################################################
// This configures static hosting for files in /public that have the extensions
// listed in the array.
var options = {
  dotfiles: 'ignore',
  etag: false,
  extensions: ['htm', 'html','css','js','ico','jpg','jpeg','png','svg'],
  index: ['index.html'],
  maxAge: '1m',
  redirect: false
}
app.use(express.static('public', options))

app.use('/.well-known', express.static(path.join(__dirname, 'public', '.well-known')));
app.get('/ticket-assignment/:id', (req, res) => {
  // Lấy giá trị id từ URL
  const { id } = req.params;
  console.log("id nef ", id)
  // res.redirect(`/index.html`);

  // Phản hồi với trang HTML ticket.html
  res.sendFile(path.join(__dirname, 'public', 'ticket.html'));
});
// #############################################################################
// Catch all handler for all other request.
app.use('*', (req,res) => {
  res.json({
      at: new Date().toISOString(),
      method: req.method,
      hostname: req.hostname,
      ip: req.ip,
      query: req.query,
      headers: req.headers,
      cookies: req.cookies,
      params: req.params
    })
    .end()
})

module.exports = app
