/**
 * Processo de renderização do documento nota.html 
 */

// Para debugar e testar a aplicação e necessário ativar as ferramentas do desenvolverdor <ctrl><shift><i>

// capturar o foco da caixa de texto
const foco = document.getElementById('inputNote')

// Alterar as propriedades do documento html ao iniciar a aplicação
document.addEventListener('DOMContentLoaded', () => {
    foco.focus() //iniciar o documento com foco na caixa de texto
})

// Capturar os dados do formulário (Ele tira do html e coloca no Javacript) (Passo 1: - Fluxo)
let frmNote = document.getElementById('frmNote')
let note = document.getElementById('inputNote')
let color = document.getElementById('selectColor')

// ==============================================================================
// CRUD Creat ===================================================================

// Evento relacionado ao botão submit
frmNote.addEventListener('submit', async (event) => {
    // evitar o comportamento padrão (recarregar a página)
    event.preventDefault()
    // IMPORTANTE (teste de recebimento dos dados do form - Passo 1)
    console.log(note.value, color.value)
    // Criar um objeto para enviar ao main.js os dados da nota
    const stickyNote = {
        textNote: note.value,
        colorNote: color.value
    }
    // Enviar o objeto para o main.js (Passo 2: Fluxo)
    api.createNote(stickyNote)

})

// Fim - CRUD Creat ==============================================================
// ===============================================================================