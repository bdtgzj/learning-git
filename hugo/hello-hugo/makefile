HUGO_HOME=/usr/local
HUGO=$(HUGO_HOME)/bin/hugo

install:
	brew update && brew install hugo

new-site-skeleton:
	hugo new site [sitePath]

new-file:
	hugo new <SECTIONNAME>/<FILENAME>.<FORMAT>

start-server:
	hugo server -D

config:
	hugo config

curl:
	curl http://localhost:1313/

generate:
	rm -rf public && hugo