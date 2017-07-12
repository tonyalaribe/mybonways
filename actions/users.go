package actions

import (
	"net/http"

	"log"

	"github.com/gobuffalo/buffalo"
	"github.com/gobuffalo/buffalo/render"
	"github.com/markbates/pop"
	"github.com/pkg/errors"
	uuid "github.com/satori/go.uuid"
	"github.com/tonyalaribe/mybonways/models"
	"golang.org/x/crypto/bcrypt"
)

// This file is generated by Buffalo. It offers a basic structure for
// adding, editing and deleting a page. If your model is more
// complex or you need more than the basic implementation you need to
// edit this file.

// Following naming logic is implemented in Buffalo:
// Model: Singular (User)
// DB Table: Plural (Users)
// Resource: Plural (Users)
// Path: Plural (/users)
// View Template Folder: Plural (/templates/users/)

// UsersResource is the resource for the user model
type UsersResource struct {
	buffalo.Resource
}

// List gets all Users. This function is mapped to the path
// GET /users
func (v UsersResource) List(c buffalo.Context) error {
	// Get the DB connection from the context
	tx := c.Value("tx").(*pop.Connection)
	users := &models.Users{}
	// You can order your list here. Just change
	err := tx.All(users)
	// to:
	// err := tx.Order("create_at desc").All(users)
	if err != nil {
		return errors.WithStack(err)
	}
	// Make users available inside the html template
	c.Set("users", users)
	return c.Render(200, r.HTML("users/index.html"))
}

// Show gets the data for one User. This function is mapped to
// the path GET /users/{user_id}
func (v UsersResource) Show(c buffalo.Context) error {
	// Get the DB connection from the context
	tx := c.Value("tx").(*pop.Connection)
	// Allocate an empty User
	user := &models.User{}
	// To find the User the parameter user_id is used.
	err := tx.Find(user, c.Param("user_id"))
	if err != nil {
		return errors.WithStack(err)
	}
	// Make user available inside the html template
	c.Set("user", user)
	return c.Render(200, r.HTML("users/show.html"))
}

// New renders the formular for creating a new user.
// This function is mapped to the path GET /users/new
func (v UsersResource) New(c buffalo.Context) error {
	// Make user available inside the html template
	c.Set("user", &models.User{})
	return c.Render(200, r.HTML("users/new.html"))
}

// Create adds a user to the DB. This function is mapped to the
// path POST /users
func (v UsersResource) Create(c buffalo.Context) error {
	// Allocate an empty User
	user := &models.User{}
	// Bind user to the html form elements
	err := c.Bind(user)
	if err != nil {
		return errors.WithStack(err)
	}

	tx := c.Value("tx").(*pop.Connection)
	err = tx.Where("email = ?", user.Email).First(user)
	if err == nil {
		log.Println("User exists: ", user)
		return c.Render(http.StatusBadRequest, render.JSON(struct{ Error string }{Error: "Email already Exists"}))
	}

	// VERIFICATION...
	verifyModel := &models.VerificationCode{}
	verifyModel.CompanyID = user.Email
	verifyModel.Code = uuid.NewV1().String()
	log.Printf("\nUser Verification code: %s\n", verifyModel.Code)

	err = tx.Create(verifyModel)
	if err != nil {
		return c.Error(http.StatusBadRequest, errors.New("Invalid Request"))
	}

	// log.Println("There is no error: user: ", user)
	user.Approved = false
	user.UserPassword, err = bcrypt.GenerateFromPassword([]byte(user.Password), bcrypt.DefaultCost)
	if err != nil {
		return errors.WithStack(err)
	}
	// user.Password = ""
	user.Image = "-"
	c.Logger().Infof("User: %#v \n ", user)

	user.Provider = "email"

	verrs, err := tx.ValidateAndCreate(user, "Password", "Image")
	if err != nil {
		return errors.WithStack(err)
	}

	if verrs.HasAny() {
		log.Println(verrs.Error())
		return c.Error(http.StatusBadRequest, errors.New("Invalid Request"))
	}

	return c.Render(200, render.JSON(user))
}

func VerifyUser(c buffalo.Context) error {
	code := c.Param("code")
	log.Printf("code: %#v \n ", code)
	v := models.VerificationCode{}
	tx := c.Value("tx").(*pop.Connection)
	query := pop.Q(tx)
	query = tx.Where("code = ?", code)

	err := query.First(&v)
	if err != nil {
		return c.Error(http.StatusOK, errors.WithStack(err))
	}

	log.Printf("verification: %#v \n ", v)

	query2 := pop.Q(tx)
	query2 = tx.Where("email = ?", v.CompanyID)

	u := &models.User{}
	err = query2.First(u)
	if err != nil {
		return c.Error(http.StatusOK, errors.WithStack(err))
	}

	u.Approved = true
	err = tx.Update(u)
	log.Println(err)
	if err != nil {
		return c.Error(http.StatusOK, errors.WithStack(err))
	}

	err = tx.Reload(u)
	if err != nil {
		return errors.WithStack(err)
	}

	return c.Render(200, render.JSON(u))
}

// Edit renders a edit formular for a user. This function is
// mapped to the path GET /users/{user_id}/edit
func (v UsersResource) Edit(c buffalo.Context) error {
	// Get the DB connection from the context
	tx := c.Value("tx").(*pop.Connection)
	// Allocate an empty User
	user := &models.User{}
	err := tx.Find(user, c.Param("user_id"))
	if err != nil {
		return errors.WithStack(err)
	}
	// Make user available inside the html template
	c.Set("user", user)
	return c.Render(200, r.HTML("users/edit.html"))
}

// Update changes a user in the DB. This function is mapped to
// the path PUT /users/{user_id}
func (v UsersResource) Update(c buffalo.Context) error {
	// Get the DB connection from the context
	tx := c.Value("tx").(*pop.Connection)
	// Allocate an empty User
	user := &models.User{}
	err := tx.Find(user, c.Param("user_id"))
	if err != nil {
		return errors.WithStack(err)
	}
	// Bind user to the html form elements
	err = c.Bind(user)
	if err != nil {
		return errors.WithStack(err)
	}
	verrs, err := tx.ValidateAndUpdate(user)
	if err != nil {
		return errors.WithStack(err)
	}
	if verrs.HasAny() {
		// Make user available inside the html template
		c.Set("user", user)
		// Make the errors available inside the html template
		c.Set("errors", verrs)
		// Render again the edit.html template that the user can
		// correct the input.
		return c.Render(422, r.HTML("users/edit.html"))
	}
	// If there are no errors set a success message
	c.Flash().Add("success", "User was updated successfully")
	// and redirect to the users index page
	return c.Redirect(302, "/users/%s", user.ID)
}

// Destroy deletes a user from the DB. This function is mapped
// to the path DELETE /users/{user_id}
func (v UsersResource) Destroy(c buffalo.Context) error {
	// Get the DB connection from the context
	tx := c.Value("tx").(*pop.Connection)
	// Allocate an empty User
	user := &models.User{}
	// To find the User the parameter user_id is used.
	err := tx.Find(user, c.Param("user_id"))
	if err != nil {
		return errors.WithStack(err)
	}
	err = tx.Destroy(user)
	if err != nil {
		return errors.WithStack(err)
	}
	// If there are no errors set a flash message
	c.Flash().Add("success", "User was destroyed successfully")
	// Redirect to the users index page
	return c.Redirect(302, "/users")
}
