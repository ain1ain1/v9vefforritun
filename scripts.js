// Domain URL
const API_URL = 'https://apis.is/isnic?domain=';

document.addEventListener('DOMContentLoaded', function() {
  program.init(domains);
});

/**
 * Leit að lénum á Íslandi gegnum apis.is
 */
const program = (() => {
    let domains;

    function displayDomain(domainList){
        //
        const [{ domain }] = domainList;
        const [{ registered }] = domainList;
        const [{ lastChange }] = domainList;
        const [{ expires }] = domainList;

        const dl1 = document.createElement('dl');
        const dl2 = document.createElement('dl');
        const dl3 = document.createElement('dl');
        const dl4 = document.createElement('dl');


        const [{ registrantname }] = domainList;
        const [{ email }] = domainList;
        const [{ address }] = domainList;
        const [{ country }] = domainList;

        const dl5 = document.createElement('dl');
        const dl6 = document.createElement('dl');
        const dl7 = document.createElement('dl');
        const dl8 = document.createElement('dl');

        //
        const domainElement = document.createElement('dt');
        const registeredElement = document.createElement('dt');
        const lastChangeElement = document.createElement('dt');
        const expiresElement = document.createElement('dt');

        const regustrantnameElement = document.createElement('dt');
        const emailElement = document.createElement('dt');
        const addressElement = document.createElement('dt');
        const countryElement = document.createElement('dt');

        //
        const domainValueElement = document.createElement('dd');
        const registeredValueElement = document.createElement('dd');
        const lastChangeValueElement = document.createElement('dd');
        const expiresValueElement = document.createElement('dd');

        const regustrantnameValueElement = document.createElement('dd');
        const emailValueElement = document.createElement('dd');
        const addressValueElement = document.createElement('dd');
        const countryValueElement = document.createElement('dd');

        //
        domainElement.appendChild(document.createTextNode('Lén'));
        registeredElement.appendChild(document.createTextNode('Skráð'));
        lastChangeElement.appendChild(document.createTextNode('Seinast breytt'));
        expiresElement.appendChild(document.createTextNode('Rennur út'));

        domainValueElement.appendChild(document.createTextNode(domain));
        registeredValueElement.appendChild(document.createTextNode(registered));
        lastChangeValueElement.appendChild(document.createTextNode(lastChange));
        expiresValueElement.appendChild(document.createTextNode(expires));


        registeredElement.appendChild(document.createTextNode('Skráningaraðili'));
        emailElement.appendChild(document.createTextNode('Netfang'));
        addressElement.appendChild(document.createTextNode('Heimilisfang'));
        countryElement.appendChild(document.createTextNode('Land'));

        registeredValueElement.appendChild(document.createTextNode(registrantname));
        emailValueElement.appendChild(document.createTextNode(email));
        addressValueElement.appendChild(document.createTextNode(address));
        countryValueElement.appendChild(document.createTextNode(country));


        //
        dl1.appendChild(domainElement);
        dl2.appendChild(registeredElement);
        dl3.appendChild(lastChangeElement);
        dl4.appendChild(expiresElement);

        dl1.appendChild(domainValueElement);
        dl2.appendChild(registeredValueElement);
        dl3.appendChild(lastChangeValueElement);
        dl4.appendChild(expiresValueElement);


        dl5.appendChild(registrantnameElement);
        dl6.appendChild(emailElement);
        dl7.appendChild(addressElement);
        dl8.appendChild(countryElement);

        dl5.appendChild(registrantnameValueElement);
        dl6.appendChild(emailValueElement);
        dl7.appendChild(addressValueElement);
        dl8.appendChild(countryValueElement);

        const container = domains.querySelector('.results');
        while (innnihald.firstChild) {
            container.removeChild(container.firstChild);
        }

        empty(container, dl1, domainValueElement);
        empty(container, dl2, registeredValueElement);
        empty(container, dl3, lastChangeValueElement);
        empty(container, dl4, expiresValueElement);

        empty(container, dl5, registeredValueElement);
        empty(container, dl6, emailValueElement);
        empty(container, dl7, addressValueElement);
        empty(container, dl8, countryValueElement);
    }

    function empty(gildi, dlValue, ddValue){
        if(ddValue.innnerText === ""){
            console.log('Lén verður að vera strengur');
            result;
        }
        else{
            return gildi.appendChild(dlValue);
        }
    }

    function displayError(){
        const container = domains.querySelector('.result');
        while (innnihald.firstChild){
            container.removeChild(container.firstChild);
        }
        container.appendChild(document.createTextNode(error));
    }

    function time(x) {
        var ný = new Date(x);
        d = ný.getDate();
        if(d<9) {
            d ='0'+d;
        }
        m = (ný.getMonth()+1);
        if(m<9) {
            m='0'+m;
        }
        y =ný.getFullYear();
        return (y +'-'+m +'-'+ d);
    }

    function loadingMynd(){
        const insert = document.createElement('div');
        const image = document.createElement('img');
        const text = document.createElement('p');

        insert.setAttribute('class', 'loading');
        image.setAttribute('src', 'https://raw.githubusercontent.com/veffirrutun/vef1-2018-v9/master/loading.gif');
        insert.appendChild(image);

        text.appendChild(document.createTextNode('Leita að léni'));
        insert.appendChild(text);

        const container = domains.querySelector('.results');
        container.appendChild(insert);
    }

    function fetchData(number){
        fetch(`${API_URL}${number}`)
            .then(
                loading()  
            )
            .then((response) => {
                return response.json();
            })
            .then((data) => {
                const container = domains.querySelector('.results');
                container.removeChild(container.firstChild);
                displayDomain(data.results);
            })
            .catch((error) => {
                displayError('Lén er ekki skráð');
            })
        }

    function onSubmit(gildi){
        gildi.preventDefault();
        const input = gildi.target.querySelector('input');
        const container = domains.querySelector('.results');
    
        while (container.firstChild) {
          container.removeChild(container.firstChild);
        }
    
        if(input.value == '') {
            displayError('Lén verður að vera strengur');
        }
        else {
            fetchData(input.value);
        }
      }

    function init(_domains) {
        domains = _domains
        
        const form = domains.querySelector('form');
        form.addEventListener('submit', onSubmit);
    }
  
    return {
      init,
    };
  })();