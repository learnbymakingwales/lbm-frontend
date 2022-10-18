.PHONY: package

# current git branch
BRANCH := $(shell git rev-parse --abbrev-ref HEAD)

init::
	pip install --upgrade pip	
	pip install -e .[testing]
	npm install

build:
	npm run build

package:
	npm run build:package

test-asset-build:
	npm run build:stylesheets

lint:	black-check flake8

black:
	black .

black-check:
	black --check .

flake8:
	flake8 .

commit-package::
	git add package/lbm-frontend
	git diff --quiet && git diff --staged --quiet || (git commit -m "Rebuilt package $(shell date +%F)"; git push origin $(BRANCH))
