#!/usr/bin/env bash

set -e

export NODE_ENV=test

echo "Linting code..."
npx standard

echo "Testing code..."
npx jest

echo "Testing finished"
