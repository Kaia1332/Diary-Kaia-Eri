const db = require("../database/connect");
class Diary {
    constructor({id, date, time, category,content}){
        this.id = id;
        this.date = date;
        this.time = time;
        this.category = category;
        this.content = content;
    }


static async getAll(){
    const response = await db.query("SELECT * FROM diary ORDER BY date DESC")
    if(response.rows.length === 0){
        throw new Error("No diary entries found")
    }
     return response.rows.map(d => new Diary(d))
}

static async getById(id){
    const response = await db.query("SELECT * FROM diary WHERE id = $1", [id])
    if(response.rows.length !==1){
        throw new Error("Diary entry not found")
    }
    return new Diary(response.rows[0])
}   

static async create(data){
    const{category, content} = data;
    const diaryNew = await db.query("SELECT id FROM diary WHERE id = $1", [id]);
    if(diaryNew.rows.length === 0){
        let response = await db.query("INSERT INTO diary (category, content) VALUES ($1, $2) RETURNING *", [category, content])
        const diaryId = response.rows[0].id;
        const newDiary = await diary.getById(diaryId);
        return newDiary;
    }
    else{
        throw new Error("Diary entry already exists")
    }
}
async update(data){
    try{
    const response = await db.query("UPDATE diary SET category = $1, content = $2 WHERE id = $3 RETURNING *", [this.category, this.content, this.id])
    if(response.rows.length !== 1){
        throw new Error("Diary entry not found")
    }
    return new Snack(response.rows[0])
}catch(err){
    throw new Error(err.message)
}
}

async destroy(){
    const response = await db.query("DELETE FROM diary WHERE id = $1", [this.id])
    if(response.rows.length !== 1){
        throw new Error("Diary entry not found")
    }
    return new Diary(response.rows[0])
}

static async getByCategory(category){
    const response = await db.query("SELECT * FROM diary WHERE category = $1", [category])
    if(response.rows.length === 0){
        throw new Error("No diary entries found")
    }
    return response.rows.map(d => new Diary(d))
}
static async getByDate(date){
    const response = await db.query("SELECT * FROM diary WHERE date = $1", [date])
    if(response.rows.length === 0){
        throw new Error("No diary entries found")
    }
    return response.rows.map(d => new Diary(d))
}
static async getByTime(time){
    const response = await db.query("SELECT * FROM diary WHERE time = $1", [time])
    if(response.rows.length === 0){
        throw new Error("No diary entries found")
    }
    return response.rows.map(d => new Diary(d))
}
}
module.exports = Diary;