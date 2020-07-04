function statistiques1 (labels,positifsDates,negatifsDates) {
    var ctx = document.getElementById('myChart1').getContext('2d');
    var chart = new Chart(ctx, {
        type: 'line',
        data: {
            labels,
            datasets: [{
                label: 'Cas Positifs',
                borderColor: '#ff3548',
                backgroundColor: 'transparent',
                data:positifsDates
            }, {
              label: 'Cas Négatifs',
              borderColor: '#49e66d',
              backgroundColor: 'transparent',
              data:negatifsDates
          }]
        },
        options: {}
    });
}

function statistiques2 (positifsVilles,noms) {
    var ctx = document.getElementById('myChart2').getContext('2d');
    var myPieChart = new Chart(ctx, {
      type: 'doughnut',
      data: {
        labels: noms,
        datasets: [{
            label: 'Cas Positifs',
            borderColor: ['#2a0036', '#92db48', '#ffc31f', '#ff351f', '#45daf5','#3824a6'],
            backgroundColor: ['#2a0036', '#92db48', '#ffc31f', '#ff351f', '#45daf5','#3824a6'],
            data: positifsVilles
        }]
    },
    options: {}
  });
}

function dates (date){
    var table=[0,0,0,0,0,0,0,0,0,0]
    const options = {month: 'long', day: 'numeric'};
    for(i=0;i<10;i++){
        table[i]=new Date(new Date(date) -(9-i) * 24 * 60 * 60 * 1000)
            .toLocaleDateString('fr-FR', options);
    }
    return table;
}

function focusDef() {
    document.getElementById('focusDef').focus();
    document.getElementById('focusDef').style.outline = 'none';
}

