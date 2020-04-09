install-reveal:
	git clone https://github.com/hakimel/reveal.js.git
	cd reveal.js
#	PUPPETEER_SKIP_CHROMIUM_DOWNLOAD=true; npm install --verbose
	set PUPPETEER_SKIP_CHROMIUM_DOWNLOAD true
	npm install --verbose

link-resource:
	ln -s ~/Downloads/yxd/learning-git/reveal-js/* ~/Downloads/yxd/reveal.js/
	ln -s ~/Downloads/yxd/learning-git/reveal-js/css/common.css ~/Downloads/yxd/reveal.js/css/
	ln -s /Volumes/TF64/Learning/learning-git/reveal-js/* /Volumes/TF64/tmp/program/reveal.js/
	ln -s /Volumes/TF64/Learning/learning-git/reveal-js/css/common.css /Volumes/TF64/tmp/program/reveal.js/css/

start:
	npm start

curl:
	curl http://localhost:8000/lego-education/grades-1-2/wedo-2-science/glowing-snail/
