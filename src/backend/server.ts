import path from 'path';
import express from 'express';

const app = express();

const buildDirectory = path.resolve(process.cwd(), 'dist');

app.use(express.static(buildDirectory));

app.get('*', (_, res) => {
  res.sendFile(path.resolve(buildDirectory, 'index.html'));
});

app.set('port', process.env.PORT || 8080);

const server = app.listen(app.get('port'), function () {
  console.log('listening on port ', server.address().port);
});
