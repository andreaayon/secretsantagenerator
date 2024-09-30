document.addEventListener("DOMContentLoaded", function () {
    // Participants array
    const participants = ["Ariel", "Marisa", "Marisela", "Sebastian", "Olga", "Juan Carlos", "Lorna", "Andrea"];

    // Secret Santa generator function
    function secretSantaGenerator(participants) {
        let shuffled = [...participants];
        for (let i = shuffled.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
        }

        let secretSantaMap = {};
        for (let i = 0; i < participants.length; i++) {
            // Ensure no one is their own Secret Santa
            if (participants[i] === shuffled[i]) {
                if (i === participants.length - 1) {
                    [shuffled[i], shuffled[i - 1]] = [shuffled[i - 1], shuffled[i]];
                } else {
                    [shuffled[i], shuffled[i + 1]] = [shuffled[i + 1], shuffled[i]];
                }
            }
            secretSantaMap[participants[i].toLowerCase()] = shuffled[i];
        }

        return function getSecretSanta(name) {
            console.log(`Fetching Secret Santa for: ${name}`); // Debugging log
            const lowercaseName = name.toLowerCase();
            if (secretSantaMap[lowercaseName]) {
                return `${name}'s Secret Santa is: ${secretSantaMap[lowercaseName]}`;
            } else {
                return "Name not found in the list.";
            }
        };
    }

    // Initialize the Secret Santa generator
    const getSanta = secretSantaGenerator(participants);

    // Add an event listener for form submission
    document.getElementById('santaForm').addEventListener('submit', function(event) {
        event.preventDefault();  // Prevent form submission (page reload)

        // Get the input name
        const nameInput = document.getElementById('fname').value;

        // Get the result from the generator
        const result = getSanta(nameInput);

        // Display the result on the page
        document.getElementById('result').innerHTML = `<p>${result}</p>`;
        console.log(result); // Debugging log to check result
    });
});

