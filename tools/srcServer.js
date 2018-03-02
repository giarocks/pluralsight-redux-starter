import express from 'express';
import webpack from 'webpack';
import path from 'path';
import config from '../webpack.config.dev';
import open from 'open';

/* eslint-disable no-console */

const port =  process.env.PORT || 3003;
const app = express();
const compiler = webpack(config);

app.use(require('webpack-dev-middleware')(compiler, {
  noInfo: true,
  publicPath: config.output.publicPath
}));

app.use(require('webpack-hot-middleware')(compiler));

app.get('*', function(req, res) {
  res.sendFile(path.join( __dirname, '../src/index.html'));
});

String host = "0.0.0.0";

app.listen(port, function(err) {
  if (err) {
    console.log(err);
  } else {
    console.log(`App running on port ${port}`);
    open(`http://${host}:${port}`);
  }
});
