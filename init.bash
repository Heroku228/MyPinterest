#!/bin/bash

GREEN='\033[0;32m'
NC='\033[0m'

echo -e "${GREEN} Run backend ... ${NC}"
(cd server && npm run start:dev) &

echo -e "${GREEN} Waiting, while backend started on port: 3000... ${NC}"

while ! nc -z localhost 3000; do
	sleep 1
done


echo -e "${GREEN} Backend runned on port 3000. Run fronted... ${NC}"
(cd client && npm run dev)
