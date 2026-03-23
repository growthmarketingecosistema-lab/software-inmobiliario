$git = "C:\Program Files\Git\cmd\git.exe"
& $git config --global user.name "Ecosistema"
& $git config --global user.email "ecosistema@example.com"
& $git init
& $git add .
& $git commit -m "feat: complete application views refactor and seed prep"
& $git branch -M main
& $git remote add origin "https://github.com/growthmarketingecosistema-lab/software-inmobiliario.git"
& $git push -u origin main -f
