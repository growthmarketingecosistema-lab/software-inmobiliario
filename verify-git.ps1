$git = "C:\Program Files\Git\cmd\git.exe"
& $git status
& $git log -n 3
& $git add .
& $git commit -m "chore: ensure all files including .env.example are pushed"
& $git push origin main -f
