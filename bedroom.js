status = "";
img = "";
objects = [];

function preload(){
    img = loadImage("Bedroom.jpg");
}

function setup(){
    canvas = createCanvas(640, 420);
    canvas.center();
    objectDetector = ml5.objectDetector("cocossd", modelLoaded);
    document.getElementById("status").innerHTML = "Status: Detecting Objects";
}

function modelLoaded(){
    console.log("Model Loaded");
    status = true;
    objectDetector.detect(img, gotResult);
}

function gotResult(error, results){
    if(error){
        console.log(error);
    }

    else{
        console.log(results);
        objects = results;
    }
}

function draw(){
    image(img, 0, 0, 640, 420);
    
    if(status != " "){
        for(i = 0; i < objects.length; i++){
            document.getElementById("status").innerHTML = "Status: Object Detected";

            fill('#fc8803');
            percent = floor(objects[i].confidence * 100);
            text(objects[i].label + " " + percent + "%", objects[i].x, objects[i].y);
            noFill();
            stroke('#fc8803');
            rect(objects[i].x, objects[i].y, objects[i].width, objects[i].height);
            document.getElementById("no_objects_detected").innerHTML = "There are 3 big objects in the image and CocoSSD has dected 1 objects";
        }
    }
}

function back(){
    open("index.html", "_self");
}