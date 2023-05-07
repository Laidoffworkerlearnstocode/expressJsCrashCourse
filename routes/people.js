const express = require('express');
const router = express.Router();
let { people } = require('../data');

router.get('/', (req, res) => {
    res.status(200).json({ success: true, peopleArr: people });
});

router.post('/', (req, res) => {
    const { name } = req.body;
    if (!name) {
        res.status(400).json({ success: false, msg: 'Please Provide Name Value' });
    } else {
        res.status(201).json({ success: true, person: name });
    }
});

router.post('/postman', (req, res) => {
    const { name } = req.body;
    if (!name) {
        res.status(400).json({ success: false, msg: 'Please Provide Name Value' });
    } else {
        res.status(201).json({ success: true, data: [...people, name] });
    }
});

router.put('/:id', (req, res) => {
    const { id } = req.params;
    const { name } = req.body;
    const person = people.find(person => person.id === Number(id));
    if (!person) {
        res.status(404).json({ success: false, msg: `No Person With ID ${id}` });
    }
    people = people.map(_person => {
        if (_person.id === Number(id)) {
            _person.name = name;
        }
        return _person;
    });
    res.status(200).json({ success: true, data: people });
});

router.delete('/:id', (req, res) => {
    const { id } = req.params;
    const person = people.find(person => person.id === Number(id));
    if (!person) {
        res.status(404).json({ success: false, msg: `No Person With ID ${id}` });
    }
    people = people.filter(person => person.id !== Number(id));
    res.status(200).json({ success: true, data: people });
});

module.exports = router;