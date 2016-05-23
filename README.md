# Room

Simple Video player app with chat to watch video synchronously with friends

### Note to run it (dev mode)

`git clone https://github.com/Calderis/Room`

once in folder ( `cd Room-Master` )

`npm install`

Do `sh deploy_dev.sh`

(Note : The app is only working if you have launch RoomServer before and that the socket adress is your server adress)

### Note to deploy it

After editing the 'deploy.sh' file with correct path (look, here we are in the Calderis folder ^^ ) then do

`sh deploy.sh`

If after testing app (do not forget RoomServer) you have a mismatch module, it's because you do not use the same version of electron. Go back editing tmp/build_electron.sh by switching version until you find the correct one (for example, I use the 1.0.1 in dev mode and 1.1.0 in deployed mode) Then redo `sh deploy.sh`

### Features
- Launch youtube video
- Stream torrent
- All video files supported from direct download(except flv)
- Chat with thoose who are in the same Room
- Synchronously streaming


# Specials thanks
For all Developpers who participated of the success of this programm and especially for : 

- @RSATom
- @LouisLoode