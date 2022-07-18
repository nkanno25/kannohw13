const router = require('express').Router();
const { Tag, Product, ProductTag } = require('../../models');

// The `/api/tags` endpoint

router.get('/', (req, res) => {
  Tag.findAll({
    attributes: ['id', 'tag_name'],
    include: {  
      model: Product,
      as: 'products'
    }
  })
  .then(response => res.json(response))
  .catch(err => {
    console.log(err);
    res.status(500).json(err);
  })
  // find all tags
  // be sure to include its associated Product data
});

router.get('/:id', (req, res) => {
  Tag.findOne({
    where: {
      id: req.params.id
    },
    include: {
      model: Product,
      as: 'products'
    }
  })
  .then(response => {
    if(!response) {
      res.json({ message: "no tag with requested id" })
      return;
    }
    res.json(response)
  })
  .catch(err => {
    console.log(err);
    res.status(500).json(err);
  })
  // find a single tag by its `id`
  // be sure to include its associated Product data
});

router.post('/', (req, res) => {
  Tag.create({
    tag_name: req.body.tag_name
  })
  .then(response => res.json(response))
  .catch(err => {
    console.log(err);
    res.status(500).json(err);
  })
  // create a new tag
});

router.put('/:id', (req, res) => {
  Tag.update(
    {
      tag_name: req.body.tag_name
    },
    { 
      where: {
        id: req.params.id
      }
    })
  .then(response => res.json(response))
  .catch(err => {
    console.log(err);
    res.status(500).json(err);
  })
  // update a tag's name by its `id` value
});

router.delete('/:id', (req, res) => {
  Tag.destroy({
    where: {
      id: req.params.id
    }
  })
  .then(response => {
    if (!response) {
      res.json({ message: 'no tag with requested id' });
      return; 
    }
    res.json({message: 'deleted'})
  })
  .catch(err => {
    console.log(err);
    res.status(500).json(err);
  })
  // delete on tag by its `id` value
});

module.exports = router;
