document.addEventListener('DOMContentLoaded', function () {
    const saveEntryButton = document.getElementById('saveEntry');
    const entryDateInput = document.getElementById('entryDate');
    const entryTextArea = document.getElementById('entryText');
    const entriesContainer = document.getElementById('entriesContainer');

    // Set today's date in the date input
    const today = new Date();
    const formattedDate = today.toISOString().split('T')[0]; // Format date to YYYY-MM-DD
    entryDateInput.value = formattedDate;

    // Load existing entries from localStorage
    loadEntries();

    saveEntryButton.addEventListener('click', function () {
        const date = entryDateInput.value;
        const entryText = entryTextArea.value;

        if (date && entryText) {
            saveEntry(date, entryText);
            entryTextArea.value = ''; // Clear the textarea
            loadEntries(); // Refresh the displayed entries
        } else {
            alert("Please fill out both fields.");
        }
    });

    function saveEntry(date, entryText) {
        const entries = JSON.parse(localStorage.getItem('diaryEntries')) || [];
        const newEntry = { date, text: entryText };
        entries.push(newEntry);
        localStorage.setItem('diaryEntries', JSON.stringify(entries));
    }

    function loadEntries() {
        entriesContainer.innerHTML = ''; // Clear existing entries
        const entries = JSON.parse(localStorage.getItem('diaryEntries')) || [];
        
        entries.forEach(entry => {
            const entryCard = document.createElement('div');
            entryCard.classList.add('entry-card');

            const entryDate = document.createElement('div');
            entryDate.classList.add('entry-date');
            entryDate.textContent = entry.date;

            const entryText = document.createElement('div');
            entryText.classList.add('entry-text');
            entryText.textContent = entry.text;

            entryCard.appendChild(entryDate);
            entryCard.appendChild(entryText);
            entriesContainer.appendChild(entryCard);
        });
    }
});
