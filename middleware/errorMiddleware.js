/* Error-handling middleware always takes four arguments. 
Four arguments must be provided to identify it as an 
error-handling middleware function: 
https://expressjs.com/en/guide/using-middleware.html#middleware.error-handling */
const errorHandler = (err, req, res, next) => {
  const statusCode = res.statusCode ? res.statusCode : 500;

  res.status(statusCode);

  res.json({
    message: err.message,
    stack: process.env.NODE_ENV === "production" ? null : err.stack,
  });
};

module.exports = { errorHandler };
