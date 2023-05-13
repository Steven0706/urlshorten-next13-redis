#!/bin/bash

# wait for Redis server to start
sleep 10

# send FT.CREATE command
redis-cli FT.CREATE myIdx ON HASH PREFIX 1 doc: SCHEMA title TEXT WEIGHT 5.0 body TEXT url TEXT

echo "FT.CREATE command sent successfully"

# inject some mock data to redis
