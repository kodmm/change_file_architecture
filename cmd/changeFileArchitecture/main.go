package main

import (
	"errors"
	"flag"
	"fmt"
	"log"
	"strings"

	"github.com/kodmm/change_file_architecture/pkg/capitalizer"
	"github.com/kodmm/change_file_architecture/pkg/movement"
)

func main() {
	var (
		capitalize string = "capitalize"
		move       string = "move"
	)
	var fatalErr error
	defer func() {
		if err := recover(); err != nil {
			fmt.Println(fmt.Errorf("適切なpathを指定してください。"))
			fmt.Println(errors.New(fmt.Sprintf("panic %s", err)))
		}
		if fatalErr != nil {
			flag.PrintDefaults()
			log.Fatalln(fatalErr)
		}
	}()
	flag.Parse()
	args := flag.Args()
	fmt.Printf("args: %#v \n", args)

	if len(args) < 1 || args[0] != capitalize && args[0] != move {
		fatalErr = errors.New("エラー: コマンド引数を指定してください。 'capitalize or move' ")
		return
	}

	switch strings.ToLower(args[0]) {
	case "capitalize":
		if len(args) < 2 {
			fatalErr = errors.New("エラー: targetを指定してください。")
			return
		}
		target := args[1]
		capitalizer.RenameTitle(target)
	case "move":
		if len(args) < 2 {
			fatalErr = errors.New("エラー: source を指定してください。")
			return
		}
		if len(args) < 3 {
			fatalErr = errors.New("エラー: target を指定してください。")
			return
		}
		var source string
		if strings.HasSuffix(args[1], "/") {
			source = args[1]
		} else {
			source = args[1] + "/"
		}
		target := args[2]
		movement.MoveFile(source, target, fatalErr)
	}

}
