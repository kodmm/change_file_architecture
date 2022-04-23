package extention

import (
	"strings"
)

func FixedExtention(name string) string {
	tmp_name := strings.Split(name, ".")
	for i, v := range tmp_name[1:] {
		tmp_name[i+1] = strings.ToLower(v)
	}
	return strings.Join(tmp_name, ".")
}
