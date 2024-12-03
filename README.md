# EBTCalc for Windows and Linux

EBTCalc (Desktop) is a Reverse Polish Notation (RPN) calculator with custom buttons, programmed in Javascript, using a convenient editor. EBTCalc runs on Windows 10 and Linux. EBTCalc is open source.

EBTCalc is built on the [`Electron`](https://github.com/electron/electron) framework.

# Screenshots

![`EBTCalc Screenshot`](https://www.ericbt.com/uploaded_images/ebtcalc_github.png "EBTCalc Screenshot, Main Window")

![`EBTCalc Screenshot`](https://www.ericbt.com/uploaded_images/ebtcalc_github_2.png "EBTCalc Screenshot, Edit Window")

# Quick Start

To run EBTCalc:

```sh
git clone https://github.com/juddydev/EBTCalc.git
cd EBTCalc
npm install
npm start
```

# Debugging

To enable the Chrome debugging tools, set the DEBUG_MENUS environment variable to true (see displayCustomMenus in WindowUtils)