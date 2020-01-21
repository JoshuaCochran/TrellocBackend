const express = require('express');
const router = express.Router();

// Load Card model
const Card = require('../../models/Card');

// @route GET api/cards/test
// @description tests cards route
// @access Public
router.get('/test', (req, res) => res.send('testing card route!'));

// @route GET api/cards
// @description Get all cards
// @access Public
router.get('/', (req, res) => {
    Card.find()
    .then(cards => res.json(cards))
    .catch(err => res.status(404).json({ nocardsfound: 'No Cards found'}));
})

// @route GET api/cards/:id
// @description Get single card by id
// @access Public
router.get('/:id', (req, res) => {
    Card.findById(req.params.id)
      .then(card => res.json(card))
      .catch(err => res.status(404).json({ nocardfound: 'No Card found' }));
  });

// @route GET api/card
// @description add/save card
// @access Public
router.post('/', (req, res) => {
    Card.create(req.body)
      .then(card => res.json({ card: card, msg: 'Card added successfully' }))
      .catch(err => res.status(400).json({ error: 'Unable to add this card' }));
  });

// @route GET api/cards/:id
// @description Update card
// @access Public
router.put('/:id', (req, res) => {
    Card.findByIdAndUpdate(req.params.id, req.body)
      .then(card => res.json({ msg: 'Updated successfully' }))
      .catch(err =>
        res.status(400).json({ error: 'Unable to update the Database' })
      );
  });

// @route GET api/cards/:id
// @description Delete card by id
// @access Public
router.delete('/:id', (req, res) => {
    Card.findByIdAndRemove(req.params.id, req.body)
      .then(card => res.json({ mgs: 'Card entry deleted successfully' }))
      .catch(err => res.status(404).json({ error: 'No such a card' }));
  });
  
module.exports = router;