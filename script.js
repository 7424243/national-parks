const apiKey = '41fw12RYYwauks4D7f2c0kqLghFZWMbYQLySbdib';
const searchURL = 'https://developer.nps.gov/api/v1/parks';


function formatQueryParams(params) {
    const queryItems = Object.keys(params)
      .map(key => `${encodeURIComponent(key)}=${encodeURIComponent(params[key])}`)
    return queryItems.join('&');
  }

  function displayResults(responseJson) {
    console.log(responseJson);

    $('.results-list').empty();

      for(let i = 0; i < responseJson.data.length; i++) {
          $('.results-list').append(
              `<li><h3>${responseJson.data[i].fullName}</h3>
              <p>${responseJson.data[i].description}</p>
              <p><a href="${responseJson.data[i].url}">website</a></p>
              <p>Address: ${responseJson.data[i].addresses[0].line1}, ${responseJson.data[i].addresses[0].city}, ${responseJson.data[i].addresses[0].stateCode} ${responseJson.data[i].addresses[0].postalCode}</p>
              </li>`
          )};
      $('.results').removeAttr('hidden');
  };

  


function getParksInfo(states, limit) {

    const params = {
        api_key: apiKey,
        stateCode: states,
        limit
    };

    const queryString = formatQueryParams(params)
    const url = searchURL + '?' + queryString;

    console.log(url);

    fetch(url)
        .then(response => response.json())
        .then(responseJson => displayResults(responseJson))
        .catch(error => {
            $('.error-message').text('Something went wrong. Please try again!');
        });

}

function watchGoButton() {
    $('form').submit(event => {
        event.preventDefault();
        const states = [];

        $.each($('option:selected'), function() {
            states.push($(this).val());
        });

        const limit = $('.max-results').val();

        console.log(states);
        console.log(limit);
        getParksInfo(states ,limit);
    })
}

$(watchGoButton);