package main

import (
	"flag"
	"fmt"
	"log"
	"os"
	"path/filepath"
	"strings"
)

func main() {
	var fatalErr error
	var (
		target = flag.String("target", "../test", "ファイル名をCaptilizeする階層")
	)
	flag.Parse()

	defer func() {
		if fatalErr != nil {
			fmt.Println("defer")
			flag.PrintDefaults()
			log.Fatalln(fatalErr)
		}
	}()
	flag.Parse()

	fmt.Println("target", *target)
	RenameTitle(*target)

}

func RenameTitle(target string) {
	filepath.Walk(target, func(path string, info os.FileInfo, err error) error {
		if info.IsDir() {
			return nil
		}
		if err != nil {
			return nil
		}
		var name string = info.Name()
		var base_path string = filepath.Dir(path)

		if strings.Contains(name, "index") {
			return nil
		}
		if err := os.Rename(path, base_path+"/"+strings.Title(name)); err != nil {
			fmt.Println("error", err)
		}
		return nil
	})
}
