/**
 * @description
 * This file contains the window.onload function. This function is run 
 * when the browser window is ready to load the web app.
 *
 * @author Benjamin Dicken (bddicken@gmail.com)
 */

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
        value: 10,
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

    $( "#edgeTransSlider1" ).slider({ 
        animate: "fast", 
        step: 0.02,
        max: 1,
        min: 0.0,
        value: 1.0,
        slide: 
        function() {
            gEdgeTrans = $( "#edgeTransSlider1" ).slider( "option", "value" );
            sys.renderer.redraw();
        },
        start: 
        function() {
            gEdgeTrans = $( "#edgeTransSlider1" ).slider( "option", "value" );
            sys.renderer.redraw();
        },
        stop: 
        function() {
            gEdgeTrans = $( "#edgeTransSlider1" ).slider( "option", "value" );
            sys.renderer.redraw();
        } 
    });

    $( "#nodeTransSlider1" ).slider({ 
        animate: "fast", 
        step: 0.02,
        max: 1,
        min: 0.0,
        value: 1.0,
        slide: 
        function() {
            gNodeTrans = $( "#nodeTransSlider1" ).slider( "option", "value" );
            sys.renderer.redraw();
        },
        start: 
        function() {
            gNodeTrans = $( "#nodeTransSlider1" ).slider( "option", "value" );
            sys.renderer.redraw();
        },
        stop: 
        function() {
            gNodeTrans = $( "#nodeTransSlider1" ).slider( "option", "value" );
            sys.renderer.redraw();
        } 
    });

    $( "#nodeRepulsionSlider1" ).slider({ 
        animate: "fast", 
        step: 5,
        max: 6000,
        min: 50,
        value: 1000,
        slide: 
        function() {
            gRepulsion = $( "#nodeRepulsionSlider1" ).slider( "option", "value" );
            sys.renderer.updateParams();
        },
        start: 
        function() {
            gRepulsion = $( "#nodeRepulsionSlider1" ).slider( "option", "value" );
            sys.renderer.updateParams();
        },
        stop: 
        function() {
            gRepulsion = $( "#nodeRepulsionSlider1" ).slider( "option", "value" );
            sys.renderer.updateParams();
        } 
    });

    $( "#graphStiffSlider1" ).slider({ 
        animate: "fast", 
        step: 10,
        max: 10000,
        min: 5,
        value: 600,
        slide: 
        function() {
            gStiffness = $( "#graphStiffSlider1" ).slider( "option", "value" );
            sys.renderer.updateParams();
        },
        start: 
        function() {
            gStiffness = $( "#graphStiffSlider1" ).slider( "option", "value" );
            sys.renderer.updateParams();
        },
        stop: 
        function() {
            gStiffness = $( "#graphStiffSlider1" ).slider( "option", "value" );
            sys.renderer.updateParams();
        } 
    });

    // add clear edge function to the graph system
    sys.clearEdges = function(edge, pt1, pt2) {
        sys.pruneEdge(edge);
    }

    // add clear node function to the graph system
    sys.clearNodes = function(node, pt) {
        sys.pruneNode(node);
    }

    // add update graph function to the grapg system
    sys.updateGraph = function() {
        sys.eachEdge(sys.clearEdges);
        sys.eachNode(sys.clearNodes);
        var gd = document.getElementById("graphDef").value;
        fp = new FileParser(gd);
        fp.parseAll();
    }

    // add color update function the graph system
    sys.updateColors = function() {
        gNodeColor = document.getElementById('nodeColor').style.backgroundColor;
        gEdgeColor = document.getElementById('edgeColor').style.backgroundColor;
        gBGColor = document.getElementById('bgColor').style.backgroundColor;
        gNodeColor = colorToHex(gNodeColor);
        gEdgeColor = colorToHex(gEdgeColor);
        gBGColor = colorToHex(gBGColor);
        sys.renderer.redraw();
    }

    sys.updateGraph();
    sys.updateColors();
}


/********** MISC FUNCTIONS ***********/

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

