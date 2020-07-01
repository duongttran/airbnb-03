
exports.notFound = (req,res, next) => {
    res.status(404).json({
        status: 'fail',
        message: 'URL not found'
    })
}

exports.catchAsync = (func) => {
    return (request, response, next) => func(request, response, next).catch(next)
}

exports.errorHandler = (err, req, res, next) => {
    // default err object of undefined
    err.statusCode = err.statusCode || 500;
    err.status = err.status || "error";

    res.status(err.statusCode).json({
      status: err.status,
      message: err.message
    });
  }
