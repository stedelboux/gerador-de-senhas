document.addEventListener('DOMContentLoaded', () => {
    // Obtém referências aos elementos do DOM
    const passwordInput = document.getElementById('generated-password');
    const copyButtons = document.querySelectorAll('#copy-password-left, #copy-password-bottom');
    const generateButton = document.getElementById('generate-password');
    const lengthSlider = document.getElementById('length-slider');
    const sliderValue = document.getElementById('slider-value');
    const uppercaseCheckbox = document.getElementById('uppercase');
    const lowercaseCheckbox = document.getElementById('lowercase');
    const numbersCheckbox = document.getElementById('numbers');
    const symbolsCheckbox = document.getElementById('symbols');
    const strengthBarInner = document.getElementById('strength-bar-inner');

    // Função para gerar uma senha com base nas opções selecionadas
    function generatePassword() {
        const length = parseInt(lengthSlider.value); // Obtém o comprimento da senha do slider
        const uppercaseChars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ'; // Caracteres maiúsculos
        const lowercaseChars = 'abcdefghijklmnopqrstuvwxyz'; // Caracteres minúsculos
        const numberChars = '0123456789'; // Caracteres numéricos
        const symbolChars = '!@#$%^&*()_+[]{}|;:,.<>?'; // Caracteres simbólicos

        // Construa a lista de caracteres disponíveis com base nas opções selecionadas
        let availableChars = '';
        if (uppercaseCheckbox.checked) availableChars += uppercaseChars;
        if (lowercaseCheckbox.checked) availableChars += lowercaseChars;
        if (numbersCheckbox.checked) availableChars += numberChars;
        if (symbolsCheckbox.checked) availableChars += symbolChars;

        // Se nenhuma opção estiver selecionada, use apenas caracteres minúsculos
        if (availableChars === '') availableChars = lowercaseChars;

        // Gere a senha aleatoriamente com base nos caracteres disponíveis
        let password = '';
        for (let i = 0; i < length; i++) {
            password += availableChars.charAt(Math.floor(Math.random() * availableChars.length));
        }

        // Atualiza o campo de entrada da senha com a nova senha gerada
        passwordInput.value = password;
        evaluateStrength(); // Avalia a força da senha gerada
    }

    const slider = document.getElementById('length-slider');

    // Função para atualizar o fundo do slider com base no valor atual
    function updateSliderBackground(value) {
        const percentage = (value - slider.min) / (slider.max - slider.min) * 100;
        slider.style.background = `linear-gradient(to right, white 0%, white ${percentage}%, #FD58FF ${percentage}%, #FD58FF 100%)`;
    }

    // Inicializa o slider com o valor padrão
    updateSliderBackground(slider.value);

    // Atualiza a trilha do slider quando o usuário o arrasta
    slider.addEventListener('input', function () {
        updateSliderBackground(this.value);
    });

    // Função para avaliar a força da senha com base nas opções selecionadas
    function evaluateStrength() {
        const uppercaseSelected = uppercaseCheckbox.checked;
        const lowercaseSelected = lowercaseCheckbox.checked;
        const numbersSelected = numbersCheckbox.checked;
        const symbolsSelected = symbolsCheckbox.checked;

        let strength = 0;
        let strengthColor = '#FF4D4D'; // Cor padrão para força "Fraca"

        // Conta quantas opções estão selecionadas
        const totalSelected = [uppercaseSelected, lowercaseSelected, numbersSelected, symbolsSelected].filter(Boolean).length;

        // Define a força da senha com base nas opções selecionadas
        if (totalSelected === 0) {
            strength = 33;
            strengthColor = '#FF4D4D'; // Vermelho para "Fraca"
        } else if (totalSelected === 1) {
            if (uppercaseSelected || lowercaseSelected) {
                strength = 33;
                strengthColor = '#FF4D4D'; // Vermelho para "Fraca"
            }
        } else if (totalSelected === 2 && (uppercaseSelected && lowercaseSelected)) {
            strength = 33;
            strengthColor = '#FF4D4D'; // Vermelho para "Fraca"
        } else if (totalSelected === 2 || totalSelected === 3) {
            strength = 66;
            strengthColor = '#FFD700'; // Amarelo para "Média"
        } else if (totalSelected === 4) {
            strength = 100;
            strengthColor = '#32CD32'; // Verde para "Forte"
        }

        // Atualiza a barra de força da senha com a largura e cor apropriadas
        strengthBarInner.style.width = `${strength}%`;
        strengthBarInner.style.backgroundColor = strengthColor;
    }

    // Função para copiar a senha gerada para a área de transferência
    async function copyPassword() {
        try {
            await navigator.clipboard.writeText(passwordInput.value);
            alert('Senha copiada para a área de transferência!');
        } catch (err) {
            alert('Falha ao copiar a senha.');
        }
    }

    // Adiciona os event listeners para os botões e sliders
    generateButton.addEventListener('click', generatePassword);
    copyButtons.forEach(button => button.addEventListener('click', copyPassword));
    lengthSlider.addEventListener('input', () => {
        sliderValue.textContent = lengthSlider.value;
        generatePassword(); // Regenera a senha quando o valor do slider muda
    });

    // Gera a senha ao carregar a página
    generatePassword();
});
