(function (d3) {
    var svg = d3.select("svg"),
        opt={
            getScale: function (domain, range) {
                return d3.scale.linear()
                    .domain(domain)
                    .range(range);
            },
            getAxis: function (scale) {
                return d3.svg.axis().scale(scale);
            }
        },

        //这里可以添加多个方程
        equation ={
            "2x": function (x) {
                return 2 * x;
            },
            "1/x": function (x) {
                return 1/x;
            },
            "(x-1)^2": function (x) {
                return Math.pow((x-1),2);
            }
        },
        xMin = 1,  //x轴最小值
        xMax = 10, //x轴最大值
        xScale,//x轴的比例尺，默认为1-1000
        yScale,
        xAxis,
        yAxis,
        color = d3.scale.category20(),
        b;


    function clc() {
        var yVals=[],
            points={};

        b = Number.parseFloat(document.getElementById("b").value);

        if(Number.isNaN(b)){
            alert("您输入的常数B有误，请重新输入……");
            return;
        }

        xScale = opt.getScale([0,xMax],[0, 500]);//x轴的比例尺，默认为1-1000
        yScale = opt.getScale((function () {//计算y轴的比例尺
                var //yMin = Number.MAX_SAFE_INTEGER,
                    yMax = Number.MIN_SAFE_INTEGER,
                    yArr = null,
                    //tmpYMin,
                    tmpYMax;

                for(let i =xMin; i<= xMax; i++){
                    yArr = [];
                    for(var k in equation){
                        if(equation.hasOwnProperty(k)){
                            yArr.push(equation[k](i) + b);
                        }
                    }
                    //tmpYMin = Math.min(...yArr);
                    tmpYMax = Math.max(...yArr);


                    /*if(yMin > tmpYMin){
                        yMin = tmpYMin
                    }*/
                    if(yMax < tmpYMax){
                        yMax = tmpYMax;
                    }
                }
                return [0, yMax];

            }()),[400,0]);
        xAxis = opt.getAxis(xScale);
        yAxis = opt.getAxis(yScale);

        //计算每个点的坐标
        for(let k in equation){
            if(equation.hasOwnProperty(k)){
                points[k] = [];
                for(let i = xMin; i <= xMax; i++){
                    let val =equation[k](i) + b;
                    yVals.push(val);
                    points[k].push([xScale(i),yScale(val)]);
                }
            }
        }

        //绘制坐标轴
        //xAxis.ticks(vals.length).tickValues(vals);
        //yAxis.ticks(vals.length).orient('left').tickValues(yVals);

        yAxis.orient('left');
        svg.append("g")
            .attr("transform", "translate(50,450)")
            .call(xAxis);
        svg.append("g")
            .attr("transform", "translate(50,50)")
            .call(yAxis);

        //绘线
        for(let k in points){
            if(points.hasOwnProperty(k)){
                let line = d3.svg.line().interpolate('basis');
                svg.append('path')
                    .attr({
                        "d": function () {return line(points[k]);},
                        "transform": "translate(50,50)"
                    })
                    .style({
                        "stroke": color(k),
                        "stroke-width":2,
                        "fill": "none"
                    });
            }
        }
        //图例
        (function () {
            let html = "";
            for(let k in equation){
                //<tr><td></td><td></td></tr>
                html += '<tr><td style="text-align: right;">'+k+'：</td><td><div style="width: 50px; height: 0; border: solid 2px '+color(k)+'; display: inline-block;"></div></td></tr>';
            }
            d3.select("#legend").html(html);
        }());

    }
    //注册print按钮事件
    let symbol = d3.svg.symbol();
    d3.select("#clc").on("click",function () {
        svg.html("");
        clc();
        let xVal, index = 0;

        xVal = Number.parseFloat(document.getElementById("vals").value);

        if(Number.isNaN(xVal)){
            alert("您输入的x值有误，请重新输入……");
            return;
        }

        d3.selectAll(".p").remove();

        for(let k in equation){
            if(equation.hasOwnProperty(k)){
                let yVal =equation[k](xVal) + b,
                    point = [xScale(xVal),yScale(yVal)];

                document.getElementById(k).value=yVal;
                svg.append('path')
                    .attr({
                        "d": symbol.type(function () {
                            return d3.svg.symbolTypes[index % d3.svg.symbolTypes.length];
                        }),
                        "transform": "translate(" + (50 + point[0]) + "," + (50 + point[1]) + ")",
                        "class":'p'
                    })
                    .style({
                        "stroke": color(k),
                        "stroke-width":2,
                        "fill": color(k)
                    });
            }
            index++;
        }
    });

    //构建页面y显示框
    (function () {
        var template = d3.select("#yv-template").html(),
            html="";
        for(let key in equation){
            if(equation.hasOwnProperty(key)){
                html += template.replace(/\{\{key\}\}/g,key);
            }
        }
        d3.select("#yv").html(html);
    }());
    clc();
}(d3));