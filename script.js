//File JavaScript per la logica di gioco, creato da Tommaso Nerozzi.  



//variabile per il turno del giocatore 2
let turnoP2


//costanti
const X_CLASS = 'x' //classe del giocatore 1 (X)
const CIRCLE_CLASS = 'circle' //classe del giocatore 2 (O)
const arrayCombinazioni = [
    //combinazioni orizzontali
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    //combinazioni verticali
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    //combinazioni orizzontali
    [0, 4, 8],
    [2, 4, 6]
]
const elementiCella = document.querySelectorAll('[data-cell]')  //seleziono ogni cella della board dall'index
const playAgainButton = document.getElementById('playAgainButton') //seleziono il bottone dal suo id dall'index
const board = document.getElementById('board') //seleziono la board dal suo id dall'index
const messaggioVincita = document.getElementById('messaggioVincita') //seleziono il messaggio di vincita dal suo id dall'index
const testoMessaggio = document.querySelector('[data-testo-vittoria]') //seleziono il testo del messaggio dall'index 

start() //richiamo la funzione per iniziare il gioco

playAgainButton.addEventListener('click', start) //aggiungo un listener e quando clicco il pulsante richiamo nuovamente la funzione start()


//funzione per inizio gioco
function start(){
    turnoP2 = false //setto il turno del P2 a false
    
    //per ogni cella rimuovo la classe x e circle, 
    //ripulisco la board  
    //rimuovo "show" dalla classe del messaggio 
    elementiCella.forEach(cell => { 
    cell.classList.remove(X_CLASS)
    cell.classList.remove(CIRCLE_CLASS)
    cell.removeEventListener('click', clickFunction)
    messaggioVincita.classList.remove('show')
    

    //ogni volta che clicco una cella richiamo la funzione, una volta sola per cella
    cell.addEventListener('click', clickFunction, {once: true})

    //chiamo la funzione per settare la classe all'hover della board
    setBoardHoverClass() 
    })
}




//funzione per gestire il click della cella
function clickFunction(e){
    // 1) posizionamento segno 
    const cella = e.target //passo la cella cliccata
    const classe = turnoP2 ? CIRCLE_CLASS : X_CLASS //a seconda del turno ritorna la classe
    disegna(cella, classe)
    
    if(checkVittoria(classe)){ //se la checkVittoria ritorna true
        endGame(false) //ad endGame passo false perchè non c'è un pareggio
    }
    else if(checkPareggio()){ //se la funzione checkPareggio ritorna true
        endGame(true) //ad endGame passo true per stampare "PAREGGIO!"
    }
    else{ //senno cambio turno e classe hover
        cambiaTurno()
        setBoardHoverClass() //SERVE PER MOSTRARE IL CURSORE CON LA FIGURA
    }
}




//funzione che controlla una un parametro (pareggio) e di conseguenza mostra il messaggio di vincita
function endGame(pareggio){
    if(pareggio){
        testoMessaggio.innerText = 'PAREGGIO!'
    }else{
        //controllo di chi sia il turno e con operatore ternario stampo o "X" o "O"
        testoMessaggio.innerText = `${turnoP2 ? "O" : "X"} ha vinto!` 
    }
    messaggioVincita.classList.add('show') //aggiungo show alla classList del messaggio di vincita

}




//funzione per passare la classe corrente alla cella per disegnare
function disegna(cella, classe){
    cella.classList.add(classe)
}




//funzione per cambiare il turno
function cambiaTurno(){
    turnoP2 = !turnoP2
}




//funzione per settare la hover class: ovvero per ogni turno 
//quando passo sopra la cella mostra una preview della forma
function setBoardHoverClass(){
    //rimuovo le classi dalla board
    board.classList.remove(X_CLASS)
    board.classList.remove(CIRCLE_CLASS)
    if(turnoP2){
        board.classList.add(CIRCLE_CLASS) //aggiungo la classe CIRCLE
    }else{
        board.classList.add(X_CLASS) //aggiungo la classe X
    }
}




//funzione per controllare le combinazioni di vincita
function checkVittoria(classe){
    //controllo tutte le combinazioni
    //.some ritorna TRUE se tutti i valori al suo interno sono veri
    return arrayCombinazioni.some(combinazioni =>{
        //per ogni combinazione controllo se i valori hanno la stessa classe
        return combinazioni.every(indice =>{
            //controlliamo la classe di ogni indice
            return elementiCella[indice].classList.contains(classe)
        })
    })
}




//funzione per controllare eventuali pareggi
function checkPareggio(){
    //controlla se tutte le celle sono state riempite (ovvero ognuna ha una classe)
    return [...elementiCella].every(cell =>{
        return cell.classList.contains(X_CLASS) || cell.classList.contains(CIRCLE_CLASS)
    })
}