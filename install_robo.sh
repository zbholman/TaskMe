# This script downloads and installs robomongo

cd ~/Downloads
wget https://download.robomongo.org/0.9.0-rc7/linux/robomongo-0.9.0-rc7-linux-x86_64-2b7a8ca.tar.gz

tar -xvf robomongo-0.9.0-rc7-linux-x86_64-2b7a8ca.tar.gz

rm -rf robomongo-0.9.0-rc7-linux-x86_64-2b7a8ca.tar.gz

cd robomongo-0.9.0-rc7-linux-x86_64-2b7a8ca/bin

./robomongo
