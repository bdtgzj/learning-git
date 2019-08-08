# 环境变量需要 export，因为要给子进程 npm 和 crowdin 继承使用。
export CROWDIN_DOCUSAURUS_PROJECT_ID=bdtgzj
export CROWDIN_DOCUSAURUS_API_KEY=23a0fd0a342f4d5bdbc2d34fcfbeb596

# i18n
install-crowdin:
	brew install crowdin
gather-page-i18n:
	npm run write-translations
crowdin-upload:
	npm run crowdin-upload
crowdin-download:
	npm run crowdin-download

# versioning
create-start-version:
	npm run examples versions
create-new-version: # make create-new-version ver=1.0.0
	npm run version $(ver)

