const express = require('express')
const router = express.Router()
const db = require('../data/helpers/actionModel.js')

router.get('/', async (req, res) => {
    try {
        const result = await db.get()
        res.status(200).json(result)
    } catch(err) {
        next(err)
    }
})

router.get('/:id', validateId, async (req, res) => {
    try {
        const result = await db.get(req.params.id)
        res.status(200).json(result)
    } catch (err) {
        next(err)
    }
})

router.post('/', validate, async (req, res) => {
    try {
        const result = await db.insert(req.body)
        res.status(200).json(result)
    } catch (err) {
        next(err)
    }
})

router.put('/:id', validate, async (req, res) => {
    try {
        const result = await db.update(req.params.id, req.body)
        res.status(200).json(result)
    } catch (err) {
        next(err)
    }
})

router.delete('/:id', async (req, res, next) => {
    try {
        const result = await db.remove(req.params.id)
        res.status(200).json(result)
    } catch (err) {
        next(err)
    }
})

function validateId(req, res, next) {
    db.get(req.params.id)
      .then(result => {
        if (!result) {
            res.status(404).json({ message: "Invalid action id" })
        } else {
            req.action = result
            next()
        }
      })
      .catch(err => {
          res.status(500).json({ errorMessage: 'Unable to validate action id' })
      })
}

function validate(req, res, next) {
    if (!req.body.description || !req.body.notes || !req.body) {
        res.status(400).json({ errorMessage: 'Missing required fields' })
    } else {
        next()
    }
}

module.exports = router;