# rusty-weather

Work in progress.

## Run on a Raspberry Pi

Requirements:

- docker
- wget
- git

First, install LCD screen drivers:

```shell
git clone https://github.com/goodtft/LCD-show
cd LCD-show
chmod -R 755 LCD-show/
sudo ./LCD7b-show
```

Then, copy the autostart configuration:

```shell
cp /etc/xdg/lxsession/LXDE-pi/autostart ~/.config/lxsession/LXDE-pi
```

Then, edit it:

```text
@lxpanel --profile LXDE-pi
@pcmanfm --desktop --profile LXDE-pi
#@xscreensaver -no-splash
point-rpi
chromium --start http://<RASPBERRY_IP_YOUR_LAN>:2468/
```

Then, create a directory (name is not important):

```shell
mkdir rusty-weather
cd rusty-weather
```

Then, clone the deploy script from Github repository and run it:

```shell
wget https://raw.githubusercontent.com/maximekuhn/rusty-weather/main/deploy_rpi.sh
bash deploy_rpi.sh
```

To finish, restart your raspberry pi:

```shell
sudo reboot now
```

## Developer instructions

TODO