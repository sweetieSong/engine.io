
TESTS = test/*.js
BENCHMARKS = $(shell find bench -type f ! -name 'runner.js')
REPORTER = dot
client = $(shell lt --port 8080 | head -n 1 | cut -d ' ' -f 4 &)

test:
	@./node_modules/.bin/mocha \
		--require test/common \
		--reporter $(REPORTER) \
		--slow 500ms \
		--bail \
		$(TESTS)

acceptance:
	node server/server.js &
	make -C client lt &
	node cloud.js ${client}
	killall -9 node

test-cov: lib-cov
	EIO_COV=1 $(MAKE) test REPORTER=html-cov > coverage.html

lib-cov:
	jscoverage --no-highlight lib lib-cov

bench:
	@node $(PROFILEFLAGS) bench/runner.js $(BENCHMARKS)

.PHONY: test test-cov bench
