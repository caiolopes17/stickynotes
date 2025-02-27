console.log("Electron - Processo principal")

// Importação dos recursos do framework
// App se refere a (Aplicação)
// BrowserWindow (Criação da Janela)
const { app, BrowserWindow } = require('electron/main')

// Janela Principal
let win
const createWindow = () => {
  win = new BrowserWindow({
    width: 1010,
    height: 720,
    frame: false
    //resizable: false,
    //minimizable: false,
    //closable: false,
    //autoHideMenuBar: true
  })
    // carregar o documento html na janela
  win.loadFile('./src/views/index.html')
}

// inicialização da aplicação ( ".then" significa assincronismo)

app.whenReady().then(() => {
  createWindow()

  // só ativar a janela principal se nenhuma outra estiver ativa
  app.on('activate', () => {
    if (BrowserWindow.getAllWindows().length === 0) {
      createWindow()
    }
  })
})

// se o sistema não for MAC encerrar a aplicação quando a janela for fechada
app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    app.quit()
  }
})