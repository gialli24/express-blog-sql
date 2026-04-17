function errorHandler(err, req, res, next) {
    console.error(err.stack);

    res.status(500);
    res.json({
        error: "Internal Server Error",
        message: "An error has occurred"
    })
}

module.exports = errorHandler;