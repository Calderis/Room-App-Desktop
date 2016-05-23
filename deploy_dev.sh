echo "Change webchimera version"
cp tmp/build_electron_dev.sh node_modules/webchimera.js/build_electron.sh

echo "Building webchimera"
sh node_modules/webchimera.js/electron_build.sh

LIBFILE=tmp/libvlc_2.2.1_mac.zip
if [ ! -f $LIBFILE ]; then
  echo "Downloading bindings"
  wget -N https://github.com/RSATom/WebChimera.js/releases/download/v.0.1.3/libvlc_2.2.1_mac.zip -O $LIBFILE
else
  echo "Libfile already exists"
fi

echo "Copy VLC bindings"
unzip -q -o tmp/libvlc_2.2.1_mac.zip -d node_modules/webchimera.js/build/Release

echo "Launching electron ."
electron .