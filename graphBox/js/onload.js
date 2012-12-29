var fp = null;

window.onload = function()
{
    $( "#edgeSizeSlider1" ).slider({ 
        animate: "fast", 
        step: 1,
        max: 15,
        min: 1,
        slide: 
        function() {
            var size = $( "#edgeSizeSlider1" ).slider( "option", "value" );
            gEdgeWidth = size;
            sys.renderer.redraw();
        },
        start: 
        function() {
            var size = $( "#edgeSizeSlider1" ).slider( "option", "value" );
            gEdgeWidth = size;
        },
        stop: 
        function() {
            var size = $( "#edgeSizeSlider1" ).slider( "option", "value" );
            gEdgeWidth = size;
            sys.renderer.redraw();
        } 
    });
    $( "#nodeSizeSlider1" ).slider({ 
        animate: "fast", 
        step: 1,
        max: 40,
        min: 5,
        slide: 
        function() {
            var size = $( "#nodeSizeSlider1" ).slider( "option", "value" );
            gNodeSize = size;
            sys.renderer.redraw();
        }, 
        start: 
        function() {
            var size = $( "#nodeSizeSlider1" ).slider( "option", "value" );
            gNodeSize = size;
        },
        stop: 
        function() {
            var size = $( "#nodeSizeSlider1" ).slider( "option", "value" );
            gNodeSize = size;
            sys.renderer.redraw();
        } 
    });

    updateGraph();
    updateColors();
}

var clearEdges = function(edge, pt1, pt2) {
    sys.pruneEdge(edge);
}

var clearNodes = function(node, pt) {
    sys.pruneNode(node);
}

function updateGraph() {
    sys.eachEdge(clearEdges);
    sys.eachNode(clearNodes);

    var gd = document.getElementById("graphDef").value;
    fp = new FileParser(gd);
    fp.parseAll();
}

function updateColors() {
    gNodeColor = document.getElementById('nodeColor').style.backgroundColor;
    gEdgeColor = document.getElementById('edgeColor').style.backgroundColor;
    gBGColor = document.getElementById('bgColor').style.backgroundColor;
    gNodeColor = colorToHex(gNodeColor);
    gEdgeColor = colorToHex(gEdgeColor);
    gBGColor = colorToHex(gBGColor);
    sys.renderer.redraw();
}

function mergeObjects(obj1,obj2) {
    var obj3 = {};
    for (var attrname in obj1) { obj3[attrname] = obj1[attrname]; }
    for (var attrname in obj2) { obj3[attrname] = obj2[attrname]; }
    return obj3;
}

function colorToHex(color) {
    if (color.substr(0, 1) === '#') {
        return color;
    }
    var digits = /(.*?)rgb\((\d+), (\d+), (\d+)\)/.exec(color);

    var red = parseInt(digits[2]);
    var green = parseInt(digits[3]);
    var blue = parseInt(digits[4]);
    var rgb = blue | (green << 8) | (red << 16);
    return digits[1] + '#' + rgb.toString(16);
};

