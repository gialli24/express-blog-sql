function notFound(req, res, next) {
    res.status(404);
    res.json({
        error: "Not Found",
        message: "Resource not found"
    })
}

module.exports = notFound;