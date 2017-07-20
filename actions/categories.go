package actions

import (
	"errors"
	"log"
	"net/http"

	"github.com/gobuffalo/buffalo"
	"github.com/gosimple/slug"
	"github.com/markbates/pop"
	"github.com/tonyalaribe/mybonways/models"
)

// This file is generated by Buffalo. It offers a basic structure for
// adding, editing and deleting a page. If your model is more
// complex or you need more than the basic implementation you need to
// edit this file.

// Following naming logic is implemented in Buffalo:
// Model: Singular (Category)
// DB Table: Plural (Categories)
// Resource: Plural (Categories)
// Path: Plural (/categories)

// CategoriesResource is the resource for the category model
type CategoriesResource struct {
	buffalo.Resource
}

// List gets all Categories. This function is mapped to the the path
// GET /categories
func (v CategoriesResource) List(c buffalo.Context) error {
	// Get the DB connection from the context
	tx := c.Value("tx").(*pop.Connection)
	categories := &models.Categories{}
	// You can order your list here. Just change
	err := tx.All(categories)
	// to:
	// err := tx.Order("(case when completed then 1 else 2 end) desc, lower([sort_parameter]) asc").All(categories)
	// Don't forget to change [sort_parameter] to the parameter of
	// your model, which should be used for sorting.
	if err != nil {
		return err
	}
	return c.Render(200, r.JSON(categories))
}

// List gets all Categories. This function is mapped to the the path
// GET /categories
func (v CategoriesResource) ListWithTopPromos(c buffalo.Context) error {
	// Get the DB connection from the context
	tx := c.Value("tx").(*pop.Connection)
	categories := models.Categories{}
	// You can order your list here. Just change
	err := tx.All(&categories)
	// to:
	// err := tx.Order("(case when completed then 1 else 2 end) desc, lower([sort_parameter]) asc").All(categories)
	// Don't forget to change [sort_parameter] to the parameter of
	// your model, which should be used for sorting.
	if err != nil {
		return err
	}

	var result []interface{}

	for _, cat := range categories {
		catGroup := make(map[string]interface{})
		m := models.MerchantPromos{}
		query := tx.Where("category = ?", cat.Name)
		query.All(&m)
		catGroup["category"] = cat
		catGroup["promos"] = m
		result = append(result, catGroup)
	}
	return c.Render(200, r.JSON(result))
}

// Show gets the data for one Category. This function is mapped to
// the path GET /categories/{category_id}
func (v CategoriesResource) Show(c buffalo.Context) error {
	// Get the DB connection from the context
	tx := c.Value("tx").(*pop.Connection)
	// Allocate an empty Category
	category := &models.Category{}
	// To find the Category the parameter category_id is used.
	err := tx.Find(category, c.Param("category_id"))
	if err != nil {
		return err
	}
	return c.Render(200, r.JSON(category))
}

// New default implementation. Returns a 404
func (v CategoriesResource) New(c buffalo.Context) error {
	return c.Error(http.StatusUnauthorized, errors.New("not available"))
}

// Create adds a category to the DB. This function is mapped to the
// path POST /categories
func (v CategoriesResource) Create(c buffalo.Context) error {
	// Allocate an empty Category
	category := &models.Category{}
	// Bind category to the html form elements
	err := c.Bind(category)
	if err != nil {
		log.Println("Bind error:", err)
		return err
	}

	category.Slug = slug.Make(category.Name) + "-" + RandStringBytes(5)

	// Get the DB connection from the context
	tx := c.Value("tx").(*pop.Connection)
	// Validate the data from the html form
	verrs, err := tx.ValidateAndCreate(category)
	if err != nil {
		log.Println("validate and create error : ", err)
		return err
	}
	if verrs.HasAny() {
		// Render errors as JSON
		log.Println("has any error", verrs)
		return c.Render(400, r.JSON(verrs))
	}
	// Success!
	return c.Render(201, r.JSON(category))
}

// Edit default implementation. Returns a 404
func (v CategoriesResource) Edit(c buffalo.Context) error {
	return c.Error(http.StatusUnauthorized, errors.New("not available"))
}

// Update changes a category in the DB. This function is mapped to
// the path PUT /categories/{category_id}
func (v CategoriesResource) Update(c buffalo.Context) error {
	// Get the DB connection from the context
	tx := c.Value("tx").(*pop.Connection)
	// Allocate an empty Category
	category := &models.Category{}
	err := tx.Find(category, c.Param("category_id"))
	if err != nil {
		return err
	}
	// Bind category to the html form elements
	err = c.Bind(category)
	if err != nil {
		return err
	}
	verrs, err := tx.ValidateAndUpdate(category)
	if err != nil {
		return err
	}
	if verrs.HasAny() {
		// Render errors as JSON
		return c.Render(400, r.JSON(verrs))
	}
	// Success!
	return c.Render(200, r.JSON(category))
}

// Destroy deletes a category from the DB. This function is mapped
// to the path DELETE /categories/{category_id}
func (v CategoriesResource) Destroy(c buffalo.Context) error {
	// Get the DB connection from the context
	tx := c.Value("tx").(*pop.Connection)
	// Allocate an empty Category
	category := &models.Category{}
	// To find the Category the parameter category_id is used.
	err := tx.Find(category, c.Param("category_id"))
	if err != nil {
		log.Println("find err: ", err)
		return err
	}
	err = tx.Destroy(category)
	if err != nil {
		log.Println("destroy error: ", err)
		return err
	}
	// Success!
	return c.Render(200, r.JSON(category))
}
