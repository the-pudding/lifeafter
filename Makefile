# Fill in once the real pudding.cool publish path is decided (e.g.
# /2026/08/life-after-death) — everything below reads from this one place,
# both the build's own BASE_PATH (see svelte.config.js) and the S3/
# CloudFront targets, so there's nowhere else that needs to stay in sync.
PUDDING_PATH = /year/month/name

.PHONY: github pudding staging production protect

github:
	BASE_PATH=/lifeafter npm run build
	rm -rf docs
	cp -r build docs
	touch docs/.nojekyll
	git add -A
	git commit -m "update github pages"
	git push

pudding:
	BASE_PATH=$(PUDDING_PATH) npm run build
	aws s3 sync build s3://pudding.cool$(PUDDING_PATH) --delete --cache-control 'max-age=31536000'
	aws cloudfront create-invalidation --distribution-id E13X38CRR4E04D --paths '$(PUDDING_PATH)*'

staging: github

production: pudding

protect:
	cd build && npx staticrypt --short index.html -p $(shell grep PASSWORD .env | cut -d '=' -f2) -d .
