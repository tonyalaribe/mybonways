package actions

import (
	"log"
	"net/http"
	"time"

	"golang.org/x/crypto/bcrypt"

	jwt "github.com/dgrijalva/jwt-go"
	"github.com/gobuffalo/buffalo"
	"github.com/gobuffalo/buffalo/render"
	"github.com/markbates/pop"
	"github.com/pkg/errors"
	"github.com/tonyalaribe/mybonways/models"
)

type UserLoginStruct struct {
	Email    string `json:"email"`
	Password string `json:"user_password"`
}

func UserLogin(c buffalo.Context) error {
	// get the post parameters...
	login := &UserLoginStruct{}
	err := c.Bind(login)
	if err != nil {
		return errors.WithStack(err)
	}
	// check if the email and password is in the db...
	log.Println("Login: ", login)

	tx := c.Value("tx").(*pop.Connection)
	query := pop.Q(tx)
	query = tx.Where("email = ?", login.Email)
	u := models.User{}

	err = query.First(&u)
	if err != nil {
		log.Printf("first error: %#v \n ", u)
		log.Println("err", err)
		return c.Error(http.StatusNotFound, errors.WithStack(err))
	}

	// check if the password is correct:
	err = bcrypt.CompareHashAndPassword(u.UserPassword, []byte(login.Password))
	if err != nil {
		log.Printf("first error: %#v \n ", u)
		log.Println("err", err)
		return c.Error(http.StatusNotAcceptable, errors.WithStack(err))
	}

	log.Printf("Login User: %#v \n ", u)
	/// since the person is in the database...generate a token for him/her
	token, err := GenerateUserJWT(u)
	if err != nil {
		log.Println("GenJwt error: ", err)
		return c.Error(http.StatusInternalServerError, errors.WithStack(err))
	}

	cookie := &http.Cookie{
		Name:  "X-USER-TOKEN",
		Value: token["token"].(string),
		Path:  "/",
	}

	http.SetCookie(c.Response(), cookie)
	return c.Render(http.StatusOK, render.JSON(token))
}

// GenerateUserJWT generates a jwt token for the user
func GenerateUserJWT(u models.User) (map[string]interface{}, error) {
	claims := jwt.MapClaims{}

	resp := make(map[string]interface{})

	// create claims
	claims["user"] = u
	claims["UserEmail"] = u.Email

	// set the expiration to 1 year in milliseconds
	claims["exp"] = time.Now().Add(time.Hour * 24 * 30 * 12).Unix()

	t := jwt.NewWithClaims(jwt.GetSigningMethod("RS256"), claims)

	// pub, err := jwt.ParseRSAPrivateKeyFromPEM(config.Get().Encryption.Private)
	pub, err := jwt.ParseRSAPrivateKeyFromPEM(encryption.Bytes("private.pem"))
	if err != nil {
		return resp, err
	}
	tokenString, err := t.SignedString(pub)
	if err != nil {
		return resp, err
	}

	resp["user"] = u
	resp["message"] = "Token successfully generated"
	resp["token"] = tokenString

	return resp, err
}
