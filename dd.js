Three.OrbitContorls = function (object, domElement) {
    const scope = this;
    let lastBeta = 0;
    let lastGamma = 0;
    this.deviceOrientation = {};

    function onDeviceOrientationChangeEvent(event) {
        scope.deviceOrientation = event;
        //Z
        var alpha = scope.deviceOrientation.alpha
        ? Three.Math.degToRad(scope.deviceOrientation.alpha)
        : 0;

        //X'
        var beta = scope.deviceOrientation.beta
        ? Three.Math.degToRad(scope.deviceOrientation.beta)
        : 0;

        //Y"
        var gamma = scope.deviceOrientation.gamma
        ? Three.Math.degToRad(scope.deviceOrientation.gamma)
        : 0;

        // O
        var orient = scope.screenOrientation
        ? Three.Math.degToRad(scope.screenOrientation)
        : 0;

        roatateLeft(lastGamma - gamma);
        rotateUP(lastBeta - beta);

        lastBeta = beta; //is working
        lastGamma = gamma; //doen't work properly

        window.addEventListener('devicemotion', onDeviceOrientationChangeEvent, false);

    };
}


//http://w3c.github.io/deviceorientation/spec-source-orientation.html