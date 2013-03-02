TESTS = test/*.js
BENCHMARKS = $(shell find bench -type f ! -name 'runner.js')
REPORTER = dot

test:
	@./node_modules/.bin/mocha \
		--require test/common \
		--reporter $(REPORTER) \
		--slow 500ms \
		--bail \
		$(TESTS)

		
test-local:
	@node \
		test/cloud_test/take_prelim.js \
		local

test-cloud:
	@node \
		test/cloud_test/take_prelim.js 

build-test:
	@make -C test/cloud_test build
	@make -C test/cloud_test build-clean

build-clean: 
	@make -C test/cloud_test build-clean

test-cov: lib-cov
	EIO_COV=1 $(MAKE) test REPORTER=html-cov > coverage.html

lib-cov:
	jscoverage --no-highlight lib lib-cov

bench:
	@node $(PROFILEFLAGS) bench/runner.js $(BENCHMARKS)

.PHONY: test test-cov bench
