#!/usr/bin/make -f
# -*- makefile -*-
#

SHELL = bash -e
BASEDIR = $(shell pwd)


# This command builds the docker image

image:

	@docker build --rm -t luisalejandro/huntingbears.com.ve:latest .


# This command opens a terminal inside the docker image

console:

	@docker run --rm -it -v $(BASEDIR):/home/travis/app \
		luisalejandro/huntingbears.com.ve:latest bash

# This command searches for image files inside the local _posts folder
# Then, it downloads it if the image is hosted in a different domain
# Then, it resizes to 1000px max and converts it to jpg
# Finally, it renames the image according to the post where it's located
# and saves it in the static folder with the following pattern:
# /static/img/posts/[article_id]/[post_name]__[image_index].jpg

import:

	@docker run --rm -it -v $(BASEDIR):/home/travis/app \
		luisalejandro/huntingbears.com.ve:latest python scripts/import.py


# This command regenerates the json index of data from the articles
# It queries Facebook, Twitter and Google+ for number of shares and Disqus
# for comments count.
# It must be executed every time a new post is published

index:

	@docker run --rm -it -v $(BASEDIR):/home/travis/app \
		luisalejandro/huntingbears.com.ve:latest python scripts/index.py


# This command compresses assets files
# It must be executed everytime an asset is modified

compress:

	@docker run --rm -it -v $(BASEDIR):/home/travis/app \
		luisalejandro/huntingbears.com.ve:latest python scripts/compress.py

# This command explores all posts inside the _posts folder and creates
# all the files necessary to display categories and tags

categorize:

	@docker run --rm -it -v $(BASEDIR):/home/travis/app \
		luisalejandro/huntingbears.com.ve:latest python scripts/categorize.py


# This command groups all other commands that updates all assets

process: clean import index compress categorize


# This command generates the last 12 posts with jekyll

generate:

	@bundler exec jekyll build --limit_posts 12


# This command generates a new draft
# Must be executed like this:
# make draft TITLE="[TITLE]"

draft:

	@docker run --rm -it -v $(BASEDIR):/home/travis/app \
		luisalejandro/huntingbears.com.ve:latest python scripts/draft.py "$(TITLE)"


# This command publishes a draft
# Must be executed like this:
# make publish DRAFT="[DRAFT]"

publish: clean

	@docker run --rm -it -v $(BASEDIR):/home/travis/app \
		luisalejandro/huntingbears.com.ve:latest python scripts/publish.py "$(DRAFT)"
	@docker run --rm -it -v $(BASEDIR):/home/travis/app \
		luisalejandro/huntingbears.com.ve:latest python scripts/import.py
	@docker run --rm -it -v $(BASEDIR):/home/travis/app \
		luisalejandro/huntingbears.com.ve:latest python scripts/index.py
	@docker run --rm -it -v $(BASEDIR):/home/travis/app \
		luisalejandro/huntingbears.com.ve:latest python scripts/compress.py
	@docker run --rm -it -v $(BASEDIR):/home/travis/app \
		luisalejandro/huntingbears.com.ve:latest python scripts/categorize.py


# This command deletes all assets

clean:

	@rm -rf _site _includes/js/min _includes/css/min cat tag


# This command searches for broken images & links

test:

	@docker run --rm -it -v $(BASEDIR):/home/travis/app \
		luisalejandro/huntingbears.com.ve:latest python scripts/test_links.py
	@docker run --rm -it -v $(BASEDIR):/home/travis/app \
		luisalejandro/huntingbears.com.ve:latest python scripts/test_images.py