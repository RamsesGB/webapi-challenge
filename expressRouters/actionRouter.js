const express = require('express');
const router = express.Router();

const Actions = require('../data/helpers/actionModel.js');

router.use(express.json());

// Endpoints
// The C in CRUD
router.post('/', (req, res) => {
  const { project_id, description, notes } = req.body;

  if(!notes || !description) {
    res
      .status(400)
      .json({ errorMessage: "Please provide notes and description for the action." })
  } else {
    Actions.insert(req.body)
      .then(action => {
        res.status(201).json(action);
      })
      .catch(() => {
        res.status(500).json({
          error: "There was an error while saving the action to the database"
        });
      });
  }
})

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

//The U in CRUD
router.put('/:id', (req, res) => {
  const { description, notes } = req.body;

  if(!notes || !description) {
    res
      .status(400)
      .json({ errorMessage: "Please provide notes and description for the action" })
  } else {
    Actions.update(req.params.id, req.body)
     .then(project => {
       res.status(200).json(project)
     })
     .catch(() => {
       res.status(500).json({
        error: "The action information could not be updated."
       })
     });
  }
})

//The D in Delete
router.delete('/:id', (req, res) => {
  const { id } = req.params;

  Actions.remove(id)
    .then(deleted => {
      res.status(204).end()
    })
    .catch(() => {
      res.status(500).json({
        error: "The action could not be deleted"
      })
    });
})

module.exports = router;
