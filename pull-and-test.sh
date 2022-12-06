#!/bin/bash

set -euo pipefail

main() {
    local student_name=$1
    local app_type=$2
    local working_dir="./evaluations/${student_name}"
    (
        psql -f ./setup-db/"${app_type}"/setup-test-db.sql
        cd "${working_dir}"
        git pull origin main
        NODE_ENV=test app_type="${app_type}" node test-runner.js > test-report.md
    )
}

main "${@}"