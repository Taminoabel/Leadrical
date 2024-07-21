document.getElementById('hamburger').addEventListener('click', function() {
    const sidebar = document.getElementById('sidebar');
    const hamburger = document.getElementById('hamburger');
    sidebar.classList.toggle('active');
    hamburger.classList.toggle('hidden');
});

document.getElementById('close-sidebar').addEventListener('click', function() {
    const sidebar = document.getElementById('sidebar');
    const hamburger = document.getElementById('hamburger');
    sidebar.classList.remove('active');
    hamburger.classList.remove('hidden');
});

document.getElementById('logout').addEventListener('click', function() {
    // Implement logout functionality here
    alert('Logged out');
});

function showSection(sectionId) {
    const sections = document.querySelectorAll('.content-section');
    sections.forEach(section => section.classList.remove('active'));
    document.getElementById(sectionId).classList.add('active');
}

// Show the overview section by default
document.addEventListener('DOMContentLoaded', function() {
    showSection('overview');

    // Initialize Select2 for countries
    // $('#country').select2({
    //     placeholder: 'Select a country',
    //     allowClear: true,
    //     ajax: {
    //         url: 'https://restcountries.com/v3.1/all',
    //         processResults: function(data) {
    //             return {
    //                 results: data.map(country => ({
    //                     id: country.name.common,
    //                     text: country.name.common
    //                 }))
    //             };
    //         }
    //     }
    // });

    // Initialize Select2 for niches
    $('#niche').select2({
        placeholder: 'Select a niche',
        allowClear: true,
        data: [
            { id: 'ecommerce', text: 'Ecommerce' },
            { id: 'digital-marketing', text: 'Digital Marketing' },
            { id: 'health', text: 'Health' },
            { id: 'real-estate', text: 'Real Estate' },
            { id: 'internet-marketing', text: 'Internet Marketing' }
        ]
    });

    // Initialize Select2 for demographics
    $('#demographics').select2({
        placeholder: 'Select demographics',
        allowClear: true,
        data: [
            { id: 'age-18-24', text: 'Age 18-24' },
            { id: 'age-25-34', text: 'Age 25-34' },
            { id: 'age-35-44', text: 'Age 35-44' },
            { id: 'age-45-54', text: 'Age 45-54' },
            { id: 'age-55-64', text: 'Age 55-64' },
            { id: 'age-65-plus', text: 'Age 65+' }
        ]
    });
});

        const ctx = document.getElementById('myChart').getContext('2d');
        const myChart = new Chart(ctx, {
            type: 'line', // You can change this to 'bar', 'pie', etc.
            data: {
                labels: ['5th Jan, 2024', '8th Feb, 2024', '5th Mar, 2024', '6th Apr, 2024', '15th May, 2024', '2nd Jun, 2024'],
                datasets: [{
                    label: 'Traffic',
                    data: [123111, 12001, 123001, 112001, 120001, 12001],
                    borderColor: 'rgba(75, 192, 192, 1)',
                    borderWidth: 1,
                    fill: false
                },
                {
                    label: 'Leads',
                    data: [15000, 10000, 15000, 17000, 30000, 15000],
                    borderColor: 'rgba(153, 102, 255, 1)',
                    borderWidth: 1,
                    fill: false
                },
                {
                    label: 'Sales',
                    data: [30000, 5000, 30000, 35000, 3000, 30000],
                    borderColor: 'rgba(255, 159, 64, 1)',
                    borderWidth: 1,
                    fill: false
                }]
            },
            options: {
                scales: {
                    y: {
                        beginAtZero: true
                    }
                }
            }
        });

        document.getElementById('fileInput').addEventListener('change', handleFileSelect);
document.getElementById('processButton').addEventListener('click', processFile);
document.getElementById('proceedButton').addEventListener('click', () => {
    window.location.href = 'email_dashboard.html';
});

const itemsPerPage = 10;
let workbookData;
let jsonData;
let currentPage = 0;

function handleFileSelect(event) {
    const file = event.target.files[0];
    if (file) {
        const reader = new FileReader();
        reader.onload = function(e) {
            const data = new Uint8Array(e.target.result);
            workbookData = XLSX.read(data, { type: 'array' });
            document.getElementById('processButton').disabled = false;
        };
        reader.readAsArrayBuffer(file);
    }
}

function processFile() {
    const firstSheetName = workbookData.SheetNames[0];
    const worksheet = workbookData.Sheets[firstSheetName];
    jsonData = XLSX.utils.sheet_to_json(worksheet);

    document.getElementById('fileInput').style.display = 'none';
    document.getElementById('processButton').style.display = 'none';

    currentPage = 0;
    displayPage();
    document.getElementById('proceedButton').style.display = 'inline-block';
}

function displayPage() {
    const overview = document.getElementById('overview-upload');
    overview.innerHTML = '<h2>Overview</h2>';

    const table = document.createElement('table');
    table.border = 1;

    const headerRow = document.createElement('tr');
    const headers = ['Name', 'Email', 'Phone'];
    headers.forEach(header => {
        const th = document.createElement('th');
        th.textContent = header;
        headerRow.appendChild(th);
    });
    table.appendChild(headerRow);

    const startIndex = currentPage * itemsPerPage;
    const endIndex = Math.min(startIndex + itemsPerPage, jsonData.length);

    for (let i = startIndex; i < endIndex; i++) {
        const row = document.createElement('tr');
        headers.forEach(header => {
            const cell = document.createElement('td');
            cell.textContent = jsonData[i][header] || '';
            row.appendChild(cell);
        });
        table.appendChild(row);
    }

    overview.appendChild(table);

    if (endIndex < jsonData.length) {
        const nextButton = document.createElement('button');
        nextButton.textContent = 'Next';
        nextButton.addEventListener('click', () => {
            currentPage++;
            displayPage();
        });
        overview.appendChild(nextButton);
    }
}
