#!/bin/bash
if [[ $(pwd) =~ .+simorgh ]]; then
  desired_node_version=$(cat .nvmrc)

  if [[ $(node -v) != "$desired_node_version"* ]]; then
    tput setaf 1
    echo "\nOh no! You're not using our version of node, please move to $desired_node_version in order to reduce bundling inconsistency"
    tput sgr0
    echo "This can be done by running 'nvm install $desired_node_version && nvm use $desired_node_version'"
    exit 1
  fi

  # cut is used to transform 'version=6.4.1' into '6.4.1' for easy comparison
  desired_npm_version=$(cat .npmrc | cut -d "=" -f2)

  if [[ $(npm -v) != $desired_npm_version ]]; then
    tput setaf 1
    echo "\nOh no! You're not using our version of npm, please move to version $desired_npm_version in order to reduce bundling inconsistency"
    tput sgr0
    echo "This can be done by running 'npm i -g npm@$desired_npm_version'"
    echo "Once you have done this please run 'npm install' again and commit any changes to your package-lock.json"
    exit 1
  fi
fi
