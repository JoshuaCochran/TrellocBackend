const express = require('express');
const router = express.Router();

// Load List model
const List = require('../../models/List');

// @route GET api/lists/test
// @description tests lists route
// @access Public
router.get('/test', (req, res) => res.send('testing list route!'));

// @route GET api/lists
// @description Get all lists
// @access Public
router.get('/', (req, res) => {
    List.find()
    .then(lists => res.json(lists))
    .catch(err => res.status(404).json({ nolistsfound: 'No Lists found'}));
})

// @route GET api/lists/:id
// @description Get single list by id
// @access Public
router.get('/:id', (req, res) => {
    List.findById(req.params.id)
      .then(list => res.json(list))
      .catch(err => res.status(404).json({ nolistfound: 'No List found' }));
  });

// @route GET api/list
// @description add/save list
// @access Public
router.post('/', (req, res) => {
    List.create(req.body)
      .then(list => res.json({ list: list, msg: 'List added successfully' }))
      .catch(err => res.status(400).json({ error: 'Unable to add this list' }));
  });

// @route GET api/lists/:id
// @description Update list
// @access Public
router.put('/:id', (req, res) => {
    List.findByIdAndUpdate(req.params.id, req.body)
      .then(list => res.json({ msg: 'Updated successfully' }))
      .catch(err =>
        res.status(400).json({ error: 'Unable to update the Database' })
      );
  });

// @route GET api/lists/:id
// @description Delete list by id
// @access Public
router.delete('/:id', (req, res) => {
    List.findByIdAndRemove(req.params.id, req.body)
      .then(list => res.json({ mgs: 'List entry deleted successfully' }))
      .catch(err => res.status(404).json({ error: 'No such a list' }));
  });
  
module.exports = router;