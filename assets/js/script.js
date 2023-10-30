console.log("Script chargé");
//
//************************DÉCLARATION DES CONSTANTES ET VARIABLES**************************//
//
const ARRAY_MOTS = ["NAVIGATEUR", "RESPONSIVE", "PACKAGE", "PROJET", "REFERENCEMENT", "ALGORITHME", "FRAMEWORK", "PROCEDURALE", "APPLICATION"];
const MOT_MYSTERE = ARRAY_MOTS[Math.floor(Math.random() * ARRAY_MOTS.length)];
console.log(MOT_MYSTERE);
const ARRAY_ALPHABET = "abcdefghijklmnopqrstuvwxyz".toUpperCase().split("");
console.log(ARRAY_ALPHABET);
const SPAN_SCORE = document.querySelector(".affichage>span:last-of-type");
const BOUTON_REJOUER = document.querySelector("input[type='button']");
//
//************************INITIALISATION**************************//
//
init();
//
//****La partie commence****//
//
const arrayChevalet = document.querySelectorAll(".lettres-decouvertes span");
console.log(arrayChevalet);
ecouterClavier();
//
//************************DECLARATION DES FONCTIONS**************************//
//
/**
 * Construction de la page
 */
function init() {
    construireChevalet();
    construireClavier();
    BOUTON_REJOUER.addEventListener("click", () => window.location.reload());
}
/**
 * Injection du contenu HTML du chevalet de placement des lettres trouvées
 */
function construireChevalet() {
    for (let index = 0; index < MOT_MYSTERE.length; index++) {
        const unTiret = document.createElement("span");
        unTiret.textContent = "-";
        document.querySelector(".lettres-decouvertes").appendChild(unTiret);
    }
}
/**
 * Construction du clavier
 */
function construireClavier() {
    for (let index = 0; index < ARRAY_ALPHABET.length; index++) {
        const boutonLettre = document.createElement("button");
        boutonLettre.textContent = ARRAY_ALPHABET[index];
        document.querySelector(".clavier").appendChild(boutonLettre);
    }
}
/**
 * On écoute le clavier pour lancer la recherche de la lattre choisie dans le mot mystère
 */
function ecouterClavier() {
    document.querySelectorAll("button").forEach(bouton => {
        bouton.addEventListener("click", chercher)
    })
}
/**
 * 
 * @param {Object} evenementClick 
 */
function chercher(evenementClick) {
    let trouve = false;
    const boutonLettre = Array.from(document.querySelectorAll("button")).find((button) => button.textContent == evenementClick.target.textContent);
    for (let index = 0; index < MOT_MYSTERE.length; index++) {
        if (evenementClick.target.textContent == MOT_MYSTERE[index]) {
            arrayChevalet[index].textContent = MOT_MYSTERE[index];
            trouve = true;
            boutonLettre.style.backgroundColor = "green";
            const gagne = Array.from(arrayChevalet).find((span) => span.textContent == "-");
            if (!gagne) {
                document.querySelector(".resultat p").textContent = "GAGNÉ !";
                document.querySelector(".interface").style.pointerEvents = "none";
                BOUTON_REJOUER.style.visibility = "visible";
            }
        }
    }
    if (trouve == false) {
        boutonLettre.style.backgroundColor = "red";
        SPAN_SCORE.innerHTML = `<strong>${parseInt(SPAN_SCORE.textContent) - 1}</strong>`;
        if (SPAN_SCORE.textContent == 0) {
            document.querySelector(".resultat p").innerHTML = `PERDU ! Le mot à trouver était <strong>${MOT_MYSTERE}</strong>`;
            document.querySelector(".interface").style.pointerEvents = "none";
            BOUTON_REJOUER.style.visibility = "visible";
        }
    }
    boutonLettre.style.color = "white";
    boutonLettre.disabled = true;
    trouve = false;
}