npm run test
if [ "$TRAVIS_BRANCH" == "master" ] && [ "$TRAVIS_PULL_REQUEST" == "false" ]
  then
    npm run docs:publish
  else echo 'No doc deployments on PRs. Sorry!'
fi
