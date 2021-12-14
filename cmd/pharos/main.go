package main

import (
	"pharos/services/cli"
	"pharos/services/conf"
	"pharos/services/server"
)

func main() {
	env := cli.Parse()
	server.Start(conf.NewConfig(env))
}
