echo "Change webchimera version"
cp tmp/build_electron_deploy.sh node_modules/webchimera.js/build_electron.sh

echo "Building webchimera"
cd node_modules/webchimera.js/
sh build_electron.sh
cd ../../

echo "Build package using electron-packager"
electron-packager . --platform=darwin --arch=all --icon=./ressources/images/logo/icon.icns  --overwrite

LIBFILE=tmp/libvlc_2.2.1_mac.zip
if [ ! -f $LIBFILE ]; then
  echo "Downloading bindings"
  wget -N https://github.com/RSATom/WebChimera.js/releases/download/v.0.1.3/libvlc_2.2.1_mac.zip -O $LIBFILE
else
  echo "Libfile already exists"
fi

echo "Copy VLC bindings"
unzip -q -o tmp/libvlc_2.2.1_mac.zip -d room-darwin-x64/room.app/Contents/Resources/app/node_modules/webchimera.js/build/Release