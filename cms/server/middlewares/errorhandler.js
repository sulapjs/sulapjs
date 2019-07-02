module.exports = (err, req, res, next) => {
  const { error, status, message, name } = err;
  console.log(err, '---err handler')
  if (error) {
    console.log({ message: 'ERROR AT TRY CATCH', error });
  }
  if (status) {
    res.status(status).json({ message });
  } else {
    if (name === 'ValidationError') {
      res.status(400).json({ message });
    } else {
      res.status(500).json({ message: 'internal server error' });
    }
  }
}