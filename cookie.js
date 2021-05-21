
document.cookie = "user=Kim"
console.log(document.cookie);
function old() {
  /**
   * Get the user IP throught the webkitRTCPeerConnection
   * @param onNewIP {Function} listener function to expose the IP locally
   * @return undefined
   */
  function getUserIP(onNewIP) { //  onNewIp - your listener function for new IPs
      //compatibility for firefox and chrome
      var myPeerConnection = window.RTCPeerConnection || window.mozRTCPeerConnection || window.webkitRTCPeerConnection;
      var pc = new myPeerConnection({
          iceServers: []
      }),
      noop = function() {},
      localIPs = {},
      ipRegex = /([0-9]{1,3}(\.[0-9]{1,3}){3}|[a-f0-9]{1,4}(:[a-f0-9]{1,4}){7})/g,
      key;

      function iterateIP(ip) {
          if (!localIPs[ip]) onNewIP(ip);
          localIPs[ip] = true;
      }

       //create a bogus data channel
      pc.createDataChannel("");

      // create offer and set local description
      pc.createOffer().then(function(sdp) {
          sdp.sdp.split('\n').forEach(function(line) {
              if (line.indexOf('candidate') < 0) return;
              line.match(ipRegex).forEach(iterateIP);
          });

          pc.setLocalDescription(sdp, noop, noop);
      }).catch(function(reason) {
          // An error occurred, so handle the failure to connect
      });

      //listen for candidate events
      pc.onicecandidate = function(ice) {
          if (!ice || !ice.candidate || !ice.candidate.candidate || !ice.candidate.candidate.match(ipRegex)) return;
          ice.candidate.candidate.match(ipRegex).forEach(iterateIP);
      };
  }

  // Usage

  getUserIP(function(ip){
      alert("Got IP! :" + ip);
  });

}

function json(url) {
  return fetch(url).then(res => res.json());
}

let apiKey = 'd8a8e4535e5b1518f376f7548c3d64bb540c0546dc1e72b4c509c435';
json(`https://api.ipdata.co?api-key=${apiKey}`).then(data => {
  console.log(data.ip);
  console.log(data.city);
  console.log(data.country_code);
  document.cookie = "ip="+data.ip;
  // so many more properties
});

var form = document.getElementById("my-form");

async function handleSubmit(event) {
  event.preventDefault();
  var data = new FormData(event.target);
  let shit = 'shit'
  data.append(shit)
  console.log(data);
  fetch(event.target.action, {
    method: form.method,
    body: data,
    headers: {
        'Accept': 'application/json'
    }
  })
  console.log(event.target);
  console.log(event.target.action);
}
form.addEventListener("submit", handleSubmit)
console.log('hello allo!!');
