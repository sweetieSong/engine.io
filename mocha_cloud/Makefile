client = $(shell lt --port 8000 | head -n 1 | cut -d ' ' -f 4 &)

acceptance:
	node server.js &
	node cloud.js ${client}
	killall -9 node
