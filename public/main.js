const form =document.getElementById("vote-form");

form.addEventListener("submit", e => {
//

const choice = document.querySelector("input[name=os]:checked").value;
const data =  { os: choice };

fetch("http://localhost:5000/poll", {
  method: "post",
  body: JSON.stringify(data),
  headers :new Headers({
    "Content-Type":"application/json"
  })
})
.then(res => res.json())
.then(data => console.log(data))
.then(err => console.log(err));
e.preventDefault();
});

fetch("http://localhost:5000/poll").then(res => res.json())
.then(data => {
  const votes = data.votes;
  const totalVote = votes.length;

  const voteCounts = votes.reduce((acc, vote) => ((acc[vote.os] = (acc[vote.os] || 0) + parseInt(vote.points)), acc), {});

 
let dataPoints = [
    {label: 'Windows', y : voteCounts.Windows},
    {label: 'MacOs', y : voteCounts.MacOs},
    {label: 'Linux', y : voteCounts.Linux},
    {label: 'Others', y : voteCounts.Others}
   ];

   const chartContainer = document.querySelector("#chartContainer");


if(chartContainer) {
  var  chart =  new  CanvasJS.Chart("chartContainer", {
    animationEnabled: true,
    theme: 'theme1',
    title: {
    text : `Total Vote(s) is ${totalVote}`
  },
data:[ 
  {
   type: "column",
   dataPoints: dataPoints
}
]
});
chart.render();

Pusher.logToConsole = true;

var pusher = new Pusher('YOUR_PUSHER_KEY', {
  cluster: 'eu',
  forceTLS: true
});

var channel = pusher.subscribe('os-poll');
channel.bind('os-vote', function(data) {
  //alert(JSON.stringify(data));
  dataPoints = dataPoints.map(x=> {
    if(x.label == data.os) {
      x.y += data.points;
      return x;
    }else {
      return x;
    }
  });
  chart.render();
});
}

});


var lineDrawing = anime({
    targets: '#lineDrawing .lines path',
    strokeDashoffset: [anime.setDashoffset, 0],
    easing: 'easeInOutSine',
    duration: 5500,
    delay: function(el, i) { return i * 250 },
    direction: 'alternate',
    loop: true
  });
  