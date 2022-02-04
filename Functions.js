function dateFormatter(date) {

    const monthNames = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
    const day = date.getDate();
    const month = monthNames[date.getMonth()];
    const year = date.getFullYear();

    return `${month} ${day}, ${year}`;
}

function totalResutls(total, query) {
    if (total != 0) {
        document.querySelector('.results').innerHTML = `Hay un total de ${total} resultados acerca de <span class="colorQuery">${query}</span>.`;
        document.querySelector('.results').style.display = 'block'
    } else {
        document.querySelector('.results').innerHTML = `No hay resultados disponibles acerca de <span class="colorQuery">${query}</span>.`;
        document.querySelector('.results').style.display = 'block'
    }
}

function newQuery() {
    document.querySelector('.spinner-case').classList.remove('hidden');
    var newQ = document.querySelector('.input');
    getDataFromApi(newQ.value);
}

function printList(list) {
    let listElements = '';
    var count = 0;

    list.forEach(function(element, i) {
        count++;
        var date = new Date(element.created_at);
        if (element.title == '' || element.title == null) {
            return;
        }

        listElements += `
            <tr class="row">
                <td class="firstColumn">
                    ${count}
                </td>
                <td class="secondColumn">
                    <div class= "ellipsis">
                        ${element.title}
                    </div>
                </td>
                <td class="thirdColumn">
                    ${dateFormatter(date)}
                </td>
                <td class="fourthColumn">
                    ${element.points}
                </td>
                <td class="fifthColumn">
                    @${element.author}
                </td>
                <td class="sixthColumn">
                    <a href=${element.url}><img src="https://img.icons8.com/material-two-tone/24/000000/link--v1.png"/></a>
                </td>
            </tr>
            `;
    });
    document.querySelector('table').innerHTML = `<tr class="firstRow">
            <th class="firstColumn"></th>
            <th class="secondColumn">Titulo</th>
            <th class="thirdColumn">Fecha</th>
            <th class="fourthColumn"><span class="points">Puntos</span></th>
            <th class="fifthColumn"><span class="author">Autor</span></th>
            <th class="sixthColumn">Link</th>
        </tr> ${listElements}`
}


async function getDataFromApi(query) {
    var url = 'https://hn.algolia.com/api/v1/search?query=' + query;

    var miRespuesta = await fetch(url, {
        method: 'GET'
    }).then(function(response) {
        return response.json();
    });

    document.querySelector('.spinner-case').classList.add('hidden');
    printList(miRespuesta.hits);

    var total = miRespuesta.nbHits;
    totalResutls(total, query);
}

getDataFromApi('angular');