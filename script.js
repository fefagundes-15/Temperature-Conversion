document.addEventListener("DOMContentLoaded", function () {
    const firstInput = document.getElementById("firstInput");
    const secondInput = document.getElementById("secondInput");
    const firstSelect = document.getElementById("firstSelect");
    const secondSelect = document.getElementById("secondSelect");
    const firstSymbol = document.getElementById("firstSymbol");
    const secondSymbol = document.getElementById("secondSymbol");

    function clearInputs() {
        firstInput.value = '';
        secondInput.value = '';
    }

    // Atualizar símbolos imediatamente após o carregamento da página
    updateSymbol(firstSelect, firstSymbol);
    updateSymbol(secondSelect, secondSymbol);

    // Adicionar event listeners para limpar inputs ao mudar seleção
    firstSelect.addEventListener("change", function () {
        clearInputs();
        updateSymbol(firstSelect, firstSymbol);  // Atualiza o símbolo quando o selection muda
    });

    // Adicionar event listeners para limpar inputs ao mudar seleção
    secondSelect.addEventListener("change", function () {
        clearInputs();
        updateSymbol(secondSelect, secondSymbol);  // Atualiza o símbolo quando o selection muda
    });

    // Função para atualizar o símbolo de temperatura
    function updateSymbol(select, symbol) {
        switch (select.value) {
            case "CEL":
                symbol.textContent = "ºC";
                break;
            case "FAH":
                symbol.textContent = "ºF";
                break;
            case "KEL":
                symbol.textContent = "K";
                break;
            default:
                symbol.textContent = "";  // Um fallback em caso de seleção inválida
                break;
        }
    }


    // Função para converter moedas
    function convertTemperature(inputValue, fromTemperature, toTemperature) {
        if (isNaN(inputValue) || inputValue === '') {
            return '';
        }

        switch (fromTemperature) {
            case "CEL":
                switch (toTemperature) {
                    case "FAH":
                        return celsiusToFahrenheit(inputValue);
                    case "KEL":
                        return celsiusToKelvin(inputValue);
                    default:
                        return inputValue; // CEL para CEL
                }

            case "FAH":
                switch (toTemperature) {
                    case "KEL":
                        return fahrenheitToKelvin(inputValue);
                    case "CEL":
                        return fahrenheitToCelsius(inputValue);
                    default:
                        return inputValue; // FAH para FAH
                }

            case "KEL":
                switch (toTemperature) {
                    case "FAH":
                        return kelvinToFahrenheit(inputValue);
                    case "CEL":
                        return kelvinToCelsius(inputValue);
                    default:
                        return inputValue; // KEL para KEL
                }

            default:
                return "Invalid temperature selection"; // Fallback para seleção inválida
        }
    }

    // Funções de conversão
    function celsiusToFahrenheit(celsius) {
        celsius = parseFloat(celsius);
        return ((celsius * 9 / 5) + 32).toFixed(2);
    }

    function celsiusToKelvin(celsius) {
        celsius = parseFloat(celsius);
        return (celsius + 273.15).toFixed(2);
    }

    function fahrenheitToKelvin(fahrenheit) {
        fahrenheit = parseFloat(fahrenheit);
        return ((fahrenheit - 32) * 5 / 9 + 273.15).toFixed(2);
    }

    function fahrenheitToCelsius(fahrenheit) {
        fahrenheit = parseFloat(fahrenheit);
        return ((fahrenheit - 32) * 5 / 9).toFixed(2);
    }

    function kelvinToFahrenheit(kelvin) {
        kelvin = parseFloat(kelvin);
        return ((kelvin - 273.15) * 9 / 5 + 32).toFixed(2);
    }

    function kelvinToCelsius(kelvin) {
        kelvin = parseFloat(kelvin);
        return (kelvin - 273.15).toFixed(2);
    }

    // Adicionar listener de input ao primeiro campo
    firstInput.addEventListener("input", function () {
        secondInput.classList.remove("fade-in");
        secondInput.classList.add("fade-out");

        setTimeout(() => {
            const calculatedValue = convertTemperature(firstInput.value, firstSelect.value, secondSelect.value);
            secondInput.value = calculatedValue;
            secondInput.classList.remove("fade-out");
            secondInput.classList.add("fade-in");
        }, 300);
    });

    // Adicionar listener de input ao segundo campo (cálculo inverso)
    secondInput.addEventListener("input", function () {
        firstInput.classList.remove("fade-in");
        firstInput.classList.add("fade-out");

        setTimeout(() => {
            const calculatedValue = convertTemperature(secondInput.value, secondSelect.value, firstSelect.value);
            firstInput.value = calculatedValue;
            firstInput.classList.remove("fade-out");
            firstInput.classList.add("fade-in");
        }, 300);
    });
});