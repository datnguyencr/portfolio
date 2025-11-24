git checkout --orphan fresh-start
git add .
git commit -m "Initial commit"
git branch -D main   # or master
git branch -m main
git push -f origin main
