#!/usr/bin/make -f
# -*- makefile -*-
#

SHELL = sh -e

all: compress categorize

compress:

	@python compress.py

categorize:

	@python categorize.py

generate:

	@jekyll build --limit_posts 12

newdraft:

	@python newdraft.py "$(TITLE)"

publish:

	@python publish.py "$(DRAFT)"

import_images:

	@python import_images.py

test_links:

	# @jekyll build
	@python test_links.py
