TESTS_CLOUD = test/server_test/*.js
TESTS = test/*.js
BENCHMARKS = $(shell find bench -type f ! -name 'runner.js')
REPORTER = dot

test:
	@./node_modules/.bin/mocha \
		--require test/common \
		--reporter $(REPORTER) \
		--slow 500ms \
		--bail \
		--globals ___eio,document \
		$(TESTS)

test2:
	@./node_modules/.bin/mocha \
		--require test/common \
		--reporter $(REPORTER) \
		--slow 500ms \
		--bail \
		test/cloud.js ${tid} ${url}
	read -p "All tests are done, press [enter] to kill all node instances"
	killall -9 node
		
build:
	@component install LearnBoost/engine.io-client
	@component install visionmedia/mocha
	@component build --standalone eio-test
	@mv build/build.js test/client_test/eio-test.js
	@rm component.json
	@rm -rf build
	@rm -rf components

test3:
	@./node_modules/.bin/mocha \
		--reporter $(REPORTER) \
		--slow 500ms \
		--bail \
		test/cloud_test/take_prelim.js

test-cov: lib-cov
	EIO_COV=1 $(MAKE) test REPORTER=html-cov > coverage.html

lib-cov:
	jscoverage --no-highlight lib lib-cov

bench:
	@node $(PROFILEFLAGS) bench/runner.js $(BENCHMARKS)

.PHONY: test test-cov bench
