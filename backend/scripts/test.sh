#!/usr/bin/env bash

set -e

export NODE_ENV=test

echo "Linting code..."
npx standard

echo "Setting up database..."
npx sequelize db:migrate > /dev/null
npx sequelize db:seed:all > /dev/null

echo "Testing code..."
npx jest

echo "Tearing down database..."
npx sequelize db:seed:undo:all > /dev/null
npx sequelize db:migrate:undo:all > /dev/null

echo "Testing finished"
