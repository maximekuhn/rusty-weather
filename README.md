# rusty-weather

Work in progress.

## Run on a Raspberry Pi

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

And edit it so the raspberry opens chromium at startup:

```text
@lxpanel --profile LXDE-pi
@pcmanfm --desktop --profile LXDE-pi
#@xscreensaver -no-splash
point-rpi
chromium --start http://localhost:3000/
```