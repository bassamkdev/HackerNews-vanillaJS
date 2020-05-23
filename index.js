var BASE_URL = 'https://hn.algolia.com/api/v1/';

(function handleEvent () {
    document.getElementById('submit-button').addEventListener('click', onSearch)
})()

function onSearch () {
    removeList('list')
    doSearch(getInputValueById('search-input'))
    .then(appendList)
}

function getInputValueById (id) {
    return document.getElementById(id).value
} 

function doSearch (query) {
    let url =  BASE_URL + 'search?query=' + query + '&hitsPerPage=200';
    return fetch(url).then(res => res.json())
    .then(data => {return data.hits})

}

function appendList (list) {
    let listNode = document.createElement('div')
    listNode.setAttribute('id', 'list')
    document.getElementById('app').appendChild(listNode)

    list.forEach(appendItem(listNode))
}

function appendItem (listNode) {
    return function (item) {
        var itemNode = document.createElement('div')
        itemNode.appendChild(document.createTextNode(item.title))
        listNode.appendChild(itemNode)
    }
}

function removeList (id) {
    var listNode = document.getElementById(id)
    if (listNode) {
        listNode.parentNode.removeChild(listNode)
    }
}