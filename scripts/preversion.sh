#!/bin/bash -e
cd "$( dirname "${BASH_SOURCE[0]}" )"/..

rm -rf ./dist/*

echo ""
echo "FRIGGING BOOTSTRAP: COMPILING DEV RELEASE"
echo "======================================================="
FRIG_ENV="production" webpack --progress --bail
