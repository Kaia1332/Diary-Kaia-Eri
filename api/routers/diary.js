const { Router } = require('express');

const diaryController = require('../controller/diary');

const diaryRouter = Router();

diaryRouter.get("/", diaryController.index);
diaryRouter.get("/:id", diaryController.show);
diaryRouter.post("/", diaryController.create);
diaryRouter.patch("/:id", diaryController.update);
diaryRouter.delete("/:id", diaryController.destroy);
diaryRouter.get("/category/:category", diaryController.category);
diaryRouter.get("/date/:date", diaryController.date);
diaryRouter.get("/time/:time", diaryController.time);

module.exports = diaryRouter;