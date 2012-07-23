# Fabric for deploying hawksworx.com on Github Pages
# import os
import datetime

from fabric.colors import yellow
from fabric.api import local, env

tmp_time = datetime.datetime.now()
env.time = tmp_time.strftime("%Y%m%d_%H%M%S")


def deploy():
    """Deploy to github pages"""
    local('git checkout gh-pages')
    local('cp -r _site/* . && rm -rf _site/ && touch .nojekyll')

    local('git add .')
    local('git commit -m "deploying latest build as at %(time)s"' %env)
    local('git push origin gh-pages')
    # local('git checkout master')
    print yellow("Done?")
