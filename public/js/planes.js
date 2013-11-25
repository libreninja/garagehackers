(function(App) {
    var events = App.eventDispatcher;
/**
 * Airplane object
 */
var Airplane = function (params) {
    this.x = params.x;
    this.y = params.y;
    this.vx = 0.01;
    this.vy = 0.01;
    this.dr = 0;
    this.speed = 0.1;
    this.rotation = params.rotationAngle;
    this.rotationSpeed = 1;
    this.ctx = params.ctx;
    //this.pathArray = [10,2, 15,10, 50,13, 60,5, 72,5, 80,13, 90,17, 90,30, 72,33, 60,33, 50,29, 15,22, 2,17];
    this.pathArray = [-10,-4, -18,-12, -30,-12, -40,-4, -75,-7, -80,-15, -90,-17, -88,0, -75,5, -40,12, -30,16, -18,16, 0,13];
    this.controls = { 32: fireWeapon, 37: elevatorUp, 39: elevatorDown };
    var that = this;
    events.subscribe("keydown", controlOn)
    events.subscribe("keyup", controlOff)
    function controlOn( keyCode ) {
        that.controls[keyCode]("on");
    };

function controlOff( keyCode ) {
    that.controls[keyCode]("off");
}

function elevatorUp (state) {
    that.dr = state === "on" ? -1 : 0;
};

function elevatorDown (state) {
    that.dr = state === "on" ? 1 : 0;
};

function fireWeapon (state) {
    // body...
};
};


;

Airplane.prototype.update = function(dt) {
    // calculate new position
    this.rotation += this.dr * this.speed * dt * Math.PI/180;
    this.x += this.speed * dt * Math.cos(this.rotation)
    this.y += this.speed * dt * Math.sin(this.rotation)
};

Airplane.prototype.Draw =
function() {
    this.ctx.save();
    this.ctx.translate(this.x-25, this.y-6);
    this.ctx.rotate(this.rotation);
    this.ctx.translate(-this.x+25, -this.y+6);
    this.DrawBody();
    this.ctx.restore();
};

Airplane.prototype.DrawBody =
function() {
    
    this.ctx.fillStyle = 'red';
    this.ctx.beginPath();
    this.ctx.moveTo(this.x, this.y);
    for(var i=0;i < this.pathArray.length; i+=2) {
        this.ctx.lineTo(this.x + this.pathArray[i], this.y + this.pathArray[i+1]);
    }
    this.ctx.fill();
    
};

App.Airplane = Airplane;

}(window.BIPLANES));
