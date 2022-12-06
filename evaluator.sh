#!/bin/bash

# http://redsymbol.net/articles/unofficial-bash-strict-mode/
set -uo pipefail

main() {
    local repo_url=$1
    local student_name=$2
    local app_type=$3
    local working_dir="./evaluations/${student_name}"
    (
        git clone "${repo_url}" "${working_dir}"
        cp test-runner.js "${working_dir}"
        cp ./env/"${app_type}"/.env.test "${working_dir}"
        psql -f ./setup-db/"${app_type}"/setup-test-db.sql
        cd "${working_dir}"
        npm install
        NODE_ENV=test app_type="${app_type}" node test-runner.js >> feedback.md
    )
}

main "${@}"