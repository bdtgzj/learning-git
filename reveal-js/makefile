install-reveal:
	git clone https://github.com/hakimel/reveal.js.git
	cd reveal.js
#	PUPPETEER_SKIP_CHROMIUM_DOWNLOAD=true; npm install --verbose
	set PUPPETEER_SKIP_CHROMIUM_DOWNLOAD true
	npm install --verbose

link-resource:
	ln -s /Volumes/TF64/Learning/learning-git/reveal-js/* /Volumes/TF64/tmp/program/reveal.js/
	ln -s /Volumes/TF64/Learning/learning-git/reveal-js/css/common.css /Volumes/TF64/tmp/program/reveal.js/css/

# need node 10
NODE10_HOME=/usr/local/node-v10.14.1-darwin-x64
set-env: # for current shell
	set PATH $NODE10_HOME/bin $PATH
	#set PATH $(PATH) $(NODE10_HOME)/bin

start:
	npm start

curl:
	curl http://localhost:8000/lego-education/grades-1-2/wedo-2-science/glowing-snail/

remove-audio:
	ffmpeg -i change-direction.mp4 -vcodec copy -an ../change-direction.mp4
