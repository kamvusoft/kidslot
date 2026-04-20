const PROGRAMS = [
    "Infant",
    "Toddler",
    "Preschool",
    "Daycare",
    "Pre-Kindergarden",
    "After School",
    "Before School"
]

let PROVIDERS_LIST = [];
let selectedPrograms = [];

function Address(city, province) {
    this.city = city;
    this.province = province;
}

Address.prototype.toString = function() {
    return `${this.city}, ${this.province}`;
}

function Provider(name, description, address, programs, photoUrl) {
    this.name = name;
    this.description = description;
    this.address = new Address(address.city, address.province);
    this.programs = programs;
    this.photoUrl = photoUrl;
}

Provider.prototype.createProviderCard = function() {
    return `
        <div class="card">
            <div class="cover" role="img">
                <img src="${this.photoUrl}" alt="Provider cover image">
            </div>
            <div class="content">
                <h4 class="pb-3">${this.name}</h4>
                <p class="desc text-secondary text-medium">${this.description}</p>
                <p class="text-secondary pb-4 text-small py-3">
                    <i class="fa-solid fa-location-dot"></i> ${this.address.toString()}
                </p>
                <a href="#" class="btn btn-secondary">
                    More Details <i class="fa-solid fa-arrow-right-long"></i>
                </a>
            </div>
        </div>
    `
}

function loadProvidersFromAPI(onProvidersLoaded) {
    fetch('http://localhost:5500/assets/data/providers.json')
        .then(response => response.json())
        .then(providersData => {
            const providers = providersData.map(provider => new Provider(
                provider.name,
                provider.description,
                provider.address,
                provider.programs,
                provider.photoUrl
            ));
            onProvidersLoaded(providers);
        });
}

function displayProviders(providers) {
    const providersGrid = document.querySelector('.providers-grid');
    providersGrid.innerHTML = ''; // Clear existing content
    const noData = document.querySelector('.no-data');
    if(providers.length === 0) {
        if(noData.classList.contains('hide')) {
            noData.classList.remove('hide');
        }
    } else {
        if(!noData.classList.contains('hide')) {
            noData.classList.add('hide');
        }
        const content = [];
        providers.forEach(provider => {
            content.push(provider.createProviderCard());
        });
        providersGrid.innerHTML = content.join(" ");
    }
}

function handleDocumentLoaded() {
    loadProvidersFromAPI(providers => {
        PROVIDERS_LIST = [
            ...providers
        ];
        displayProviders(PROVIDERS_LIST);
    });
}

function filterProviders(query) {
    const filteredProviders = PROVIDERS_LIST.filter(provider => {
        let isEligible = (selectedPrograms.length === 0) || provider.programs.some(prg => selectedPrograms.includes(prg));
        if(query) {
            isEligible = isEligible && (provider.name.toLowerCase().includes(query) ||
                provider.description.toLowerCase().includes(query) ||
                provider.address.toString().toLowerCase().includes(query));
        }
        return isEligible;
    });
    console.log(filteredProviders);
    return filteredProviders;
}

function handleFilterProviders(event) {
    const formData = new FormData(event.target);
    const query = formData.get("filter").toLowerCase();
    displayProviders(filterProviders(query));

    // disable default form submit behavior
    event.preventDefault();
}

function toggleProgram(event) {
    const program = event.target.text;
    if(program === "All") {
        selectedPrograms = [];
    } else {
        if(selectedPrograms.includes(program)) {
            selectedPrograms = selectedPrograms.filter(p => p !== program);
        } else {
            selectedPrograms.push(program);
        }
        if(selectedPrograms.length === PROGRAMS.length) {
            // All
            selectedPrograms = [];
        }
    }
    const items = document.querySelectorAll(".program-item");
    let dataId;
    items.forEach(it => {
        dataId = it.getAttribute("data-id");
        if(selectedPrograms.length === 0) {
            if(dataId === "All") {
                it.classList.add("active");
            } else {
                it.classList.remove("active");
            }
        }
        else {
            if(selectedPrograms.includes(dataId)) {
                it.classList.add("active");
            } else {
                it.classList.remove("active");
            }
        }
    });
    //
    const filter = document.querySelector("#filter");
    const searchText = filter?.value ?? "";
    displayProviders(filterProviders(searchText.toLowerCase()));

    // disable default form submit behavior
    event.preventDefault();
}

function init() {
    document.addEventListener('DOMContentLoaded', async function(){
        handleDocumentLoaded();
    });
}

init();