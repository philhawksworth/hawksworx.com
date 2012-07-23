# Fabric for deploying hawksworx.com on Github Pages
# import os
import datetime

from fabric.colors import yellow
from fabric.api import local, env

tmp_time = datetime.datetime.now()
env.time = tmp_time.strftime("%Y%m%d_%H%M%S")


def deploy():
    """Deploy to github pages"""
    local('jekyll --no-auto --no-server')
    local('git add .')
    local('git commit -m "deploying latest build as at %(time)s"' %env)
    local('git branch -D gh-pages')
    local('git checkout -b gh-pages')
    local('git filter-branch -f --subdirectory-filter -f site')
    local('git push origin ghp-ages')
    local('git checkout master')
    print yellow("Done?")
