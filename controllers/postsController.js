const conn = require('../database/db');

let posts = require('../data/posts');

const index = (req, res) => {
    const tag = req.query.tag;

    $sql = 'SELECT posts.* FROM posts';

    if (tag) {
        $sql += `
            JOIN post_tag ON post_tag.post_id = posts.id
            WHERE post_tag.tag_id = ?
        `;
    }

    conn.query($sql, [tag], (err, result) => {
        if (err) return res.status(500).json("Error getting posts");

        res.json(result);
    });
}

const show = (req, res) => {
    const id = parseInt(req.params.id);

    $postSql = "SELECT posts.* FROM posts WHERE posts.id = ?";

    conn.query($postSql, [id], (err, result) => {
        if (err) return res.status(500).json("Error getting post");
        if (result.length === 0) return res.status(404).json("Post not found");

        $post = result[0];

        $tagsSql = `
            SELECT tags.*
            FROM tags
            JOIN post_tag ON post_tag.tag_id = tags.id
            WHERE post_tag.post_id = ?
        `;

        conn.query($tagsSql, [id], (err, result) => {
            if (err) return res.status(500).json("Error getting tags");

            $post.tags = result;

            res.json($post);
        });
    });
}

const store = (req, res) => {
    const id = posts[posts.length - 1].id + 1;

    const { title, content, image, tags } = req.body;

    const newPost = {
        id: id,
        title,
        content,
        image,
        tags
    }

    posts.push(newPost);

    res.status(201).json(newPost);
}

const update = (req, res) => {
    const id = parseInt(req.params.id);
    const { title, content, image, tags } = req.body;

    const post = posts.find(post => post.id === id);

    if (!post) {
        res.status(404).json({
            message: `Post ${id} not found`
        });

    } else {
        post.title = title ? title : post.title;
        post.content = content ? content : post.content;
        post.image = image ? image : post.image;
        post.tags = tags ? tags : post.tags;

        res.json(post);
    }
}

const modify = (req, res) => {
    const id = parseInt(req.params.id);

    res.send('Modify post with id ' + id);
}

const destroy = (req, res) => {
    const id = parseInt(req.params.id);

    $sql = 'DELETE FROM posts WHERE id = ?';

    conn.query($sql, [id], (err, result) => {
        if (err) return res.status(500).json("Error deleting post");

        if (result.affectedRows === 0) return res.status(404).json("Post not found");

        res.sendStatus(204);
    });
}

module.exports = {
    index,
    show,
    store,
    update,
    modify,
    destroy
}