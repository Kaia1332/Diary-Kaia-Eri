const { create } = require("domain");
const Diary = require("../database/connect")
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
    const{id, date, time, category, content} = data;
    const diaryNew = await db.query("SELECT id FROM diary WHERE id = $1", [id]);
    if(diaryNew.rows.length === 0){
        let response = await db.query("INSERT INTO diary (id, date, time, category, content) VALUES ($1, $2, $3, $4, $5) RETURNING *", [id, date, time, category, content])
        const diaryId = response.rows[0].id;
        const newDiary = await diary.getById(diaryId);
        return newDiary;
    }
    else{
        throw new Error("Diary entry already exists")
    }
}
async update(data){
    const response = await db.query("UPDATE diary SET date = $1, time = $2, category = $3, content = $4 WHERE id = $5 RETURNING *", [this.date, this.time, this.category, this.content, this.id])
    if(response.rows.length !== 1){
        throw new Error("Diary entry not found")
    }
    return new Snack(response.rows[0])
}

async destroy(){
    const response = await db.query("DELETE FROM diary WHERE id = $1", [this.id])
    if(response.rows.length !== 1){
        throw new Error("Diary entry not found")
    }
    return new Diary(response.rows[0])
}
}
module.exports = Diary;