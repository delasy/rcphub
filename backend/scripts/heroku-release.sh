#!/usr/bin/env bash

set -e

export NODE_ENV=production

npx sequelize-cli db:migrate
