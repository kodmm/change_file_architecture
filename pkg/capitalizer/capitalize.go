package capitalizer

import (
	"fmt"
	"os"
	"path/filepath"
	"strings"
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
	tmp_name := strings.ReplaceAll(name, ".", "_")
	tmp_name = strings.Title(tmp_name)
	var new_name string = strings.ReplaceAll(tmp_name, "_", ".")
	return new_name
}
