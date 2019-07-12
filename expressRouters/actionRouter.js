const express = require('express');
const router = express.Router();

const Actions = require('../data/helpers/actionModel.js');

router.use(express.json());

// The R in CRUD
router.get('/', (req, res) => {
  Actions.get()
    .then(action => {
      res.status(200).json(action);
    })
    .catch(() => {
      res.status(500).json({
        error: "The actions could not be retrieved."
      });
    });
});

router.get('/:id', (req, res) => {
  const { id } = req.params;

  Actions.get(id)
    .then(action => {
      res.status(200).json(action);
    })
    .catch(() => {
      res.status(500).json({
        error: "The action could not be retrieved."
      })
    });
})

module.exports = router;
