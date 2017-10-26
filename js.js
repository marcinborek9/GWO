/**
 * Pobiera dane o książkach z serwera
 */
function get_response(search_string){
	let http = new XMLHttpRequest();
	let request = "https://gwo.pl/booksApi/v1/search?query=" + encodeURIComponent(search_string);
	http.open("GET", request, false);
	http.send();

	return JSON.parse(http.response);
}

/**
 * Czyści całość tabeli przed ponownym wyszukaniem
 */
function clearTable() {
	document.getElementById('wrapper-body').innerHTML = '';
}

/**
 * Buduje tabele z danymi, ktore użytkownik chce otrzymać z serwera
 */
function buildTable() {
clearTable();
	let input = document.getElementById("search-input");
	let obj = get_response(input.value);

	for (let i in obj) {
		document.getElementById('wrapper-body').innerHTML += "<tr " + "class='row-wrapper '" + ">" + 
		"<td>" + "<img " + "class='table-image '" + "src=" + obj[i].cover + ">" + 
		"<button " + "class='btn redirectBtn'" + ">" + "<a href='" + obj[i].url + "'" + ">" +  "Przejdź do księgarni" + "</a>"  + "</button>" + 
		"</td><td>" + obj[i].title + 
		"</td><td>" + obj[i].author + 
		"</td><td>" + obj[i].isbn + 
		"</td><td>" + obj[i].men + 
		"</td><td>" + obj[i].pages_count +
		"</td><td>" + obj[i].levels[0].school + ', ' + obj[i].levels[0].class
		"</td><td>" + obj[i].subject + 
		"</td><td>" + obj[i].type + 
		"</td></tr>" + "</tr>";
	}
}

/**
 * Wyszukiwanie na klawisz enter
 */
function onKeyFunction(e){
	if(e.keyCode === 13){
		e.preventDefault();
		buildTable()
	}
}
