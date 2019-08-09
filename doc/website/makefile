# 环境变量需要 export，因为要给子进程 npm 和 crowdin 继承使用。
export CROWDIN_DOCUSAURUS_PROJECT_ID=bdtgzj
export CROWDIN_DOCUSAURUS_API_KEY=23a0fd0a342f4d5bdbc2d34fcfbeb596

# i18n (crowdin translate)
i18n-init: # generate website/pages/en/help-with-translations.js website/languages.js crowdin.yaml
	npm run examples translations
install-crowdin:
	brew install crowdin
gather-page-i18n: # generate website/i18n/en.json
	npm run write-translations
crowdin-upload:
	npm run crowdin-upload
crowdin-download:
	npm run crowdin-download

# i18n (self translate)
copy-docs:
	mkdir -p translated_docs/zh-CN/
	cp -R ../docs/* translated_docs/zh-CN/
copy-strings: # generate website/i18n/en.json
	npm run write-translations
	cp i18n/en.json i18n/zh-CN.json

# versioning
create-start-version: # generate pages/en/versions.js
	npm run examples versions
# make create-new-version ver=1.0.0
create-new-version: # generate website/versions.json website/versioned_docs website/versioned_sidebars
	npm run version $(ver)

# 
start:
	npm run start
build:
	npm run build

