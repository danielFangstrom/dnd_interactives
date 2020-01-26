// Aliases for quick access
let Application = PIXI.Application,
    resources = PIXI.loader.resources,
    Sprite = PIXI.Sprite,
    Graphics = PIXI.Graphics;

// Welcome message with version and canvas type information
let type = "WebGL"
if(!PIXI.utils.isWebGLSupported()){
    type = "canvas"
}
PIXI.utils.sayHello(type);

// game globals
var widgets = new Array();
let state;
let app;

const CANVAS_X_OFFSET = 95;
const CANVAS_Y_OFFSEY = 70;

const pixi_canvas = document.getElementById("pixi_canvas")

function init() {
    app = new Application({
        width: 1600 - 2*(CANVAS_X_OFFSET),
        height: 1200 - 2*(CANVAS_Y_OFFSEY),
        antialias: true,
        transparent: true,
        resolution: 1,
        view: document.getElementById("pixi_canvas")
    });
    
    // // insert canvas into DOM
    // document.body.appendChild(app.view);

    // load main textures
    PIXI.loader
        .add([])
        .on('progress', loadProgressHandler)
        .load(setup);

    function loadProgressHandler(loader, resource) {
        console.log('Loading texture ' + resource.url + ', total: ' + loader.progress.toFixed(0) + '% done.');
    }
}

function setup() {
    //Set the game state
    state = game_init;

    // start game loop
    app.ticker.add(delta => gameLoop(delta));
}

function gameLoop(delta) {
    state(delta);
}

function game_init() {
    console.log('Initializing game state')

    // matrix widget
    var matrix = new Matrix();
    widgets.push(matrix);
    matrix.visual.position.set(550, 450);

    // slider widget
    for (let sli = 0; sli < 5; sli++) {
        var slider = new Slider(8, 300);
        slider.visual.position.y = 50*sli;
        widgets.push(slider);
    }
    
    state = play;
    console.log('Switching state to "play"');
}

function play(delta) {
    for (let wi = 0; wi < widgets.length; wi++) {
        let widget = widgets[wi];
        widget.update(delta);
    }
}


