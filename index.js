var database;
var player;
var playerCount;
var PlayerCount = 0;
var OnlinePLayers = [];
var game;
var availableColors = [];

function preload() {

}

function setup() {
    canvas = createCanvas(1000, 600);
    database = firebase.database();
    game = new Game()
}

function draw() {
    background(0, 0, 0);
    game.run()
}