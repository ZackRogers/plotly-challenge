d3.json('samples.json').then(function ({ names, metadata, samples }) {
    names.forEach(name => {
        d3.select('select').append('option').text(name);
    });
    showCharts();
});

function optionChanged() {
    showCharts();
};

function showCharts(){
    d3.json('samples.json').then(({metadata,samples})=>{
        var selection = d3.select('select').node().value;

        var meta = metadata.filter(obj=>obj.id == selection)[0];
        var sample = samples.filter(obj=>obj.id == selection)[0];

        d3.select('.panel-body').html('')
        Object.entries(meta).forEach(([key,val])=>{
            d3.select('.panel-body').append('h5').text(key.toUpperCase()+': '+val)
        })

        console.log(meta, sample);

        var barData = [
            {
              x: sample.sample_values.slice(0,10).reverse(),
              y: sample.otu_ids.slice(0,10).reverse().map(val=>'OTU '+val),
              type: 'bar',
              orientation: 'h'
            }
        ];
        
        Plotly.newPlot('bar', barData);
        
        var trace1 = {
            x: sample.otu_ids,
            y: sample.sample_values,
            mode: 'markers',
            marker: {
                size: sample.sample_values,
                color: sample.otu_ids
            }
          };
          
          var data = [trace1];
          
          var layout = {
            title: 'Marker Size',
            showlegend: false,
            height: 600,
            width: 600
          };
          
          Plotly.newPlot('bubble', data);
    });
};