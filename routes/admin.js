const express = require("express");
const router = express.Router();

//require controllers
const homeController = require("../controllers/admin/home");
const categoriesController = require("../controllers/admin/categories");
const addCategoryController = require("../controllers/admin/addCategory");
const coursesController = require("../controllers/admin/courses");
const getCategoryController = require("../controllers/admin/getCategory");
const deleteCategoryController = require("../controllers/admin/deleteCategory");
const updateCategoryController = require("../controllers/admin/updateCategory");
const usersController = require("../controllers/admin/users");

//handling requests 
router.get("/", (req, res) => {
    res.redirect("/admin/home");
});
router.get("/home", homeController);
router.get("/categories", categoriesController);
router.post("/addcategory", addCategoryController);
router.get("/courses", coursesController);
router.get("/category/:id", getCategoryController);
router.delete("/category/delete/:id", deleteCategoryController);
router.post("/category/update/:id", updateCategoryController);
router.get("/users", usersController);
module.exports = router;
