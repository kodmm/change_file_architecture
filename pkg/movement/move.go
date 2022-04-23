package movement

import (
	"fmt"
	"io"
	"os"
	"path/filepath"
	"strings"
)

func MoveFile(source, target string, fatalErr error) {
	filepath.Walk(target, func(path string, info os.FileInfo, err error) error {
		var name []string = strings.Split(info.Name(), ".")
		if info.IsDir() {
			return nil
		}
		if err != nil {
			return nil
		}
		if name[0] == "index" {
			return nil
		}
		var base_path string = filepath.Dir(path)
		if err := CustomCopy(source, base_path, name[0]); err != nil {
			fatalErr = fmt.Errorf("err: %s", err)
		}
		return nil
	})
}

func CustomCopy(source, dest, name string) error {
	var ext string = ".module.css"
	src_path := source + name + ext
	dest_path := dest + "/" + name + ext

	src_file, err := os.Open(src_path)
	if err != nil {
		return fmt.Errorf("src_file: %s \n", err)
	}
	defer src_file.Close()

	dest_file, err := os.Create(dest_path)
	if err != nil {
		return fmt.Errorf("dest_file: %s \n", err)
	}
	defer dest_file.Close()

	io.Copy(dest_file, src_file)
	defer os.Remove(src_path)
	// fmt.Println("src_path: %v", src_path)
	// fmt.Println("dest_path: %v", dest_path)

	return nil
}
