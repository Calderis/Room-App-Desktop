echo "Change webchimera version"
cp tmp/build_electron_deploy.sh node_modules/webchimera.js/build_electron.sh

echo "Building webchimera"
cd node_modules/webchimera.js/
sh build_electron.sh
cd ../../

echo "Build package using electron-packager"
electron-packager . --platform=all  --out=buildOS/ --arch=all --icon=./ressources/images/logo/icon.icns  --overwrite

LIBFILE=tmp/libvlc_2.2.1_mac.zip
if [ ! -f $LIBFILE ]; then
  echo "Downloading bindings"
  wget -N https://github.com/RSATom/WebChimera.js/releases/download/v.0.1.3/libvlc_2.2.1_mac.zip -O $LIBFILE
else
  echo "Libfile already exists"
fi

echo "Copy VLC bindings into room-darwin-x64"
unzip -q -o tmp/libvlc_2.2.1_mac.zip -d buildOS/room-darwin-x64/room.app/Contents/Resources/app/node_modules/webchimera.js/build/Release
echo "Copy VLC bindings into room-linux-ia32"
unzip -q -o tmp/libvlc_2.2.1_mac.zip -d buildOS/room-linux-ia32/resources/app/node_modules/webchimera.js/build/Release
echo "Copy VLC bindings into room-linux-x64"
unzip -q -o tmp/libvlc_2.2.1_mac.zip -d buildOS/room-linux-x64/resources/app/node_modules/webchimera.js/build/Release
echo "Copy VLC bindings into room-mas-x64"
unzip -q -o tmp/libvlc_2.2.1_mac.zip -d buildOS/room-mas-x64/room.app/Contents/Resources/app/node_modules/webchimera.js/build/Release
echo "Copy VLC bindings into room-win32-ia32"
unzip -q -o tmp/libvlc_2.2.1_mac.zip -d buildOS/room-win32-ia32/resources/app/node_modules/webchimera.js/build/Release
echo "Copy VLC bindings into room-win32-x64"
unzip -q -o tmp/libvlc_2.2.1_mac.zip -d buildOS/room-win32-x64/resources/app/node_modules/webchimera.js/build/Release