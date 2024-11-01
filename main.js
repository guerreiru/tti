document.getElementById("textForm").addEventListener("submit", async (e) => {
  e.preventDefault();

  const apiKey = document.getElementById("apiKey").value;
  const inputText = document.getElementById("textInput").value;
  const btnSubmit = document.getElementById("btn-submit");

  btnSubmit.setAttribute("disabled", "");

  const response = await fetch(
    "https://api-inference.huggingface.co/models/stabilityai/stable-diffusion-3.5-large",
    {
      headers: {
        Authorization: `Bearer ${apiKey}`,
        "Content-Type": "application/json",
      },
      method: "POST",
      body: JSON.stringify(inputText),
    }
  );

  if (response.ok) {
    const blob = await response.blob();
    const imageUrl = URL.createObjectURL(blob);

    const outputDiv = document.getElementById("output");
    outputDiv.innerHTML = `<img src="${imageUrl}" alt="Generated Image">`;
  } else {
    alert("Error generating image.");
  }

  btnSubmit.removeAttribute("disabled");
});
