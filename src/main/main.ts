import path from 'path';
import { app, BrowserWindow, shell, ipcMain } from 'electron';
import { autoUpdater } from 'electron-updater';
import log from 'electron-log';
import MenuBuilder from './menu';
import { resolveHtmlPath } from './util';
import os from 'os';
import { exec } from 'child_process';
import { promisify } from 'util';

class AppUpdater {
  constructor() {
    log.transports.file.level = 'info';
    autoUpdater.logger = log;
    autoUpdater.checkForUpdatesAndNotify();
  }
}

let mainWindow: BrowserWindow | null = null;

const execAsync = promisify(exec);

ipcMain.on('get-system-info', async (event) => {
  // Gather system information using Node.js os module
  const systemInfo = {
    platform: os.platform(),
    arch: os.arch(),
    hostname: os.hostname(),
    cpus: os.cpus().length,
    totalMemory: Math.round(os.totalmem() / (1024 * 1024 * 1024)) + ' GB',
    freeMemory: Math.round(os.freemem() / (1024 * 1024 * 1024)) + ' GB',
    uptime: Math.floor(os.uptime() / 3600) + ' hours',
    userInfo: os.userInfo().username,
    nodeVersion: process.versions.node,
    electronVersion: process.versions.electron
  };

  // Add a small delay to simulate processing time
  setTimeout(() => {
    event.reply('get-system-info', systemInfo);
  }, 700);
});

ipcMain.on('get-ubuntu-extensions', async (event) => {
  try {
    // Check if running on Linux
    if (process.platform !== 'linux') {
      event.reply('get-ubuntu-extensions', {
        error: 'This feature is only available on Linux systems',
        extensions: []
      });
      return;
    }

    // Run the apt list --installed command to get installed packages
    const { stdout, stderr } = await execAsync('apt list --installed | head -n 50');

    if (stderr && !stdout) {
      event.reply('get-ubuntu-extensions', {
        error: stderr,
        extensions: []
      });
      return;
    }

    // Parse the output to get package names and versions
    const lines = stdout.split('\n').filter(line => line.trim() !== '');
    // Skip the first line which is just a header
    const packages = lines.slice(1).map(line => {
      const parts = line.split('/');
      const packageName = parts[0];
      const versionInfo = line.match(/now\s([^\s]+)/);
      const version = versionInfo ? versionInfo[1] : 'unknown';

      return {
        name: packageName.trim(),
        version: version
      };
    });

    event.reply('get-ubuntu-extensions', {
      error: null,
      extensions: packages
    });
  } catch (error) {
    event.reply('get-ubuntu-extensions', {
      error: error.message || 'Failed to get installed packages',
      extensions: []
    });
  }
});

