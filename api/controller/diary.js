const Diary = require("../models/Diary");
async function index(req, res) {
    try {
        const diary = await Diary.getAll();
        res.status(200).json(diary);
    }catch(err){
        res.status(500).json({error: err.message});
    }
}
async function show(req, res) {
    try {
        const diary = await Diary.getById(req.params.id);
        res.status(200).json(diary);
    }catch(err){
        res.status(404).json({error: err.message});
    }
}
async function create(req, res) {
    try {
        const diary = await Diary.create(req.body);
        res.status(201).json(diary);
    }catch(err){
        res.status(400).json({error: err.message});
    }
}
async function update(req, res) {
    try {
        const diary = await Diary.getById(req.params.id);
        await diary.update(req.body);
        res.status(200).json(diary);
    }catch(err){
        res.status(404).json({error: err.message});
    }
}
async function destroy(req, res) {
    try {
        const diary = await Diary.getById(req.params.id);
        const result = await diary.destroy();
        res.status(204).json();
    }catch(err){
        res.status(404).json({error: err.message});
    }
}

async function category(req, res) {
    try {
        const diary = await Diary.getByCategory(req.params.category);
        res.status(200).json(diary);
    }catch(err){
        res.status(404).json({error: err.message});
    }
}

async function date(req, res) {
    try {
        const diary = await Diary.getByDate(req.params.date);
        res.status(200).json(diary);
    }catch(err){
        res.status(404).json({error: err.message});
    }
}

async function time (req, res) {
    try {
        const diary = await Diary.getByTime(req.params.time);
        res.status(200).json(diary);
    }catch(err){
        res.status(404).json({error: err.message});
    }
}

module.exports = {
    index,show,create,update,destroy,category,date,time
}