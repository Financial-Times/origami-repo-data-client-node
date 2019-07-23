# Origami Service Makefile
# ------------------------
# This section of the Makefile should not be modified, it includes
# commands from the Origami service Makefile.
# https://github.com/Financial-Times/origami-service-makefile
include node_modules/@financial-times/origami-service-makefile/index.mk
# [edit below this line]
# ------------------------


# Meta tasks
# ----------

.PHONY: docs


# Documentation tasks
# -------------------

# Regenerate documentation
docs:
	@rm -rf docs
	@npx jsdoc --configure .jsdoc.json
	@$(TASK_DONE)

# Documentation pre-commit hook
docs-precommit: docs
	@git add docs

# Set up documentation pre-commit hook
.git/hooks/pre-commit:
	@if [ -d .git/hooks ]; then \
		echo "#!/bin/sh\nmake docs-precommit" > .git/hooks/pre-commit; \
		chmod +x .git/hooks/pre-commit; \
	fi


# npm publishing tasks
# --------------------

# Publish the module to npm
npm-publish:
	npm-prepublish --verbose
	npm publish --access public
