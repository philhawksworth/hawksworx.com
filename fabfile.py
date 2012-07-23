# Fabric for deploying the spritecow app
# import os
import datetime

from fabric.colors import yellow
from fabric.api import local, env

# PROJECT_ROOT = os.path.dirname(os.path.realpath(__file__))
# here = lambda *x: os.path.join(PROJECT_ROOT, *x)

# config = ConfigParser.ConfigParser()
# config.readfp(open('fabric.cfg'))


tmp_time = datetime.datetime.now()
env.time = tmp_time.strftime("%Y%m%d_%H%M%S")


def deploy():
    """Deploy to github pages"""
    local('jekyll --no-auto --no-server')
    local('git add .')
    local('git commit -m "deploying latest build as at %(time)s"' %env)
    local('git branch -D gh-pages')
    local('git checkout -b gh-pages')
    local('git filter-branch --subdirectory-filter site')
    local('git push origin ghp-ages')

    print yellow("Done?")
