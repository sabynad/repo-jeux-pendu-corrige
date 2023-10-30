console.log("Script chargé");
//
//************************DÉCLARATION DES CONSTANTES ET VARIABLES**************************//
//
// const ARRAY_MOTS = ["NAVIGATEUR", "RESPONSIVE", "PACKAGE", "PROJET", "REFERENCEMENT", "ALGORITHME", "FRAMEWORK", "PROCEDURALE", "APPLICATION"];
const ARRAY_DEFINITIONS = [
    {
        mot: "NAVIGATEUR",
        definition: "Un navigateur web est un logiciel conçu pour consulter et afficher le World Wide Web"
    },
    {
        mot: "RESPONSIVE",
        definition: "Un site web responsive ou 'réactif' est un site web dont la conception vise à offrir une consultation confortable sur des écrans de tailles très différentes"},
    {
        mot: "PACKAGE",
        definition: "En développement web, le terme package ou 'paquet' est le nom donné à une bibliothèque logicielle."},
    {
        mot: "PROJET",
        definition: "Techniquement, le terme projet est la concrétisation ou la réalisation d'une idée en mobilisant les ressources nécessaires dont on a besoin, en fixant et en respectant le délai de sa réalisation sans oublier la qualité de la finalité."},
    {
        mot: "REFERENCEMENT",
        definition: "Sur internet, le travail de référencement consiste à améliorer le positionnement et la visibilité de sites dans des pages de résultats de moteurs de recherche ou d'annuaires."},
    {
        mot: "ALGORITHME",
        definition: "Un algorithme est une suite finie et non ambiguë d'instructions et d\'opérations permettant de résoudre une classe de problèmes."},
    {
        mot: "FRAMEWORK",
        definition: "En développement web, un framework est un ensemble cohérent de composants structurels qui sert à créer l'architecture de tout ou partie d'une application"},
    {
        mot: "PROCEDURALE",
        definition: "En informatique, la programmation procédurale est un paradigme qui se fonde sur le concept d'appel procédural. Une procédure, aussi appelée routine, sous-routine ou fonction (à ne pas confondre avec les fonctions de la programmation fonctionnelle reposant sur des fonctions mathématiques), contient simplement une série d'étapes à réaliser. N\'importe quelle procédure peut être appelée à n'importe quelle étape de l\'exécution du programme, y compris à l\'intérieur d\'autres procédures, voire dans la procédure elle-même (récursivité)."},
    {
        mot: "APPLICATION",
        definition: "En informatique, une application web est une application manipulable directement en ligne grâce à un navigateur web et qui ne nécessite donc pas d'installation sur les machines clientes, contrairement aux applications mobiles."}
]

let numAleatoire = Math.floor(Math.random() * ARRAY_DEFINITIONS.length);
console.log(numAleatoire);

const MOT_MYSTERE = ARRAY_DEFINITIONS[numAleatoire].mot;
console.log("mot aleatoir " + MOT_MYSTERE);

const definitionMotMystere = ARRAY_DEFINITIONS[numAleatoire].definition;
console.log("definition aleatoir " + definitionMotMystere);



// const MOT_MYSTERE = ARRAY_DEFINITIONS;
console.log(Math.floor(Math.random() * ARRAY_DEFINITIONS.length));
// console.log("test", ARRAY_DEFINITIONS[4]);
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

                afficheDefinitionMystere();
                
                BOUTON_REJOUER.style.visibility = "visible";
            }
        }
    }
    if (trouve == false) {
        boutonLettre.style.backgroundColor = "red";
        SPAN_SCORE.innerHTML = `<strong>${parseInt(SPAN_SCORE.textContent) - 1}</strong>`;
        if (SPAN_SCORE.textContent == 0) {
            document.querySelector(".resultat p").innerHTML = `PERDU ! Le mot à trouver était <strong>${MOT_MYSTERE}</strong>`;

            afficheDefinitionMystere()

            document.querySelector(".interface").style.pointerEvents = "none";
            BOUTON_REJOUER.style.visibility = "visible";
   
        }
    }
    

    boutonLettre.style.color = "white";
    boutonLettre.disabled = true;
    trouve = false;
}

function afficheDefinitionMystere() {
    document.querySelector(".resultat p:last-of-type").textContent = definitionMotMystere;
}


