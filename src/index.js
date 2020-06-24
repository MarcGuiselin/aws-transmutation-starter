async function ShowAFunny() {
    let response = await fetch(`${process.env.API_URL}/get-funny`);
    let data = await response.json();
    document.getElementById('funny').textContent = data.message;
}

if (process.env.API_URL) {
    ShowAFunny();
}