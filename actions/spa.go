package actions

import "github.com/gobuffalo/buffalo"

// HomeHandler is a default handler to serve up
// a home page.
func HomeHandler(c buffalo.Context) error {
	return c.Render(200, spa.HTML("index.html"))
}

func AdminHandler(c buffalo.Context) error {
	return c.Render(200, spa.HTML("admin.html"))
}

func MerchantHandler(c buffalo.Context) error {
	return c.Render(200, spa.HTML("merchant.html"))
}

func UserHandler(c buffalo.Context) error {
	return c.Render(200, spa.HTML("user.html"))
}
