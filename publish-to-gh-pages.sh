git stash
git apply html5-mode-patch.diff
cd app/templates/
gulp build:prod --mock
cd ../../
git apply -R html5-mode-patch.diff
rm -rf static/ index.html
cp -r app/templates/client/build/prod/* .
git add static/ index.html
git commit -m "update site `date +"%Y-%m-%d %H:%M"`"
git push origin gh-pages
git push gitcafe gh-pages:gitcafe-pages
git checkout master
git stash pop
