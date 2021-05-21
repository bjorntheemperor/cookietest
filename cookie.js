
function json(url) {
  return fetch(url).then(res => res.json());
}

let apiKey = 'd8a8e4535e5b1518f376f7548c3d64bb540c0546dc1e72b4c509c435';
json(`https://api.ipdata.co?api-key=${apiKey}`).then(data => {
  console.log(data.ip);
  console.log(data.city);
  console.log(data.country_code);
  document.cookie = "ip="+data.ip;
  document.cookie = "city="+data.city;
  document.cookie = "country="+data.country_code;
  // so many more properties
});

var form = document.getElementById("my-form");

async function handleSubmit(event) {
  event.preventDefault();
  var data = new FormData(event.target);
  let shit = 'shit'
  data.append('message', document.cookie)
  console.log(data);
  fetch(event.target.action, {
    method: "POST",
    body: data,
    headers: {
        'Accept': 'application/json'
    }
  })
  console.log(event.target);
  console.log(event.target.action);
}
form.addEventListener("submit", handleSubmit)
