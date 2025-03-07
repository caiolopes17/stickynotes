console.log("Electron - Processo principal")

// Importação dos recursos do framework
// App se refere a (Aplicação)
// BrowserWindow (Criação da Janela)
//nativeTheme esta relacionado para o usuário escolher o tema claro ou escuro nas configurações do windows
// Menu (Definir um menu personalizado)
// Shell (Acessar links externos no navegador padrão (Ex: GitHub))
const { app, BrowserWindow, nativeTheme, Menu, shell } = require('electron/main')

// Janela Principal
let win
const createWindow = () => {
  // Definindo o tema da janelaclaro ou escuro
  nativeTheme.themeSource = 'light'
  win = new BrowserWindow({
    width: 1010,
    height: 720,
    //frame: false
    //resizable: false,
    //minimizable: false,
    //closable: false,
    //autoHideMenuBar: true
  })

  // Carregar o menu personalizado
  // Atenção! Antes importar o recurso Menu
  Menu.setApplicationMenu(Menu.buildFromTemplate(template))

  // carregar o documento html na janela
  win.loadFile('./src/views/index.html')
}

// Janela Sobre
function aboutWindow() {
  nativeTheme.themeSource = 'light'
  // Obter a janela principal, comando abaixo sabera qual é a janela principal
  const mainWindow = BrowserWindow.getFocusedWindow()
  // Validação (Se existir a janela principal)
  if (mainWindow) {
    about = new BrowserWindow({
      width: 320,
      height: 280,
      autoHideMenuBar: true,
      resizable: false,
      minimizable: false,
      // Estabelecer uma relação hierárquica entre janelas
      parent: mainWindow,
      // Criar uma janela modal (só retorna a principal quando encerrada)
      modal: true
    })
  }

  about.loadFile('./src/views/sobre.html')
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

// Reduzir a verbosidade de logs não críticos (devtools)
app.commandLine.appendSwitch('log-level', '3')

// Template do menu
// Quando abre e fecha essas chaves [] significa vetor, Label (Escrever no menu), Ctrl+N (Tecla atalho), app.quit (Finaliza o aplicativo)
const template = [
  {
    label: 'Notas',
    submenu: [
      {
        label: 'Criar nota',
        accelerator: 'Ctrl+N',
      },
      {
        type: 'separator'
      },
      {
        label: 'Sair',
        accelerator: 'Alt+F4',
        click: () => app.quit()
      }
    ]
  },
  {
    label: 'Ferramentas',
    submenu: [
      {
        label: 'Aplicar zoom',
        role: 'zoomIn'
      },
      {
        label: 'Reduzir',
        role: 'zoomOut'
      },
      {
        label: 'Restaurar o zoom padrão',
        role: 'resetZoom'
      },
      {
        type: 'separator'
      },
      {
        label: 'DevTools',
        role: 'toggleDevTools'
      }
    ]
  },
  {
    label: 'Ajuda',
    submenu: [
      {
        label: 'Repositório',
        click: () => shell.openExternal('https://github.com/caiolopes17/stickynotes')
      },
      {
        label: 'Sobre',
        click: () => aboutWindow()
      }
    ]
  }
]