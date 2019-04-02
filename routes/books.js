const express = require('express')
const router = express.Router()
const BookController = require('../controllers/bookController')

router.get('/', BookController.findAll)
router.post('/', BookController.create)
router.put('/:id', BookController.update)
router.delete('/:id', BookController.delete)

module.exports = router;