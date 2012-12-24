var fp = null;

window.onload = function() {
    $( "#nodeSizeSlider1" ).slider({ 
        animate: "fast", 
        step: 1,
        max: 50,
        min: 5,
        slide: 
        function() {
            console.log($( "#nodeSizeSlider1" ).slider( "option", "value" ));
        } 
    });
    $( "#nodeSizeSlider2" ).slider({ 
        animate: "fast", 
        step: 1,
        max: 15,
        min: 1,
        slide: 
        function() {
            var size = $( "#nodeSizeSlider2" ).slider( "option", "value" );
            gEdgeWidth = size;
            sys.renderer.redraw();
        },
        start: 
        function() {
            var size = $( "#nodeSizeSlider2" ).slider( "option", "value" );
            gEdgeWidth = size;
        },
        stop: 
        function() {
            var size = $( "#nodeSizeSlider2" ).slider( "option", "value" );
            gEdgeWidth = size;
            sys.renderer.redraw();
        } 
    });
    $( "#nodeSizeSlider3" ).slider({ 
        animate: "fast", 
        step: 1,
        max: 40,
        min: 2,
        slide: 
        function() {
            var size = $( "#nodeSizeSlider3" ).slider( "option", "value" );
            gNodeSize = size;
            sys.renderer.redraw();
        }, 
        start: 
        function() {
            var size = $( "#nodeSizeSlider3" ).slider( "option", "value" );
            gNodeSize = size;
        },
        stop: 
        function() {
            var size = $( "#nodeSizeSlider3" ).slider( "option", "value" );
            gNodeSize = size;
            sys.renderer.redraw();
        } 
    });

    updateGraph();
}

function updateGraph() {
    //sys = arbor.ParticleSystem(1000, 600, 0.8, false, 30, 0.02, 0.6);
    //sys.renderer = Renderer("#viewport");

    var gd = document.getElementById("graphDef").value;
    fp = new FileParser(gd);
    fp.parseAll();
}

