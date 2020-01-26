// load widget textures
PIXI.loader.add(['images/slider_pin.png']);

class Slider {
    constructor(width, length, notCentered) {
        console.log('Loading dev slider widget...')
        this.visual = new PIXI.Container();
        this.SLIDE_LENGTH = length;
        this.SLIDE_WIDTH = width;
        this.SLIDE_COLOR = 0xAAAAAA;
        this.SLIDE_X0 = 0;
        this.SLIDE_Y0 = this.SLIDE_WIDTH * 8;

        // this.visual.anchor.x = 0.5;
        // this.visual.anchor.y = 0.5;

        this.KNOB_COLOR = 0xAAAAAA;
        if (!notCentered) {
            this.SLIDE_X0 = Math.round((window.innerWidth / 2) - this.SLIDE_LENGTH / 2);
            this.visual.x = 0.1;
        }
        var slide = new PIXI.Graphics();
        slide.lineStyle(this.SLIDE_WIDTH, this.SLIDE_COLOR, 0.5);
        slide.moveTo(this.SLIDE_X0, this.SLIDE_Y0);
        slide.lineTo(this.SLIDE_X0 + this.SLIDE_LENGTH, this.SLIDE_Y0);
        var texture = resources['images/slider_pin.png'].texture;
        var knob = new Sprite(texture);
        var that = this;
        knob.interactive = true;
        knob.buttonMode = true;
        knob.anchor.x = 0.5;
        knob.anchor.y = 0.5;
        knob.position.x = this.SLIDE_X0;
        knob.position.y = this.SLIDE_Y0;
        knob.width = knob.height = width * 2;

        // mousedown events
        knob.mousedown = knob.touchstart = function (event) {
            this.event = event;
            // this.alpha = 0.5;
            this.dragging = true;
        };
        knob.mouseup = knob.mouseupoutside = knob.touchend = knob.touchendoutside = function (event) {
            // this.alpha = 1.0;
            this.dragging = false;
            this.event = null;
        };
        knob.mousemove = knob.touchmove = function (event) {
            if (this.dragging) {
                var newPosition = this.event.data.global;
                if (newPosition.x > that.SLIDE_X0 && newPosition.x < that.SLIDE_X0 + that.SLIDE_LENGTH) {
                    this.position.x = newPosition.x;
                }
            }
        };
        this.visual.addChild(slide);
        this.visual.addChild(knob);
        this.getSliderVal = function () {
            return parseInt((knob.position.x - that.SLIDE_X0) / that.SLIDE_LENGTH * 100);
        };
        this.setSliderVal = function (x) {
            knob.position.x = parseInt(x * that.SLIDE_LENGTH / 100 + that.SLIDE_X0);
        };
        this.update = function () {
        };
        app.stage.addChild(this.visual);
        return this;
    }
}
