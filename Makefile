SHELL := /bin/bash
.PHONY: clean clean-build clean-pyc clean-test coverage dist docs help install lint lint/flake8 lint/black

.DEFAULT_GOAL := help

WHOMBAT_BACKEND_DEV_PORT ?= 8000

define BROWSER_PYSCRIPT
import os, webbrowser, sys

from urllib.request import pathname2url

webbrowser.open("file://" + pathname2url(os.path.abspath(sys.argv[1])))
endef
export BROWSER_PYSCRIPT

define PRINT_HELP_PYSCRIPT
import re, sys

for line in sys.stdin:
	match = re.match(r'^([a-zA-Z_-]+):.*?## (.*)$$', line)
	if match:
		target, help = match.groups()
		print("%-20s %s" % (target, help))
endef
export PRINT_HELP_PYSCRIPT

BROWSER := python -c "$$BROWSER_PYSCRIPT"

help:
	@python -c "$$PRINT_HELP_PYSCRIPT" < $(MAKEFILE_LIST)

clean: clean-build clean-pyc clean-test clean-docs ## remove all build, test, coverage and Python artifacts

clean-build: ## remove build artifacts
	rm -fr build/
	rm -fr dist/
	rm -fr .eggs/
	find . -name '*.egg-info' -exec rm -fr {} +
	find . -name '*.egg' -exec rm -f {} +

clean-pyc: ## remove Python file artifacts
	find . -name '*.pyc' -exec rm -f {} +
	find . -name '*.pyo' -exec rm -f {} +
	find . -name '*~' -exec rm -f {} +
	find . -name '__pycache__' -exec rm -fr {} +

clean-test: ## remove test and coverage artifacts
	rm -fr .tox/
	rm -f .coverage
	rm -fr htmlcov/
	rm -fr .pytest_cache

clean-docs: ## remove docs artifacts
	rm -fr site/

lint/flake8: ## check style with flake8
	flake8 src tests

lint/black: ## check style with black
	black --check src tests

lint/pylint: ## check style with pylint
	pylint src tests

lint/pycodestyle: ## check style with pycodestyle
	pycodestyle src

lint/pydocstyle: ## check style with pydocstyle
	pydocstyle src

lint/pyright: ## check style with pyright
	pyright src

lint: lint/flake8 lint/black lint/pycodestyle lint/pydocstyle lint/pylint lint/pyright ## check style

format: ## format code with black
	black src tests
	isort src tests

test: ## run tests quickly with the default Python
	pytest

test-all: ## run tests on every Python version with tox
	tox

coverage: ## check code coverage quickly with the default Python
	coverage run --source whombat -m pytest
	coverage report -m
	coverage html
	$(BROWSER) htmlcov/index.html

docs:
	mkdocs build
	URL="site/index.html"; xdg-open $$URL || sensible-browser $$URL || x-www-browser $$URL || gnome-open $$URL

servedocs: ## compile the docs watching for changes
	URL="http://localhost:8000/whombat/"; xdg-open $$URL || sensible-browser $$URL || x-www-browser $$URL || gnome-open $$URL
	@$(ENV_PREFIX)mkdocs serve

release: dist ## package and upload a release
	twine upload dist/*

install: clean ## install the package to the active Python's site-packages
	pip install .

install-dev: clean ## install the package to the active Python's site-packages
	pip install -e .

install-dev-no-deps: clean ## install the package to the active Python's site-packages
	pip install -e . --no-deps

dev:
	uvicorn src.whombat.app:app --reload --port $(WHOMBAT_BACKEND_DEV_PORT)
