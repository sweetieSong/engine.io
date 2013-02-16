lt: server = $(shell lt --port 8000 | head -n 1 | cut -d ' ' -f 4 &)

lt:
	node client.js ${server} &
