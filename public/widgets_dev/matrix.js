const state_colors = [0xFFFFFF, 0x3b8172, 0xb54be1, 0x308dcb, 0x712257]
const state_colors_hover = [0xDDDDDD, 0x1b6152, 0x952bc1, 0x106dab, 0x510237]
const MatrixTileWidth = 40;
const M = 8;
const N = 8;

// load widget textures
PIXI.loader.add([]);

function Node(m, n, container, trigger_callback) {
    const node = this;
    node.container = container;
    node.m = m;
    node.n = n;
    node.x = n*MatrixTileWidth;
    node.y = m*MatrixTileWidth;
    node.w = node.h = MatrixTileWidth;
    node.state = randomInt(0, 4);
    node.highlighted = false;
    node.trigger_callback = trigger_callback;
    node.sprite = new Sprite();
    node.gfx = new Graphics();
    node.gfx.interactive = true;
    node.gfx.buttonMode = true;
    node.gfx.hitArea = new PIXI.Rectangle(node.x, node.y, node.w, node.h);

    node.draw = function() {
        node.gfx.clear();
        node.gfx.lineStyle(1.5, 0x000000, 1);
        node.gfx.beginFill(node.highlighted? state_colors_hover[node.state] : state_colors[node.state]);
        node.gfx.drawRect(node.x, node.y, node.w, node.h);
        node.gfx.endFill();
    }

    node.draw();

    node.gfx.click = function(e) {
        node.state += 1;
        if (node.state > 4) {
            node.state = 0;
        }
        node.draw();
        node.trigger_callback();
    }

    node.gfx
        .on('pointerover', function(e) { node.highlighted = true; node.draw()})
        .on('pointerout', function(e) { node.highlighted = false; node.draw()});

    node.container.addChild(node.gfx);
}

function Matrix() {
    const matrix = this;
    matrix.tile_size = 40;
    matrix.M = M;
    matrix.N = N;
    matrix.visual = new PIXI.Container();
    matrix.visual.sortableChildren = true;
    console.log('Creating matrix object');

    matrix.recalculate = function() {

    }

    matrix.nodes = new Array(M+2);
    for (var m=0; m<matrix.nodes.length; m++) {
        matrix.nodes[m] = new Array(N+2);
        for (let n = 0; n < matrix.nodes[m].length; n++) {
            matrix.nodes[m][n] = new Node(m, n, matrix.visual, matrix.recalculate);
        }
    }

    matrix.update = function(delta) {
        
    }

    app.stage.addChild(matrix.visual);
}