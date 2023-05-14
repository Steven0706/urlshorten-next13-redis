#!/bin/bash

# wait for Redis server to start
sleep 10

companies=("Google" "Amazon" "Facebook" "Apple" "Microsoft" "IBM" "Oracle" "Intel" "Cisco" "Tesla" "Alibaba" "Netflix" "Twitter" "Adobe" "Salesforce" "Uber" "Spotify" "Zoom" "Snapchat" "Airbnb")
urls=("https://www.google.com" "https://www.amazon.com" "https://www.facebook.com" "https://www.apple.com" "https://www.microsoft.com" "https://www.ibm.com" "https://www.oracle.com" "https://www.intel.com" "www.cisco.com" "www.tesla.com" "www.alibaba.com" "www.netflix.com" "www.twitter.com" "www.adobe.com" "www.salesforce.com" "www.uber.com" "www.spotify.com" "www.zoom.us" "www.snapchat.com" "www.airbnb.com")

for ((i=0;i<${#companies[@]};++i)); do
    curl --location 'http://localhost:3000/api/urls/new' \
    --header 'Content-Type: application/json' \
    --data '{
        "longUrl": "'"${urls[i]}"'",
        "title": "'"${companies[i]}"'"
    }'
    sleep 1
done