ipcMain.on('get-theme-config', async (event) => {
  // const mockThemeConfig: ThemeConfig = {
  //   uiTheme: 'Dark+',
  //   iconTheme: 'Material Icons',
  //   syntaxTheme: 'One Dark Pro',
  //   font: 'JetBrains Mono'
  // };

  if (process.platform !== 'linux') {
    event.reply('get-theme-config', {
      error: 'This feature is only available on Linux systems',
      themeConfig: null
    });
    return;
  }
  let themeConfig = {
    uiTheme: 'Dark+',
    iconTheme: 'Material Icons',
    syntaxTheme: 'One Dark Pro',
    font: 'JetBrains Mono'
  };

  try {
    const { stdout: gtkTheme } = await execAsync('gsettings get org.gnome.desktop.interface gtk-theme');
    themeConfig.uiTheme = gtkTheme.trim().replace(/'/g, '');
  } catch (error) {
    themeConfig.uiTheme = 'Unknown';
  }

  try {
    const { stdout: iconTheme } = await execAsync('gsettings get org.gnome.desktop.interface icon-theme');
    themeConfig.iconTheme = iconTheme.trim().replace(/'/g, '');
  } catch (error) {
    themeConfig.iconTheme = 'Unknown';
  }

  try {
    const { stdout: fontName } = await execAsync('gsettings get org.gnome.desktop.interface font-name');
    themeConfig.font = fontName.trim().replace(/'/g, '');
  } catch (error) {
    themeConfig.font = 'Unknown';
  }

  try {
    const { stdout: darkMode } = await execAsync('gsettings get org.gnome.desktop.interface color-scheme');
    themeConfig.darkMode = darkMode.includes('dark');
  } catch (error) {
    themeConfig.darkMode = false;
  }

  event.reply('get-theme-config', themeConfig);
});

ipcMain.handle('get-linux-theme-info', async () => {
  try {
    // Check if running on Linux
    if (process.platform !== 'linux') {
      return {
        error: 'This feature is only available on Linux systems',
        themeInfo: null
      };
    }

    const themeInfo: Record<string, any> = {};

    // Basic theme information
    try {
      const { stdout: gtkTheme } = await execAsync('gsettings get org.gnome.desktop.interface gtk-theme');
      themeInfo.uiTheme = gtkTheme.trim().replace(/'/g, '');
    } catch (error) {
      themeInfo.uiTheme = 'Unknown';
    }

    try {
      const { stdout: iconTheme } = await execAsync('gsettings get org.gnome.desktop.interface icon-theme');
      themeInfo.iconTheme = iconTheme.trim().replace(/'/g, '');
    } catch (error) {
      themeInfo.iconTheme = 'Unknown';
    }

    try {
      const { stdout: cursorTheme } = await execAsync('gsettings get org.gnome.desktop.interface cursor-theme');
      themeInfo.cursorTheme = cursorTheme.trim().replace(/'/g, '');
    } catch (error) {
      themeInfo.cursorTheme = 'Unknown';
    }

    // Font settings
    try {
      const { stdout: fontName } = await execAsync('gsettings get org.gnome.desktop.interface font-name');
      themeInfo.font = fontName.trim().replace(/'/g, '');
    } catch (error) {
      themeInfo.font = 'Unknown';
    }

    try {
      const { stdout: monospaceFont } = await execAsync('gsettings get org.gnome.desktop.interface monospace-font-name');
      themeInfo.monospaceFont = monospaceFont.trim().replace(/'/g, '');
    } catch (error) {
      themeInfo.monospaceFont = 'Unknown';
    }

    try {
      const { stdout: documentFont } = await execAsync('gsettings get org.gnome.desktop.interface document-font-name');
      themeInfo.documentFont = documentFont.trim().replace(/'/g, '');
    } catch (error) {
      themeInfo.documentFont = 'Unknown';
    }

    try {
      const { stdout: fontAntialiasing } = await execAsync('gsettings get org.gnome.desktop.interface font-antialiasing');
      themeInfo.fontAntialiasing = fontAntialiasing.trim();
    } catch (error) {
      themeInfo.fontAntialiasing = 'Unknown';
    }

    try {
      const { stdout: fontHinting } = await execAsync('gsettings get org.gnome.desktop.interface font-hinting');
      themeInfo.fontHinting = fontHinting.trim();
    } catch (error) {
      themeInfo.fontHinting = 'Unknown';
    }

    // Color and appearance
    try {
      const { stdout: colorScheme } = await execAsync('gsettings get org.gnome.desktop.interface color-scheme');
      themeInfo.colorScheme = colorScheme.trim().replace(/'/g, '');
      themeInfo.darkMode = colorScheme.includes('dark');

      // Set syntax theme based on dark mode
      themeInfo.syntaxTheme = themeInfo.darkMode ? 'One Dark Pro' : 'Light+';
    } catch (error) {
      themeInfo.colorScheme = 'Unknown';
      themeInfo.darkMode = false;
      themeInfo.syntaxTheme = 'One Dark Pro';
    }

    try {
      const { stdout: accentColor } = await execAsync('gsettings get org.gnome.desktop.interface accent-color');
      themeInfo.accentColor = accentColor.trim().replace(/'/g, '');
    } catch (error) {
      themeInfo.accentColor = 'Unknown';
    }

    try {
      const { stdout: cursorSize } = await execAsync('gsettings get org.gnome.desktop.interface cursor-size');
      themeInfo.cursorSize = cursorSize.trim();
    } catch (error) {
      themeInfo.cursorSize = 'Unknown';
    }

    // Window manager settings
    try {
      const { stdout: buttonLayout } = await execAsync('gsettings get org.gnome.desktop.wm.preferences button-layout');
      themeInfo.buttonLayout = buttonLayout.trim().replace(/'/g, '');
    } catch (error) {
      themeInfo.buttonLayout = 'Unknown';
    }

    try {
      const { stdout: animations } = await execAsync('gsettings get org.gnome.desktop.interface enable-animations');
      themeInfo.animations = animations.trim() === 'true';
    } catch (error) {
      themeInfo.animations = true;
    }

    // Clock format
    try {
      const { stdout: clockFormat } = await execAsync('gsettings get org.gnome.desktop.interface clock-format');
      themeInfo.clockFormat = clockFormat.trim().replace(/'/g, '');
    } catch (error) {
      themeInfo.clockFormat = 'Unknown';
    }

    return {
      error: null,
      themeInfo
    };
  } catch (error) {
    return {
      error: error instanceof Error ? error.message : 'Failed to get theme information',
      themeInfo: null
    };
  }
});

if (process.env.NODE_ENV === 'production') {
  const sourceMapSupport = require('source-map-support');
  sourceMapSupport.install();
}

const isDebug =
  process.env.NODE_ENV === 'development' || process.env.DEBUG_PROD === 'true';

if (isDebug) {
  require('electron-debug')();
}

const installExtensions = async () => {
  const installer = require('electron-devtools-installer');
  const forceDownload = !!process.env.UPGRADE_EXTENSIONS;
  const extensions = ['REACT_DEVELOPER_TOOLS'];

  return installer
    .default(
      extensions.map((name) => installer[name]),
      forceDownload,
    )
    .catch(console.log);
};

const createWindow = async () => {
  if (isDebug) {
    await installExtensions();
  }

  const RESOURCES_PATH = app.isPackaged
    ? path.join(process.resourcesPath, 'assets')
    : path.join(__dirname, '../../assets');

  const getAssetPath = (...paths: string[]): string => {
    return path.join(RESOURCES_PATH, ...paths);
  };

  mainWindow = new BrowserWindow({
    show: false,
    width: 1024,
    height: 728,
    icon: getAssetPath('icon.png'),
    webPreferences: {
      preload: app.isPackaged
        ? path.join(__dirname, 'preload.js')
        : path.join(__dirname, '../../.erb/dll/preload.js'),
    },
  });

  mainWindow.loadURL(resolveHtmlPath('index.html'));

  mainWindow.on('ready-to-show', () => {
    if (!mainWindow) {
      throw new Error('"mainWindow" is not defined');
    }
    if (process.env.START_MINIMIZED) {
      mainWindow.minimize();
    } else {
      mainWindow.show();
    }
  });

  mainWindow.on('closed', () => {
    mainWindow = null;
  });

  const menuBuilder = new MenuBuilder(mainWindow);
  menuBuilder.buildMenu();

  // Open urls in the user's browser
  mainWindow.webContents.setWindowOpenHandler((edata) => {
    shell.openExternal(edata.url);
    return { action: 'deny' };
  });

  // Remove this if your app does not use auto updates
  // eslint-disable-next-line
  new AppUpdater();
};

/**
 * Add event listeners...
 */

app.on('window-all-closed', () => {
  // Respect the OSX convention of having the application in memory even
  // after all windows have been closed
  if (process.platform !== 'darwin') {
    app.quit();
  }
});

app
  .whenReady()
  .then(() => {
    createWindow();
    app.on('activate', () => {
      // On macOS it's common to re-create a window in the app when the
      // dock icon is clicked and there are no other windows open.
      if (mainWindow === null) createWindow();
    });
  })
  .catch(console.log);
