<!DOCTYPE html>

<html>

<head>
    <title>graphs</title>

    <!-- CSS -->
    <link rel="styleSheet" width="800" height="500" href="style.css" type="text/css">
    <link rel="styleSheet" width="800" height="500" href="../../../libraries/jqueryui/css/smoothness/jquery-ui-1.9.2.custom.min.css" type="text/css">

    <!-- JS -->
    <script type="text/javascript" src="../../../libraries/jquery-1.8.3.min.js"></script>
    <script type="text/javascript" src="../../../libraries/jqueryui/js/jquery-ui-1.9.2.custom.min.js"></script>
    <script type="text/javascript" src="../../../libraries/jscolor/jscolor.js"></script>
    <script type="text/javascript" src="../../../libraries/arbor-v0.92/lib/arbor.js"></script>
    <script type="text/javascript" src="../../../libraries/arbor-v0.92/lib/arbor-tween.js"></script>
    <script type="text/javascript" src="../../../libraries/arbor-v0.92/src/graphics/graphics.js"></script>
    <script src="js/main.js"></script>
    <script src="js/onload.js"></script>
    <script src="js/fileParser.js"></script>

</head>

<body>

</body>

    <div id="canvasBG">
        <canvas id="viewport"></canvas> 
    </div>

    <div class="top font1" id="sideBar">
        <div class="top" id="logo">Graph<span id="logoBox">Box</span></div>

        <!-- SLIDER FOR ALTERING NODE SIZE -->
        <span class="top" id="nodeSizeLabel">Node Size</span>
        <span class="top" id="nodeSizeSliderOuter">
            <div id="nodeSizeSlider1"></div>
        </span>
       
        <!-- SLIDER FOR ALTERING EDGE SIZE -->
        <span class="top" id="edgeSizeLabel">Edge Size</span>
        <span class="top" id="edgeSizeSliderOuter">
            <div id="edgeSizeSlider1"></div>
        </span>

        <span class="top" id="edgeTypeLabel">Edge Type</span>
        <select id="edgeTypeDrop" class="top" onchange="updateEdgeType();">
            <option class="top" value="line">line</option>
            <option class="top" value="circle">circle</option>
        </select>

        <span class="top" id="nodeTypeLabel">Node Type</span>
        <select id="nodeTypeDrop" class="top" onchange="updateNodeType();">
            <option class="top" value="circle">circle</option>
            <option class="top" value="rect">rectangle</option>
        </select>

        <div class="top font1" id="edgeColorWrap">Edge Color <input class="color" id="edgeColor" value="#632626" onchange="updateColors();"></div>
        <div class="top font1" id="nodeColorWrap">Node Color <input class="color" id="nodeColor" value="#9BAEC2" onchange="updateColors();"></div>

        <input class="top" id="graphDefLabel" type="submit" value="update graph" onclick="updateGraph();">
        <textarea class="top" id="graphDef">
            <?php
                $graph = file_get_contents('./graphDefinitions/5Clique.graph');
                echo $graph;
            ?>
        </textarea>

        <div class="top" id="spacer">spacer</div>

    </div>

</html>

