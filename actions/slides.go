package actions

import (
	"log"
	"net/http"

	"github.com/gobuffalo/buffalo"
	"github.com/gobuffalo/buffalo/render"
	"github.com/markbates/pop"
	"github.com/pkg/errors"
	uuid "github.com/satori/go.uuid"
	"github.com/tonyalaribe/mybonways/models"
)

// This file is generated by Buffalo. It offers a basic structure for
// adding, editing and deleting a page. If your model is more
// complex or you need more than the basic implementation you need to
// edit this file.

// Following naming logic is implemented in Buffalo:
// Model: Singular (Slide)
// DB Table: Plural (Slides)
// Resource: Plural (Slides)
// Path: Plural (/slides)
// View Template Folder: Plural (/templates/slides/)

// SlidesResource is the resource for the slide model
type SlidesResource struct {
	buffalo.Resource
}

// List gets all Slides. This function is mapped to the the path
// GET /slides
func (v SlidesResource) List(c buffalo.Context) error {
	// Get the DB connection from the context
	tx := c.Value("tx").(*pop.Connection)
	slides := &models.Slides{}
	// You can order your list here. Just change
	err := tx.All(slides)
	// to:
	// err := tx.Order("(case when completed then 1 else 2 end) desc, lower([sort_parameter]) asc").All(slides)
	// Don't forget to change [sort_parameter] to the parameter of
	// your model, which should be used for sorting.
	if err != nil {
		return err
	}
	// Make slides available inside the html template
	// c.Set("slides", slides)
	log.Println("slides: ", slides)
	return c.Render(http.StatusOK, render.JSON(slides))
}

// Show gets the data for one Slide. This function is mapped to
// the path GET /slides/{slide_id}
func (v SlidesResource) Show(c buffalo.Context) error {
	// Get the DB connection from the context
	tx := c.Value("tx").(*pop.Connection)
	// Allocate an empty Slide
	slide := &models.Slide{}
	// To find the Slide the parameter slide_id is used.
	err := tx.Find(slide, c.Param("slide_id"))
	if err != nil {
		return err
	}
	// Make slide available inside the html template
	c.Set("slide", slide)
	return c.Render(http.StatusOK, render.JSON(slide))
}

// New renders the formular for creating a new slide.
// This function is mapped to the path GET /slides/new
func (v SlidesResource) New(c buffalo.Context) error {
	// Make slide available inside the html template
	c.Set("slide", &models.Slide{})
	return c.Render(200, r.HTML("slides/new.html"))
}

// Create adds a slide to the DB. This function is mapped to the
// path POST /slides
func (v SlidesResource) Create(c buffalo.Context) error {
	// Allocate an empty Slide
	slide := &models.Slide{}
	// Bind slide to the html form elements
	err := c.Bind(slide)
	if err != nil {
		return err
	}

	// save the image to s3 bucket...
	// slide.Image, err := UploadBase64Image(s3bucket, )
	imgUUID := uuid.NewV1().String()
	imagename := "slide_images/" + imgUUID
	slide.Image, err = UploadBase64Image(s3bucket, slide.Image, imagename)
	if err != nil {
		log.Printf("b64error err: %#v\n", err)
		return c.Error(http.StatusInternalServerError, errors.WithStack(err))
	}

	log.Println("no up load b64 error")

	// Get the DB connection from the context
	tx := c.Value("tx").(*pop.Connection)
	// Validate the data from the html form
	verrs, err := tx.ValidateAndCreate(slide)
	if err != nil {
		return err
	}
	if verrs.HasAny() {
		// Make slide available inside the html template
		c.Set("slide", slide)
		// Make the errors available inside the html template
		c.Set("errors", verrs)
		// Render again the new.html template that the user can
		// correct the input.
		return c.Render(422, r.HTML("slides/new.html"))
	}

	tx.Reload(slide)
	log.Println(slide)
	return c.Render(http.StatusOK, render.JSON(slide))
}

// Edit renders a edit formular for a slide. This function is
// mapped to the path GET /slides/{slide_id}/edit
func (v SlidesResource) Edit(c buffalo.Context) error {
	// Get the DB connection from the context
	tx := c.Value("tx").(*pop.Connection)
	// Allocate an empty Slide
	slide := &models.Slide{}
	err := tx.Find(slide, c.Param("slide_id"))
	if err != nil {
		return err
	}
	// Make slide available inside the html template
	c.Set("slide", slide)
	return c.Render(200, r.HTML("slides/edit.html"))
}

// Update changes a slide in the DB. This function is mapped to
// the path PUT /slides/{slide_id}
func (v SlidesResource) Update(c buffalo.Context) error {

	// Allocate an empty Slide
	slide := &models.Slide{}

	// Bind slide to the html form elements
	err := c.Bind(slide)
	if err != nil {
		return err
	}
	// Get the DB connection from the context
	tx := c.Value("tx").(*pop.Connection)
	// err = tx.Find(slide, c.Param("slide_id"))
	// if err != nil {
	// 	return err
	// }
	imgUUID := uuid.NewV1().String()
	imagename := "slide_images/" + imgUUID
	slide.Image, err = UploadBase64Image(s3bucket, slide.Image, imagename)
	if err != nil {
		log.Printf("b64error err: %#v\n", err)
		return c.Error(http.StatusInternalServerError, errors.WithStack(err))
	}

	verrs, err := tx.ValidateAndUpdate(slide)
	if err != nil {
		return err
	}
	if verrs.HasAny() {
		// Make slide available inside the html template
		c.Set("slide", slide)
		// Make the errors available inside the html template
		c.Set("errors", verrs)
		// Render again the edit.html template that the user can
		// correct the input.
		return c.Render(422, r.HTML("slides/edit.html"))
	}
	// If there are no errors set a success message
	c.Flash().Add("success", "Slide was updated successfully")

	return c.Render(http.StatusOK, render.JSON(slide))
}

// Destroy deletes a slide from the DB. This function is mapped
// to the path DELETE /slides/{slide_id}
func (v SlidesResource) Destroy(c buffalo.Context) error {
	// Get the DB connection from the context
	tx := c.Value("tx").(*pop.Connection)
	// Allocate an empty Slide
	slide := &models.Slide{}
	// To find the Slide the parameter slide_id is used.
	err := tx.Find(slide, c.Param("slide_id"))
	if err != nil {
		return err
	}
	err = tx.Destroy(slide)
	if err != nil {
		return err
	}
	// If there are no errors set a flash message
	// c.Flash().Add("success", "Slide was destroyed successfully")
	return c.Render(http.StatusOK, render.JSON(slide))
}
