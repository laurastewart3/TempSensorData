function setup(){
    createCanvas(600, 400);
    noStroke();
    var url = 'https://api.mlab.com/api/1/databases/temperatures/collections/temperatureroundhouses?apiKey=6YfyvoY0MOJ_PNIpfgQpa_JFm9iKC-yd'
    loadJSON(url, drawData);
    
    function drawData(data){
        console.log(data); //inspect the JSON
        background(0);
        for (var i = 0; i < data.length; i++){
            fill(0, 255, 255, 200);
            ellipse(random(width), random(height), data[i].temperature, data[i].temperature);
           
            fill(255, 0, 255, 200);
            ellipse(random(width), random(height), data[i].temperature, data[i].temperature);
            
            fill(255, 255, 0, 200);
            ellipse(random(width), random(height), data[i].temperature, data[i].temperature);
            
        }
    }
}
