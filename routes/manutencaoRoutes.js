const express = require('express');
const router = express.Router();
const validator = require('express-joi-validation').createValidator({ passError: true });
const ManutencaoController = require('../controllers/manutencaoController');
const ManutencaoValidator = require('../validators/manutencaoValidator');

router.post('/', validator.body(ManutencaoValidator), ManutencaoController.create);
router.get('/', ManutencaoController.list);
router.get('/:id', ManutencaoController.getById);
router.put('/:id', validator.body(ManutencaoValidator), ManutencaoController.update);
router.delete('/:id', ManutencaoController.delete);

module.exports = router;
