console.log("Electron - Processo principal")

// Importação dos recursos do framework
// App se refere a (Aplicação)
// BrowserWindow (Criação da Janela)
//nativeTheme esta relacionado para o usuário escolher o tema claro ou escuro nas configurações do windows
// Menu (Definir um menu personalizado)
// Shell (Acessar links externos no navegador padrão (Ex: GitHub))
//ipcMain (permite estabelecer uma comunicação de processos)
const { app, BrowserWindow, nativeTheme, Menu, shell, ipcMain } = require('electron/main')

// Ativação do preload.js(importação do path "Caminho até chegar no preload")
const path = require('node:path')

// Importação dos métodos conectar e desconectar 'Módulo de conexão'
const { conectar, desconectar } = require('./database.js')

// Ativação do preload.js(importação do path "Caminho até chegar no preload.js")
const path = require ('node:path')

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
    //autoHideMenuBar: true,
    webPreferences: {
      preload: path.join(__dirname, 'preload.js')
    }
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
<<<<<<< HEAD
      width: 300,
      height: 200,
=======
      width: 360,
      height: 280,
>>>>>>> 0d9c3ab65224ea09cc1065b8e57b3996c4930294
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

// Criar a função para cadastro do cliente "Janela Cadastro"
function cadastroWindow() {
  nativeTheme.themeSource = 'light'
  // Obter a janela principal, comando abaixo sabera qual é a janela principal
  const mainWindow = BrowserWindow.getFocusedWindow()
  // Validação (Se existir a janela principal)
  if (mainWindow) {
    about = new BrowserWindow({
      width: 900,
      height: 400,
      autoHideMenuBar: true,
      resizable: false,
      minimizable: false,
      // Estabelecer uma relação hierárquica entre janelas
      parent: mainWindow,
      // Criar uma janela modal (só retorna a principal quando encerrada)
      modal: true
    })
  }

  about.loadFile('./src/views/cadastro.html')
}

// inicialização da aplicação ( ".then" significa assincronismo)

app.whenReady().then(() => {
  createWindow()

  // Melhor local para estabelecer a conexão com o banco de dados
  // No MongoDB é mais eficiente manter uma única conexão aberta durante todo o tempo de vida do aplicativo e encerrar a conexão quando o aplicativo for finalizado
  // ipcMain.on (receber mensagem)
  // db-connect (rótulo da mensagem)
  ipcMain.on('db-connect', async (event) => {
    // A linha abaixo estabelece a conexão com banco de dados e verifica se foi conectado com sucesso (return true)
    const conectado = await conectar()
    if (conectado) {
      // enviar ao renderizador uma mensagem para trocar a imagem do icone do status do banco de dados (criar um delay de 0.5 ou 1s para sincronização com a nuvem)
      setTimeout(() => {
        //enviar ao renderizador a mensagem "conectado"
        // db-status (IPC - comunicação entre processos - preload.js)
        event.reply('db-status', "conectado")
      }, 500) //500ms = 0.5  seg
    }

  })


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

// IMPORTANTE ! Desconectar do banco de dados quando a aplicação for finalizado
app.on('before-quit', async () => {
  await desconectar()
})

// Reduzir a verbosidade de logs não críticos (devtools)
app.commandLine.appendSwitch('log-level', '3')

// Template do menu
// Quando abre e fecha essas chaves [] significa vetor, Label (Escrever no menu), Ctrl+N (Tecla atalho), app.quit (Finaliza o aplicativo)
const template = [
  {
    label: 'Cadastro',
    submenu: [
      {
        label: 'Criar Cadastro',
        label: 'criar cadastro',
        click: () => cadastroWindow(),
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
        label: 'recarregar',
        role: 'reload'
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
        click: () => aboutWindow(),
      }
    ]
  }
]