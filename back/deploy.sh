pkill screen &&

kill $(sudo lsof -t -i:3000) &&

git pull &&

screen -dmS server npm start
