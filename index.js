let results = {};
let alreadyDrawn = [];
let allBaúsDrawn = false;

document.addEventListener('DOMContentLoaded', () => {
    const images = [
        'bau_sprite_1.png',
        'bau_sprite_2.png',
        'bau_sprite_3.png'
    ];

    for (let i = 1; i <= 9; i++) {
        const bauImage = document.getElementById(`bauImage${i}`);
        const button = document.getElementById(`triggerButton${i}`);

        button.addEventListener('click', () => {
            if (alreadyDrawn.includes(i)) {
                alert(`Você já sorteou o Baú ${i}!`);
                return;
            }

            // Selecionar uma imagem aleatória
            const randomIndex = Math.floor(Math.random() * images.length);
            const randomImage = images[randomIndex];

            // Carregar a imagem dinamicamente
            bauImage.src = randomImage;
            bauImage.alt = `Baú ${i} - ${randomIndex}`;

            // Contabilizar o resultado
            const result = `Baú ${i} - ${randomIndex}`;
            if (!results[result]) {
                results[result] = '';
            } else {
                results[result]++;
            }

            // Adicionar ao array de já sorteado
            alreadyDrawn.push(i);

            // Verificar se todos os baús foram sorteado
            if (alreadyDrawn.length === 9) {
                allBaúsDrawn = true;
                showResultsMenu();
            }
        });
    }
});

const resultLabels = {
    0: 'Bau vazio',
    1: 'Bau com ouro',
    2: 'Bau com joias'
};
function showResultsMenu() {
    
    setTimeout(() => {
        // Mostra a tela de carregamento
        const loadingScreen = document.getElementById('loading-screen');
        loadingScreen.classList.remove('hidden');

        // Timer para esconder a tela de carregamento após 4 segundos
        setTimeout(() => {
            loadingScreen.classList.add('hidden');

            // Mostra os resultados finais
            const resultsMenu = document.createElement('div');
            resultsMenu.className = 'results-menu';
            resultsMenu.innerHTML = `
              <h2>RESULTADOS!</h2>
              <ul>
                ${Object.keys(results).map((result, index) => `
                  <li>${resultLabels[parseInt(result.split(' - ')[1])]}: ${results[result]} </li>
                `).join('')}
              </ul>
            `;

            document.body.appendChild(resultsMenu);

            // CSS do menu resultados finais
            resultsMenu.style.position = 'fixed';
            resultsMenu.style.top = '0';
            resultsMenu.style.left = '0';
            resultsMenu.style.width = '100%';
            resultsMenu.style.height = '100vh';
            resultsMenu.style.backgroundColor = '#fff';
            resultsMenu.style.padding = '20px';
            resultsMenu.style.fontSize = '24px';
            resultsMenu.style.textAlign = 'center';
            resultsMenu.style.zIndex = '1000';
        }, 2000); // 4000ms = 4 segundos
    }, 1500); // 3000ms = 3 segundos
}

// Variável para armazenar os IDs gerados

let ids = [];


function generateId() {
    const id = Math.floor(Math.random() * 1000000000) + 1;
    return id.toString().padStart(9, '0');
}

// Função para cadastrar o jogador
function registerUser() {
    const username = document.getElementById("username").value;
    const id = generateId();
    document.getElementById("id").value = id;


    event.preventDefault();


    document.getElementById("register-screen").style.display = "none";
    document.getElementById("game-screen").style.display = "block";
}


document.getElementById("register-btn").addEventListener("click", registerUser);

// Mostra a tela de carregamento inicial por 1 segundo
setTimeout(() => {
    const initialLoadingScreen = document.getElementById('initial-loading-screen');
    initialLoadingScreen.classList.add('hidden');

    // Mostra a tela de cadastro de cliente
    const registerScreen = document.getElementById('register-screen');
    registerScreen.classList.remove('hidden');

    // Gera um ID único para o cliente
    const idInput = document.getElementById('id');
    idInput.value = generateId();
}, 1000); // 1000ms = 1,5 segundo

// Função para cadastrar o cliente
document.getElementById('register-btn').addEventListener('click', () => {
    const usernameInput = document.getElementById('username');
    const username = usernameInput.value;
    const id = document.getElementById('id').value;

    // Cadastra o cliente e inicia o jogo dos baus
});

// Função para gerar os resultados
function generateResults() {
    const playerName = document.getElementById("username").value;
    const playerId = document.getElementById("id").value;
    const results = []; // Array para armazenar os resultados

    // Adicione os resultados dos 9 baús aqui
    for (let i = 0; i < 9; i++) {
        results.push(`Bau ${i + 1}: ${Math.floor(Math.random() * 10) + 1}`);
    }

    // Crie a linha da tabela com os resultados
    const resultsRow = document.createElement("tr");
    resultsRow.innerHTML = `
          <td>${playerName}</td>
          <td>${playerId}</td>
          ${results.map(result => `<td>${result}</td>`).join("")}
        `;

    // Adicione a linha à tabela
    document.getElementById("results-tbody").appendChild(resultsRow);
}

// Chame a função quando o jogador clicar nos 9 baús
document.getElementById("start-game-btn").addEventListener("click", generateResults);