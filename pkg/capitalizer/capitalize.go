package capitalizer

import (
	"fmt"
	"os"
	"path/filepath"
	"strings"

	"golang.org/x/text/cases"
	"golang.org/x/text/language"
	// "github.com/kodmm/change_file_architecture/internal/extention"
)

func RenameTitle(target string) {
	filepath.Walk(target, func(path string, info os.FileInfo, err error) error {
		if info.IsDir() {
			return nil
		}
		if err != nil {
			return nil
		}
		var base_path string = filepath.Dir(path)
		var name string = info.Name()
		if strings.Contains(name, "index") {
			return nil
		}
		filename := NewFileName(name)
		// filename := extention.FixedExtention(name)

		if err := os.Rename(path, base_path+"/"+filename); err != nil {
			fmt.Println("error", err)
		}
		return nil
	})
}

func NewFileName(name string) string {
	c := cases.Title(language.English, cases.NoLower)
	new_name := c.String(name)
	return new_name
}
