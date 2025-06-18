/*

async function saludarConRetraaso() {
    console.log("Iniciando saludo...");
    // return new Promise(resolve => {
    //     setTimeout(() => {
    //         console.log("Saludos después de un retraso.");
    //         resolve();
    //     }, 2000); // Retraso de 2 segundos
    // });

    await new Promise(resolve => setTimeout(resolve,4000)); // Retraso de 4 segundos
    console.log("Hola después de 4 segundos de espera.");
     
}


saludarConRetraaso();// El código anterior define una función asíncrona que imprime un saludo y luego espera 2 segundos antes de imprimir otro mensaje.
// La función se llama al final para ejecutar el saludo con retraso.

*/

document.addEventListener("DOMContentLoaded", () => {
  const countryInput = document.getElementById("country");
  const cityInput = document.getElementById("city");
  const getWeatherBtn = document.getElementById("getWeatherBtn");

  const displayCity = document.getElementById("display-city");
  const temperatureDisplay = document.getElementById("temperature");
  const descriptionDisplay = document.getElementById("description");
  const humidityDisplay = document.getElementById("humidity");

  const errorMessage = document.getElementById("error-message");

  const API_KEY = "1514f7ce0a7253d400ff2ce2efbb3d77";

  getWeatherBtn.addEventListener("click", async () => {
    const country = countryInput.value.trim();
    const city = cityInput.value.trim();

    errorMessage.textContent = ""; // Limpiar mensajes de error}
    displayCity.textContent = "N/A";
    temperatureDisplay.textContent = "N/A";
    descriptionDisplay.textContent = "N/A";
    humidityDisplay.textContent = "N/A";

    if (!country || !city) {
      errorMessage.textContent = "Por favor, ingresa un país y una ciudad.";
      return;
    }

    errorMessage.textContent = ""; // Limpiar mensajes de error

    try {
      /*const response = await fetch(`https://api.openweathermap.org/data/2.5/weather?q=${city},${country}&appid=${API_KEY}&units=metric`);
            if (!response.ok) {
                throw new Error("Ciudad no encontrada");
            }
            const data = await response.json();
            */

      const url = `https://api.openweathermap.org/data/2.5/weather?q=${city},${country}&appid=${API_KEY}&units=metric&lang=es`;
      response = await fetch(url);      

      if (!response.ok) {
        if (response.status === 404) {
          throw new Error("Pais o Ciudad no encontrada");
        } else {
          throw new Error(`Error en la solicitud: ${response.status} ${response.statusText}`);
        }       
      }
      else
        {
            const data = await response.json();
            
            displayCity.textContent = `${data.name}, ${data.sys.country}`;
            temperatureDisplay.textContent = `${data.main.temp} °C`;
            descriptionDisplay.textContent = `${data.weather[0].description.charAt(0).toUpperCase()}${data.weather[0].description.slice(1)}`;
            humidityDisplay.textContent = `${data.main.humidity}%`;
        }
    } catch (error) {
        console.log('Hubo un problema con la operacion del fetch :', error);
        errorMessage.textContent = error.message;
    }
  });

  // button.addEventListener("click", async () => {
  //     output.textContent = "Cargando...";
  //     await new Promise(resolve => setTimeout(resolve, 2000)); // Simula una carga de 2 segundos
  //     output.textContent = "¡Hola, mundo!";
  // });
});
