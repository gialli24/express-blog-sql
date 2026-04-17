const express = require('express');
const app = express();
const port = 3000;

/* Middlewares */
const errorHandler = require("./middlewares/errorHandler");
const notFound = require("./middlewares/notFound");


/* Body Parser */
app.use(express.json());

const postsRouter = require("./routers/posts");

app.use("/posts", postsRouter);

app.use(express.static('public'));


app.listen(port, () => {
    console.log(`Listening on port ${port}, http://localhost:${port}`)
});

app.use(errorHandler);
app.use(notFound);