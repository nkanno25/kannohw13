const router = require('express').Router();
const { Category, Product } = require('../../models');

// The `/api/categories` endpoint

router.get('/', (req, res) => {
  Category.findAll({
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
  // find all categories
  // be sure to include its associated Products
});

router.get('/:id', (req, res) => {
  Category.findOne({
    where: {
      id: req.params.id
    },
    include: [
      {
        model: Product,
        as: 'products',
      }
    ]
  })
  .then(resonse => {
    if(!response) {
      res.json({ message: "No category found with this id" })
      return;
    }
    res.json(resonse);
  })
  .catch(err => {
    console.log(err);
    res.status(500).json(err);
  })
  // find one category by its `id` value
  // be sure to include its associated Products
});

router.post('/', (req, res) => {
  Category.create({
    category_name: req.body.category_name
  })
  .then(response => res.json(response))
  .catch(err => {
    console.log(err);
    res.status(500).json(err);
  })
  // create a new category
});

router.put('/:id', (req, res) => {
  Category.update(
    {
      category_name: req.body.category_name
    },
    { 
      where: {
        id: req.params.id
      }
    })
  .then(dbUpdatedData => res.json(dbUpdatedData))
  .catch(err => {
    console.log(err);
    res.status(500).json(err);
  })
  // update a category by its `id` value
});

router.delete('/:id', (req, res) => {
  Category.destroy({
    where: {
      id: req.params.id
    }
  })
  .then(dbResData => {
    if (!dbResData) {
      res.json({ message: 'No category with this id' });
      return; 
    }
    res.json({message: 'Successfully deleted'})
  })
  .catch(err => {
    console.log(err);
    res.status(500).json(err);
  })
  // delete a category by its `id` value
});

module.exports = router;
