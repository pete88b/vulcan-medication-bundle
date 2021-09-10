.ONESHELL:
SHELL := /bin/bash
SRC = $(wildcard ./*.ipynb)

all: vulcan_medication_bundle docs

vulcan_medication_bundle: $(SRC)
	nbdev_build_lib
	touch vulcan_medication_bundle

sync:
	nbdev_update_lib

docs_serve: docs
	cd docs && bundle exec jekyll serve

docs: $(SRC)
	nbdev_build_docs
	touch docs

test:
	nbdev_test_nbs

release: pypi conda_release
	nbdev_bump_version

conda_release:
	fastrelease_conda_package

pypi: dist
	twine upload --repository pypi dist/*

dist: clean
	python setup.py sdist bdist_wheel

clean:
	rm -rf dist