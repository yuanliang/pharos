#! /bin/bash

# default ENV is dev
env=dev

while test $# -gt 0; do
  case "$1" in
    -env)
      shift
      if test $# -gt 0; then
        env=$1
      fi
      # shift
      ;;
    *)
    break
    ;;
  esac
done

cd ../../pharos
source .env
go build -o cmd/pharos/pharos cmd/pharos/main.go
cmd/pharos/pharos -env $env &
