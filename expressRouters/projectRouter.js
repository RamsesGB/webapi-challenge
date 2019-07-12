const express = require('express');
const router = express.Router();

const Projects = require('../data/helpers/projectModel.js');

router.use(express.json());

// Endpoints
// The C in CRUD
router.post('/', (req, res) => {
  const { name, description } = req.body;

  if(!name || !description) {
    res
      .status(400)
      .json({ errorMessage: "Please provide name and description for the post." })
  } else {
    Projects.insert(req.body)
      .then(project => {
        res.status(201).json(project);
      })
      .catch(() => {
        res.status(500).json({
          error: "There was an error while saving the project to the database"
        });
      });
  }
})

// The R in CRUD
router.get('/', (req, res) => {
  Projects.get()
    .then(project => {
      res.status(200).json(project);
    })
    .catch(() => {
      res.status(500).json({
        error: "The project information could not be retrieved."
      });
    });
});

//The U in CRUD
router.put('/:id', (req, res) => {
  const { name, description } = req.body;

  if(!name || !description) {
    res
      .status(400)
      .json({ errorMessage: "Please provide name and description for the post." })
  } else {
    Projects.update(req.params.id, req.body)
     .then(project => {
       res.status(200).json(project)
     })
     .catch(() => {
       res.status(500).json({
        error: "The project information could not be updated."
       })
     });
  }
})

//The D in Delete
router.delete('/:id', (req, res) => {
  const { id } = req.params;

  Projects.remove(id)
    .then(deleted => {
      res.status(204).end()
    })
    .catch(() => {
      res.status(500).json({
        error: "The project could not be deleted"
      })
    });
})

module.exports = router;