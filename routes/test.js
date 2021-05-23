const express = require('express');
const router = express.Router();

/* Test Router. */
router.get('/', (req, res, next) => {
    res.status(200).json({ test: "test working" });
});

module.exports = router;