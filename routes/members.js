const express = require('express')
const router = express.Router()
const MemberController = require('../controllers/memberController')

router.get('/', MemberController.findAll)
router.post('/', MemberController.create)
router.put('/:id', MemberController.update)
router.delete('/:id', MemberController.delete)

module.exports = router;