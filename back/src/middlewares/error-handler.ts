function errorHandler(error, req, res, next) {
  res.status(error.status || 500).json({
    url: req.url,
    response: error.message,
    method: req.method,
  });
}

export default errorHandler;
