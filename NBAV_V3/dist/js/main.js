webpackJsonp([0],[
/* 0 */,
/* 1 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/**
 * 项目名称 - 版本号
 * 类名称
 * @author : lenovo
 * 基础类
 * @description : 请添加描述信息
 * @date : 2017/4/13
 */


Object.defineProperty(exports, "__esModule", {
    value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var d3 = __webpack_require__(0);

var Common = exports.Common = function () {
    function Common() {
        _classCallCheck(this, Common);
    }

    _createClass(Common, null, [{
        key: "stackMin",
        value: function stackMin(data) {
            return d3.min(data, function (d) {
                return d[0];
            });
        }
    }, {
        key: "stackMax",
        value: function stackMax(data) {
            return d3.max(data, function (d) {
                return d[1];
            });
        }
    }, {
        key: "OjbectMaxV",
        value: function OjbectMaxV(data) {
            return d3.max(data, function (d) {
                d3.max(Object.values(d));
            });
        }
    }, {
        key: "OjbectMinV",
        value: function OjbectMinV(data) {
            return d3.min(data, function (d) {
                d3.min(Object.values(d));
            });
        }
    }]);

    return Common;
}();

/***/ }),
/* 2 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var d3 = __webpack_require__(0);

var _require = __webpack_require__(1),
    Common = _require.Common;

var colors = d3.interpolateCool;

var Bar = exports.Bar = function () {
    function Bar(canvas) {
        _classCallCheck(this, Bar);

        if (new.target !== Bar) {
            throw new Error("you should use new to create a instance!");
        }
        typeof canvas === 'string' ? this.canvas = document.getElementById(canvas) : this.canvas = canvas;

        Object.assign(this, {
            context: this.canvas.getContext('2d'),
            width: +this.canvas.width,
            height: +this.canvas.height,
            colors: colors
        });

        var self = this;
        function getProto(obj) {
            if (obj.__proto__) {
                return obj.__proto__;
            } else {
                return obj.constructor.prototype;
            }
        }
        var canvasRenderingContext2D = getProto(this.context);
        var moveToFun = canvasRenderingContext2D.moveTo;
        canvasRenderingContext2D.lastMoveToLocation = {};
        canvasRenderingContext2D.moveTo = function (x, y) {
            moveToFun.call(self.context, x, y);
            this.lastMoveToLocation.x = x;
            this.lastMoveToLocation.y = y;
        };
        canvasRenderingContext2D.dashLineTo = function (x, y, dashLength) {
            dashLength = dashLength === undefined ? 5 : dashLength;
            var startX = this.lastMoveToLocation.x,
                startY = this.lastMoveToLocation.y,
                deltaX = x - startX,
                deltaY = y - startY,
                numDashes = Math.floor(Math.sqrt(deltaX * deltaX + deltaY * deltaY) / dashLength);
            for (var i = 0; i < numDashes; ++i) {
                this[i % 2 === 0 ? 'moveTo' : 'lineTo'](startX + deltaX / numDashes * i, startY + deltaY / numDashes * i);
            }
            this.moveTo(x, y);
        };
    }

    _createClass(Bar, [{
        key: 'init',
        value: function init(opts) {
            Object.assign(this, opts);
        }
    }, {
        key: 'barHorizontal',
        value: function barHorizontal(data) {
            var _this = this;

            this.clear();
            var keys = Object.keys(data[0]);
            keys.forEach(function (d, i) {
                var d0p = data[0][d] / (data[0][d] + data[1][d]);
                var d1p = data[1][d] / (data[0][d] + data[1][d]);
                _this.context.fillStyle = _this.colors(0);
                _this.context.fillRect(_this.initX, _this.initY + i * _this.interval + i * _this.barH, _this.len * d0p, _this.barH);

                _this.context.fillStyle = _this.colors(1);
                _this.context.fillRect(_this.initX + _this.len * d0p, _this.initY + i * _this.interval + i * _this.barH, _this.len * d1p, _this.barH);
            });
            if (this.showMiddleLine) {
                this.context.strokeStyle = 'black';
                this.context.moveTo(this.initX + this.len / 2, this.initY - 10);
                this.context.dashLineTo(this.initX + this.len / 2, this.initY + keys.length * (this.interval + this.barH) + 10);
                this.context.stroke();
            }
        }
    }, {
        key: 'barVertical',
        value: function barVertical() {}
    }, {
        key: 'clear',
        value: function clear() {}
    }]);

    return Bar;
}();

/***/ }),
/* 3 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/**
 * 项目名称 - 版本号
 * 类名称
 * @author : lenovo
 * 基础类
 * @description : 请添加描述信息
 * @date : 2017/4/23
 */


Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.Chart = undefined;

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _Common = __webpack_require__(1);

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var time = [2010, 2011, 2012, 2013, 2014, 2015, 2016, 2017];
var d3 = __webpack_require__(0);

var Chart = exports.Chart = function () {
    function Chart(svg) {
        _classCallCheck(this, Chart);

        if (new.target !== Chart) {
            throw new Error("Chart 不是函数，请使用new来生成实例~~~");
        }

        if (typeof svg === 'string') {
            this.svg = d3.select("#" + svg);
        } else {
            this.svg = svg;
        }
        //this.context = this.canvas.getContext('2d');

        var streamG = this.svg.append("g").attr("id", "streamG").attr('transform', 'translate(70,50)');
        this.streamG = streamG;

        var options = this.options = {};
        //let d3Canvas = d3.select(this.canvas);
        options.padding = 50;
        options.width = +this.svg.attr('width') - options.padding;
        options.height = 600; //+this.svg.attr('height')/5*3;
        options.color = d3.interpolateCool;
    }

    _createClass(Chart, [{
        key: 'themeRiver',
        value: function themeRiver(data, options) {
            //todo 构造options

            /**stack 生成器
             * 必须设置key访问器，stack 生成器按照key来生成数据，返回一个数组，数组每个元素代表对应的key值对应的数据序列，
             * 序列内部就是按照剩下的哪一个数组元素的key计算出的堆叠偏移量，
             *
             * 默认情况下使用第一个分量作为计算堆叠偏移量的key,使用剩下的n-1个作为分组计算
             */
            //this.context.translate(50,0);

            this.clean();
            var _options = this.options;
            var props = ["Age", "BPG", "FTA", "GP", "MPG", "PPG", "RPG", "SPG"];
            //todo 添加一些themeRiver特有的配置属性
            Object.assign(_options, {
                order: d3.stackOrderNone, //次序是根据keys得到的，相当于没有排序
                offset: d3.stackOffsetWiggle
            });
            Object.assign(_options, options);

            var auxiliaryG = this.svg.append('g');

            console.log(data[0]);
            var keys = Object.keys(data[0]);

            var sliceK = keys.slice(1);
            var stack = d3.stack().keys(sliceK).order(_options.order).offset(_options.offset);

            var _data = stack(data);

            var x = d3.scaleLinear().domain([0, time.length + 1]).range([0, _options.width]);

            var y = d3.scaleLinear().domain([d3.min(_data, _Common.Common.stackMin), d3.max(_data, _Common.Common.stackMax)]).range([_options.height, 0]);

            var z = d3.scaleLinear().domain([0, sliceK.length]).range([0, 1]);

            var area = d3.area().x(function (d, i) {
                return x(i);
            }).y0(function (d) {
                return y(d[0]);
            }).y1(function (d) {
                return y(d[1]);
            }).curve(d3.curveNatural);
            //.context(this.context);

            //arc生成器
            var arc2 = d3.arc().innerRadius(0).outerRadius(_options.height / 4);
            var pie = d3.pie().value(function (d) {
                return d['v'];
            });

            var streamG = this.streamG;
            streamG.selectAll(".stream").data(_data).enter().append("path").attr("class", 'stream').attr('transform', 'translate(' + _options.padding + ',0)').attr("d", area).attr("fill", function (d, i) {
                return _options.color(z(i));
            }).on("mouseover", function (d, i) {
                var themeRN = d3.select("#themeRN").html(props[i]);
                var coord = d3.mouse(document.getElementById("body"));
                themeRN.style("left", coord[0] + "px");
                themeRN.style("top", coord[1] + "px");
                themeRN.style("display", "inline-block");
            }).on("mouseout", function (d, i) {
                d3.select("#themeRN").style("display", "none");
            });

            //设置缓冲区
            var buffer = [];
            for (var i = 0; i < time.length; i++) {
                var d = x(i);
                buffer.push([d - 10, d + 10]);
            }
            var popup = d3.select("#popup");

            /*let currentArc = null;
            this.svg.on('mousemove',()=>{
                let coords = d3.mouse(document.getElementById("svg"));
                  let flag = true;
                for(let i = 0; i<buffer.length; i++){
                    let b = buffer[i];
                    let x = coords[0] - _options.padding;
                    if(x > b[0] && x < b[1]){
                        flag = false;
                        //let k = sliceK[i];
                        let total = 0;
                          let auxiliaryData = [];
                        let d = data[i];
                          for(let i=0, sliceNames=names.slice(1); i< sliceNames.length; i++){
                            let de = sliceNames[i];
                            popup.select("#"+de).html(de+":" + d[de])
                                .style('color',_options.color(z(i)));
                            total += d[de];
                            auxiliaryData.push({
                                area:de,
                                v:d[de]
                            })
                        }
                        popup.select("#total").html('Total: ' + total);
                        popup.transition().duration(1000).style('opacity','0.8');
                          //绘制辅助图
                        let _auxD = pie(auxiliaryData);
                          let update = auxiliaryG.selectAll('.aux').data(_auxD);
                          currentArc = update.enter().append("path")
                            .merge(update)
                            .attr('class','aux')
                            .attr('d',arc2)
                            .attr('transform','translate('+_options.width/2+','+(_options.height/3-30)+')')
                            .style('fill',function(d,i) { return _options.color(z(i));})
                            .transition()
                            .duration(1000)
                            //.attr('d',arc2)
                            .style('opacity',1);
                        break;
                    }
                }
                if(flag){
                    if(currentArc !== null){
                        currentArc.transition()
                            .duration(1000)
                            /!*.attr('d',arc1)*!/
                            .style('opacity',0.2);
                    }
                    currentArc=null;
                    popup.transition().duration(1000).style('opacity','0.2');
                }
            });
            this.svg.on('mouseout',()=>{
                if(currentArc !== null){
                    currentArc.transition()
                        .duration(1000)
                        /!*.attr('d',arc1)*!/
                        .style('opacity',0.2);
                }
                currentArc=null;
                popup.transition().duration(1000).style('opacity','0.2');});*/

            var orderScale = d3.scaleOrdinal().domain(time).range(function () {
                var range = [];
                for (var _i = 0; _i <= time.length; _i++) {
                    range.push(x(_i));
                }
                return range;
            }());
            //x轴

            //let svg = d3.select("#svg");
            streamG.append("g").attr("transform", "translate(" + _options.padding + "," + _options.height + ")").call(d3.axisBottom(orderScale).ticks(time.length));
            //y轴
            var axisLeft = this.axis([d3.max(_data, _Common.Common.stackMax), d3.min(_data, _Common.Common.stackMin)], {
                scale: d3.scaleLinear,
                direction: 'axisLeft'
            });
            streamG.append("g").attr("transform", "translate(" + _options.padding + ",0)").call(d3.axisLeft(y));

            /* streamG.append("g")
             .attr("transform", "translate("+_options.padding+",0)")
             .call(d3.axisBottom(orderScale).ticks(time.length));*/
        }
    }, {
        key: 'clean',
        value: function clean() {
            this.streamG.remove();
            this.streamG = this.svg.append("g").attr("id", "streamG").attr('transform', 'translate(70,50)');
        }

        /**
         * 顺序
         * @param domain
         * @param option
         */

    }, {
        key: 'axis',
        value: function axis(domain, option) {
            var _option = this.options;
            //初始化默认选项
            Object.assign(_option, {
                scale: d3.scaleOrdinal,
                direction: 'axisBottom',
                order: 'asc'
            });
            //用户配置选项
            Object.assign(_option, option);

            var scale = _option.scale().domain(domain);

            if (_option.order === 'asc') {
                if (_option.direction === 'axisBottom' || _option.direction === 'axisTop') {
                    scale.range([0, _option.width]);
                } else if (_option.direction === 'axisLeft' || _option.direction === 'axisRight') {
                    scale.range([0, _option.height]);
                }
            } else {
                if (_option.direction === 'axisBottom' || _option.direction === 'axisTop') {
                    scale.range([_option.width, 0]);
                } else if (_option.direction === 'axisLeft' || _option.direction === 'axisRight') {
                    scale.range([_option.height, 0]);
                }
            }

            //d3.axisBottom(orderScale)
            return d3[_option.direction](scale);
        }
    }]);

    return Chart;
}();

/***/ }),
/* 4 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

/**
 * 项目名称 - v 1.0.0
 * 类名称
 * @author : gissky
 * 基础类
 * @description : 请添加描述信息
 * @date : 2017/3/28
 */
var d3 = __webpack_require__(0);
var colors = d3.interpolateCool;
var __opts = {};

var Map = exports.Map = function () {
    function Map(map) {
        _classCallCheck(this, Map);

        if (new.target !== Map) {
            throw new Error("you should use new to create a instance!");
        }
        this.map = d3.select("#" + map);
        this.layers = this.map.append('g').attr('id', 'layers');
        Object.assign(__opts, {
            width: +this.map.attr('width'),
            height: +this.map.attr('height'),
            colors: colors,
            graticule: d3.geoGraticule(),
            simulation: d3.forceSimulation().force("link", d3.forceLink().id(function (d) {
                return d.id;
            })).force("charge", d3.forceManyBody().distanceMax(10)).force("center", d3.forceCenter()) //+this.map.attr('width')/2, +this.map.attr('height')/2
        });
        this.mapId = map;
    }

    _createClass(Map, [{
        key: "forceDirectedGraph",
        value: function forceDirectedGraph(graph, options) {
            this.reset();
            var _options = {};
            Object.assign(_options, __opts, options);

            var simulation = _options.simulation;

            simulation.nodes(graph.nodes).force("link").links(graph.links).distance(100);

            //draw links
            var link = this.layers.selectAll('.link').data(graph.links);
            var links = link.enter().append('line').attr('stroke', "#39464F");

            //draw nodes
            var node = this.layers.selectAll('.node').data(graph.nodes);
            var nodes = node.enter().append('g').attr('class', 'abc').append('circle').attr('fill', function (d, i) {
                return _options.colors(i);
            }).attr('r', 10).attr('stroke', 'black').attr("stroke-width", 1).call(d3.drag().on("start", function () {
                if (!d3.event.active) simulation.alphaTarget(0.1).restart();
                d3.event.subject.fx = d3.event.subject.x;
                d3.event.subject.fy = d3.event.subject.y;
            }).on("drag", function () {
                d3.event.subject.fx = d3.event.x;
                d3.event.subject.fy = d3.event.y;
            }).on("end", function () {
                if (!d3.event.active) simulation.alphaTarget(0);
                d3.event.subject.fx = null;
                d3.event.subject.fy = null;
            }));

            var text = this.layers.selectAll('text').data(graph.nodes);

            var texts = text.enter().append('text').text(function (d) {
                return d.id;
            }).attr('fill', function (d, i) {
                return _options.colors(i);
            });

            //按照力布局的节拍移动线和点的位置，直到收敛
            simulation.on("tick", function () {
                links.attr("x1", function (d) {
                    return d.source.x;
                }).attr("y1", function (d) {
                    return d.source.y;
                }).attr("x2", function (d) {
                    return d.target.x;
                }).attr("y2", function (d) {
                    return d.target.y;
                });

                nodes.attr("cx", function (d) {
                    return d.x;
                }).attr("cy", function (d) {
                    return d.y;
                });

                texts.attr('x', function (d) {
                    return d.x + 10;
                }).attr('y', function (d) {
                    return d.y + 5;
                });
            });
        }
    }, {
        key: "reset",
        value: function reset() {
            var map = document.getElementById(this.mapId);
            map.parentNode.removeChild(map);
            this.map = d3.select('#wrap').append('svg').attr('id', 'map').attr('width', 1500).attr('height', 1000);

            //this.map = d3.select("#"+map);
            this.layers = this.map.append('g').attr('id', 'layers');
            Object.assign(__opts, {
                width: +this.map.attr('width'),
                height: +this.map.attr('height'),
                colors: colors,
                graticule: d3.geoGraticule(),
                simulation: d3.forceSimulation().force("link", d3.forceLink().id(function (d) {
                    return d.id;
                })).force("charge", d3.forceManyBody()).force("center", d3.forceCenter(+this.map.attr('width') / 2, +this.map.attr('height') / 2))
            });
        }
    }]);

    return Map;
}();

/***/ }),
/* 5 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

/**
 * 项目名称 - 版本号
 * 类名称
 * @author : lenovo
 * 基础类
 * @description : 请添加描述信息
 * @date : 2017/4/18
 */
var d3 = __webpack_require__(0);
var colors = d3.interpolateCool;
var opt = {};

var ParallelCoordinates = exports.ParallelCoordinates = function () {
    function ParallelCoordinates(svg) {
        _classCallCheck(this, ParallelCoordinates);

        if (new.target !== ParallelCoordinates) {
            throw new Error("you should use new to create a instance!");
        }
        typeof svg === "string" ? this.svg = d3.select("#" + svg) : this.svg = d3.select(svg);

        this.g = this.svg.append('g').attr('id', 'ParallelCoordinates');

        opt = {};
        Object.assign(opt, {
            width: +this.svg.attr('width'),
            height: +this.svg.attr('height'),
            color: colors
        });
    }

    _createClass(ParallelCoordinates, [{
        key: "init",
        value: function init(opts) {
            Object.assign(opt, opts);
        }
    }, {
        key: "render",
        value: function render(data, fun, fun2) {
            var _this = this;

            this.clean();
            //重新构造data
            var pop = d3.select("#currentPlayer");
            /*        let p_name = pop.select("#name");
                    let p_img = pop.select("#img");*/
            var keys = Object.keys(data[0]);
            var _keys = ["Game Played", "Minute Per Game", "Free Throw Attempt", "Point Per Game", "Rebound Per Game", "Steal Per Game", "Block Per Game"];
            opt.keys = keys;
            opt.data = data;
            var self = this;
            var _data = keys.map(function (k) {
                var innerD = [];
                data.forEach(function (d) {
                    innerD.push(d[k]);
                });
                return innerD;
            });

            //if(!opt.scaleX){
            opt.scaleX = d3.scaleLinear().domain([0, keys.length - 1]).range([opt.initX, opt.initX + opt.width]);
            //}

            //if(!opt.scaleYs){
            opt.scaleYs = [];
            _data.forEach(function (d, i) {
                opt.scaleYs[i] = d3.scaleLinear().domain(d3.extent(d)).range([opt.initY + opt.height, opt.initY]);
            });
            //}
            if (typeof opt.colorTransform !== 'function') {
                opt.colorTransform = d3.scaleLinear().domain([0, keys.length]).range([0, 1]);
            }

            opt.line = d3.line();

            // Add blue foreground lines for focus.
            this.g.append("g")
            //.attr("class", "foreground")
            .selectAll("path").data(data).enter().append("path").attr('class', 'pl').attr("d", ParallelCoordinates.path).style('stroke', "#88FFFE") //(d,i)=>opt.color(opt.colorTransform(i))
            .style('stroke-width', 1).style('fill', 'none').on('click', function (d, i) {
                self.render(data, fun, fun2);
                fun(d, i, fun2);
                d3.selectAll('.pl').filter(function (_d, i) {
                    return d !== _d;
                }).style('stroke', '#ddd').style('stroke-width', 1).style("opacity", "0.3").style('shape-rendering', 'crispEdges').style('fill', 'none');
                d3.selectAll('.pl').filter(function (_d, i) {
                    return d == _d;
                }).style('stroke-width', 2);
                d3.event.stopPropagation();
            }).on("mouseover", function (d, i) {
                fun2(d, i);
            }).on("mouseout", function (d, i) {
                pop.style("display", "none");
            });

            var brush = d3.brush().on("start", brushStart.bind(this)).on("end", brushended);
            // Add an axis and title.
            var axisY = this.g.append("g").attr('id', 'axisY');
            keys.forEach(function (d, i) {
                axisY.append('g').attr('class', 'axis').call(d3.axisLeft(opt.scaleYs[i])).attr("transform", "translate(" + opt.scaleX(i) + ",0)").append('text').style("text-anchor", "middle").attr("y", opt.initY - 10).style("stroke", 'black').style('fill', 'none').text(_keys[i]);
                //add brush
                _this.g.append('g').attr('bid', i).attr("class", "brush").attr('width', '30').attr("transform", "translate(" + opt.scaleX(i) + ",0)").call(brush).selectAll("rect").attr("x", -8).attr("width", 16);
            });

            this.svg.on('click', function () {
                self.render(data, fun, fun2);
            });
        }
    }, {
        key: "setScaleX",
        value: function setScaleX(scaleX) {
            this.scaleX = scaleX;
        }
    }, {
        key: "setScaleYs",
        value: function setScaleYs(scaleYs) {
            this.scaleYs = scaleYs;
        }
    }, {
        key: "colorTransfom",
        value: function colorTransfom(colorTransform) {
            opt.colorTransform = colorTransform;
        }
    }, {
        key: "clean",
        value: function clean() {
            this.g.remove();
            this.g = this.svg.append('g').attr('id', 'ParallelCoordinates');
            //this.g.html("");
        }
    }], [{
        key: "path",
        value: function path(d) {
            return opt.line(Object.keys(d).map(function (_d, i) {
                return [opt.scaleX(i), opt.scaleYs[i](d[_d])];
            }));
        }
    }]);

    return ParallelCoordinates;
}();

function brushStart() {
    //console.log(('brushed'));
    this.render(opt.data);
}
function brushended(d) {
    var selection = d3.event.selection;
    var minX = selection[0][0];
    var minXY = selection[0][1];
    var maxX = selection[1][0];
    var maxXY = selection[1][1];

    var i = d3.select(this).attr('bid');

    d3.selectAll('.pl').filter(function (_d) {
        var val = opt.scaleYs[i](_d[opt.keys[i]]);
        return !(val >= minXY && val <= maxXY);
    }).style('stroke', '#ddd').style('shape-rendering', 'crispEdges').style('fill', 'none');
    //d3.event.stopPropagation();
}

/***/ }),
/* 6 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

/**
 * 项目名称 - 版本号
 * 类名称
 * @author : lenovo
 * 基础类
 * @description : 请添加描述信息
 * @date : 2017/4/13
 */
var d3 = __webpack_require__(0);

var Text = exports.Text = function () {
    function Text() {
        _classCallCheck(this, Text);

        if (new.target !== Text) {
            throw new Error("you should use new to create a instance!");
        }
        typeof canvas === 'string' ? this.canvas = document.getElementById(canvas) : this.canvas = canvas;

        Object.assign(this, {
            context: this.canvas.getContext('2d'),
            width: +this.canvas.width,
            height: +this.canvas.height
        });
    }

    _createClass(Text, [{
        key: 'init',
        value: function init(opts) {
            Object.assign(this, opts);
        }
    }, {
        key: 'textHorizontal',
        value: function textHorizontal(data, contextSetting) {
            var _this = this;

            this.clear();

            Object.assign(this.context, contextSetting);

            data.forEach(function (d, i) {
                _this.context.fillText(d, _this.initX, _this.initY + i * _this.interval);
            });
        }
    }, {
        key: 'clear',
        value: function clear() {}
    }]);

    return Text;
}();

/***/ }),
/* 7 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

/**
 * 项目名称 - 版本号
 * 类名称
 * @author : lenovo
 * 基础类
 * @description : 请添加描述信息
 * @date : 2017/4/23
 */
var d3 = __webpack_require__(0);

var _require = __webpack_require__(1),
    Common = _require.Common;

var colors = d3.interpolateCool;
var c_circle = "c_circle",
    c_timeText = "c_timeText";

var TimeAxis = exports.TimeAxis = function () {
    function TimeAxis(svg) {
        _classCallCheck(this, TimeAxis);

        if (new.target !== TimeAxis) {
            throw new Error("you should use new to create a instance!");
        }
        typeof svg === "string" ? this.svg = d3.select("#" + svg) : this.svg = d3.select(svg);

        this.g = this.svg.append('g').attr('id', 'TimeAxis');
        this._opt = {
            initX: 100,
            initY: 100,
            width: 1000,
            radius: 10,
            lineColor: "#000000",
            lineWidth: 1,
            line_DashArray: "2 2",
            color: colors
        };
    }

    _createClass(TimeAxis, [{
        key: "init",
        value: function init(opt) {
            Object.assign(this._opt, opt);
        }
    }, {
        key: "rander",
        value: function rander(timeRange) {
            //绘制时间轴
            var timeAxis = this.g,
                line = d3.line(),
                opt = this._opt,
                interval = opt.width / timeRange.length,
                _color = null;

            if (opt.color === d3.interpolateCool) {
                var x = d3.scaleLinear().domain([0, timeRange.length]).range([0, 1]);

                _color = d3.scaleLinear().domain([0, timeRange.length - 1]).range([opt.color(x(0)), opt.color(x(timeRange.length - 1))]);
            } else {
                _color = opt.color;
            }
            timeAxis.append("path").attr("d", function () {
                return line([[opt.initX, opt.initY], [opt.initX + opt.width, opt.initY]]);
            }).style("stroke", opt.lineColor).style("stroke-width", opt.lineWidth).style("stroke-dasharray", opt.line_DashArray);

            this.g.selectAll("." + c_circle).data(timeRange).enter().append("circle").attr("class", c_circle).attr("cx", function (d, i) {
                return opt.initX + i * interval + 40;
            }).attr("cy", opt.initY).attr("r", opt.radius).style("fill", function (d, i) {
                return _color(i);
            }).on("click", function (d, i) {
                d3.select("#hightLight").remove();

                timeAxis.append("circle").attr("cx", this.getAttribute("cx")).attr("cy", this.getAttribute("cy")).attr("r", opt.radius + 5).attr("id", "hightLight").style("stroke", "#21ccd2").style("stroke-width", 2).style("fill", this.style.fill);
            });
            this.g.selectAll("." + c_timeText).data(timeRange).enter().append("text").attr("class", c_timeText).attr("x", function (d, i) {
                return opt.initX + i * interval + 40;
            }).attr("y", opt.initY + 2 * opt.radius + 10).style("fill", "#535252").style("font-size", "10px").style("font-weight", "bold").style("text-anchor", "middle").text(function (d) {
                return d.getFullYear();
            });
            /*timeRange.forEach((d,i)=>{
                timeAxis.append("circle")
                    .attr({
                        "cx": (i+1) * interval - 40,
                        "cy": 10,
                        "r":opt.radius,
                        "val":d[i]
                    })
                    .style({
                        "fill": function () {
                            let dataInTime = data[d[i]],
                                D_P = 0,
                                R_P = 0;
                            for(let i = 0; i<dataInTime.length; i++){
                                D_P += Number.parseFloat(dataInTime[i]["D_Percentage"]);
                                R_P += Number.parseFloat(dataInTime[i]["R_Percentage"]);
                            }
                            if(D_P > R_P){
                                return "#063E78";
                            }else {
                                return "#860408";
                            }
                        }
                    })
                    .on("click",function () {
                        d3.select("#hightLight").remove();
                          timeAxis.append("circle")
                            .attr({
                                "cx": this.getAttribute("cx"),
                                "cy": this.getAttribute("cy"),
                                "r": 15,
                                "id": "hightLight"
                            })
                            .style({
                                "stroke":"#21ccd2",
                                "stroke-width": "2",
                                "fill": this.style.fill
                            });
                        render(this.getAttribute("val"));
                    });
                timeAxis.append("text")
                    .attr({
                        "x": (i+1) * interval - 55,
                        "y": 40
                    })
                    .style({
                        "fill":"#535252",
                        "font-size": "10px",
                        "font-weight":"bold"
                    })
                    .text(d[i]);
            });
            for(let i=0, d = Object.keys(data); i<d.length; i++){
              }*/
        }
    }, {
        key: "on",
        value: function on(type, callback) {
            this.g.selectAll("." + c_circle).on(type, callback);
        }
    }]);

    return TimeAxis;
}();

/***/ }),
/* 8 */
/***/ (function(module, exports) {

// removed by extract-text-webpack-plugin

/***/ }),
/* 9 */
/***/ (function(module, exports) {

// removed by extract-text-webpack-plugin

/***/ }),
/* 10 */
/***/ (function(module, exports) {

// removed by extract-text-webpack-plugin

/***/ }),
/* 11 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


__webpack_require__(9);

__webpack_require__(10);

__webpack_require__(8);

function _toConsumableArray(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } else { return Array.from(arr); } } /**
                                                                                                                                                                                                     * 项目名称 - 版本号
                                                                                                                                                                                                     * 类名称
                                                                                                                                                                                                     * @author : lenovo
                                                                                                                                                                                                     * 基础类
                                                                                                                                                                                                     * @description : 请添加描述信息
                                                                                                                                                                                                     * @date : 2017/4/18
                                                                                                                                                                                                     */
/**
 * 项目名称 - v 1.0.0
 * 类名称
 * @author : gissky
 * 基础类
 * @description : 请添加描述信息
 * @date : 2017/3/27
 */


var d3 = __webpack_require__(0);

var _require = __webpack_require__(2),
    Bar = _require.Bar;

var _require2 = __webpack_require__(1),
    Common = _require2.Common;

var _require3 = __webpack_require__(6),
    Text = _require3.Text;

var _require4 = __webpack_require__(5),
    ParallelCoordinates = _require4.ParallelCoordinates;

var _require5 = __webpack_require__(7),
    TimeAxis = _require5.TimeAxis;

var _require6 = __webpack_require__(3),
    Chart = _require6.Chart;

var _require7 = __webpack_require__(4),
    Map = _require7.Map;

//<editor-fold desc="word cloud data">


var nameWord = {
    "Kyrie,Irving": "Big Heart",
    "DeMar,DeRozan": "No.1 Kobe Fan",
    "LeBron,James": "Empire",
    "Giannis,Antetokounmpo": "Mr.Letter",
    "Jimmy,Butler": "Jordan's son？",
    "Stephen,Curry": "From Downtown",
    "James,Harden": "Euro Step",
    "Kevin,Durant": "For champion?",
    "Kawhi,Leonard": "No expression",
    "Anthony,Davis": "Mr.Eyebrows",
    "John,Wall": "Fastest Guard",
    "Isaiah,Thomas": "Best 175",
    "Kyle,Lowry": "Injury",
    "Paul,George": "New shoes",
    "Kevin,Love": "best family name",
    "Russell,Westbrook": "Non human",
    "Klay,Thompson": "God thom",
    "Draymond,Green": "Tough defence",
    "Marc,Gasol": "The Spinach Brother",
    "Dwyane,Wade": "Thunder",
    "Carmelo,Anthony": "Sweetie of apple",
    "Kobe,Bryant": "Mamba",
    "Blake,Griffin": "Slam dunk",
    "Tim,Duncan": "Bank shot",
    "Dirk,Nowitzki": "Grestest international",
    "Pau,Gasol": "The Spinach Brother",
    "Chris,Paul": "Speed",
    "Dwight,Howard": "Beast",
    "Tony,Parker": "Frendch speedie",
    "Rajon,Rondo": "Can him shot?",
    "Paul,Pierce": "Faith",
    "Steve,Nash": "no looking pass",
    "Derrick,Rose": "son of wind",
    "Manu,Ginóbili": "Argentina hawk",
    "Allen,Iverson": "Answer"
};
var commonWrod = ["wallpaper", "king kong", "game show", "greatness", "shoe size", "autograph", "liverpool", "lion logo", "old shoes", "biography", "education", "eye color", "questions", "quiz 2016", "qualities", "interview", "i promise", "rotoworld", "net worth", "new shoes", "years pro", "usa shoes", "ellie day", "the block", "quotes by", "disney xd", "update on", "usa today", "father of", "family of", "photos of", "rotoworld", "rap about", "crossover", "space jam", "the shoes", "old shoes", "jim brown", "jordan vs", "height of", "instagram", "is injury", "new shoes", "net worth", "is clutch", "ethnicity", "extension", "cyberface", "childhood", "hand size", "hairstyle", "last name", "languages", "last game", "autograph", "dunk 2017", "rotoworld", "overrated", "interview", "instagram", "potential", "shoe size", "shoe deal", "years pro", "yesterday", "zach lowe", "wallpaper", "jersey uk", "vs knicks", "instagram", "espn body", "jump shot", "vs lebron", "lebron on", "2k rating", "nba hands", "nba draft", "height of", "is 7 feet", "pronounce", "net worth", "nba draft", "grantland", "instagram", "odessa tx", "nashville", "net worth", "nightclub", "nba stats", "images of", "wrestling", "wikipedia", "instagram", "interview", "autograph", "grizzlies", "draft net", "nba draft", "net worth", "nba stats", "lsu stats", "rotoworld", "reference", "nba draft", "instagram", "barcelona", "biography", "interview", "reference", "rotoworld", "net worth", "suns sign", "net worth", "instagram", "nba stats", "wikipedia", "instagram", "foamposite", "best dunks", "eurobasket", "euroleague", "highlights", "okc jersey", "uncle drew", "underneath", "is retired", "kryptonate", "kay felder", "underrated", "restaurant", "glen davis", "did retire", "lamar odom", "leaves nba", "best dunks", "video dunk", "in the nfl", "in college", "top blocks", "does start", "al b. sure", "holy cross", "basketball", "bear clark", "buffalo mn", "copywriter", "highlights", "ohio state", "pittsburgh", "nba salary", "sacramento", "daughter", "jr grade", "headband", "game log", "football", "as a kid", "olympics", "on trump", "contract", "children", "birthday", "earnings", "earrings", "xiii low", "xi shoes", "nickname", "position", "pictures", "wingspan", "wife age", "yo gotti", "vertical", "essay on", "the wall", "quien es", "xbox one", "facebook", "contract", "the diet", "my house", "yo gotti", "house of", "when was", "can dunk", "contract", "wingspan", "facebook", "earnings", "birthday", "game log", "all star", "military", "religion", "orthodox", "vertical", "position", "phonetic", "siblings", "zaragoza", "warriors", "snapchat", "deadspin", "is greek", "nba 2k15", "nba 2k16", "nba 2k14", "is black", "nba vote", "nickname", "nba 2k17", "did grew", "facebook", "baseball", "brooklyn", "football", "contract", "obituary", "musician", "poohtang", "producer", "clippers", "wrestler", "zimbabwe", "linkedin", "and wife", "aldridge", "eisbären", "marriage", "mackolik", "maçkolik", "aldridge", "oklahoma", "contract", "comeback", "d league", "verletzt", "nba 2k15", "lsu team", "lsu dunk", "where is", "nba news", "daughter", "arkansas", "facebook", "football", "birthday", "interviu", "contract", "maçkolik", "mackolik", "transfer", "released", "wingspan", "vertical", "vikipedi", "clarence", "game log", "where is", "bebasket", "nbadraft", "facebook", "zip code", "x reader", "mackolik", "maçkolik", "as a baby", "nba stats", "cleveland", "shoe size", "slam dunk", "rotoworld", "reference", "quits nba", "jump ball", "jump shot", "last game", "last team", "wallpaper", "instagram", "interview", "why trade", "team 2k17", "best game", "best team", "nba trade", "wrestling", "net worth", "instagram", "contracts", "insurance", "olathe ks", "odessa tx", "jp morgan", "vancouver", "rochester", "utah jazz", "minnesota", "north bay", "neurology", "nba stats", "drawing", "son age", "address", "overall", "college", "mansion", "muscles", "brother", "records", "parents", "workout", "wedding", "witness", "youtube", "uniform", "twitter", "tattoos", "tv show", "quiz on", "zapatos", "life of", "beyonce", "best of", "cars of", "drawing", "twitter", "the kid", "tattoos", "youtube", "news on", "what is", "is dead", "brother", "fathead", "cartoon", "celtics", "haircut", "defense", "mixtape", "overall", "is from", "vs heat", "parents", "profile", "youtube", "twitter", "t shirt", "talking", "workout", "website", "kobe on", "is good", "is hurt", "nigeria", "twitter", "hip hop", "designs", "drummer", "chicago", "married", "myspace", "referee", "retired", "nba bio", "jordans", "twitter", "tv host", "wizards", "succezz", "youtube", "amnesty", "memphis", "germany", "unicaja", "youtube", "vikings", "nba bio", "hornets", "raptors", "twitter", "tattoos", "tribune", "wedding", "spotrac", "surgery", "twitter", "twitter", "fantasy", "brother", "maccabi", "married", "to suns", "raptors", "defense", "phoenix", "parents", "youtube", "raptors", "twitter", "youtube", "eurocup", "youtube", "twitter", "twitter", "football", "filipino", "facebook", "and shaq", "earnings", "estatura", "nba team", "d league", "delaware", "on bulls", "vertical", "pelicans", "position", "playoffs", "contract", "comeback", "seahawks", "game log", "yao ming", "released", "xinjiang", "wingspan", "warriors", "the trio", "can dunk", "training", "tel aviv", "flat top", "nba dunk", "shooting", "linkedin", "baseball", "bruisers", "attorney", "cs lewis", "computer", "football", "facebook", "tampa fl", "softball", "obituary", "victoria", "randstad", "pictures", "mckinsey", "wrestler", "salary", "knicks", "jersey", "jacket", "height", "game 7", "father", "family", "finals", "awards", "lakers", "legacy", "outfit", "crying", "career", "mother", "quotes", "images", "income", "retire", "number", "zimbio", "zoom 1", "zoom 3", "points", "poster", "powder", "violin", "update", "eminem", "game 6", "zimbio", "zappos", "lakers", "forbes", "poster", "prince", "reddit", "record", "rookie", "ritual", "age of", "son of", "salary", "my way", "jersey", "who is", "how is", "top 10", "family", "height", "greece", "growth", "lakers", "length", "lebron", "muscle", "mother", "rookie", "reddit", "rating", "origin", "injury", "images", "poster", "points", "salary", "top 10", "travel", "zimbio", "quotes", "future", "update", "upside", "knicks", "jersey", "top 10", "realgm", "who is", "number", "simeon", "salary", "depaul", "rapper", "robbed", "videos", "jodeci", "zodiac", "family", "mother", "boosie", "blocks", "realgm", "knicks", "height", "lakers", "rivals", "salary", "height", "family", "moscow", "macabi", "tattoo", "top 10", "knicks", "realgm", "rivals", "russia", "waived", "sixers", "jersey", "vaikas", "who is", "quotes", "realgm", "sixers", "knicks", "basket", "salary", "realgm", "jersey", "quotes", "temple", "average", "haircut", "how old", "old man", "overall", "vs nets", "vs shaq", "parents", "college", "celtics", "quartet", "spotrac", "retired", "youtube", "jordans", "workout", "twitter", "thunder", "tattoos", "twitter", "bastrop", "bendigo", "atlanta", "calgary", "indiana", "houston", "tolkien", "toronto", "youtube", "memphis", "wedding", "wichita", "shoes", "stats", "house", "draft", "games", "facts", "agent", "movie", "block", "beard", "email", "emoji", "xiiii", "irish", "rings", "pizza", "worth", "young", "yahoo", "video", "vogue", "email", "trade", "trump", "games", "queen", "vine", "funny", "pizza", "beats", "video", "vogue", "about", "draft", "stats", "miami", "james", "young", "hands", "draft", "facts", "funny", "block", "house", "greek", "agent", "memes", "reach", "obama", "voice", "video", "shoes", "shirt", "story", "yahoo", "young", "trade", "forum", "bucks", "stats", "house", "stats", "spurs", "chain", "b o b", "music", "primo", "judge", "trade", "money", "bulls", "dunks", "yahoo", "video", "bulls", "house", "spurs", "stats", "agent", "child", "trade", "signs", "shoes", "video", "draft", "yahoo", "quote", "teams", "x-men", "draft", "turow", "video", "family", "father", "awards", "altura", "braces", "blocks", "myteam", "mother", "height", "salary", "update", "violin", "videos", "visina", "poster", "pacers", "knicks", "return", "reddit", "realgm", "giants", "quotes", "jersey", "retire", "lakers", "lights", "latest", "zasięg", "israel", "injury", "images", "top 10", "author", "asbury", "hockey", "hobbit", "salary", "tennis", "toledo", "gitaar", "guitar", "mother", "soccer", "gatech", "wife", "kids", "king", "dunk", "diet", "dead", "heat", "home", "goat", "gear", "face", "wife", "logo", "life", "lion", "cars", "mask", "born", "espn", "edit", "quiz", "quit", "xiii", "x111", "info", "imdb", "news", "nike", "zoom", "wiki", "vine", "espn", "espy", "team", "xiii", "x 11", "zoom", "logo", "king", "cavs", "vine", "dunk", "diet", "imdb", "nike", "next", "will", "vote", "from", "face", "feet", "espn", "edit", "body", "logo", "arms", "diet", "joke", "ruby", "team", "quiz", "wiki", "meet", "espn", "vine", "life", "roto", "name", "nike", "show", "club", "wife", "pitt", "dunk", "nets", "jazz", "flop", "iowa", "espn", "duke", "news", "espn", "dunk", "team", "wiki", "dunk", "wife", "cska", "team", "suns", "espn", "efes", "news", "vine", "espn", "suns", "dunk", "espn", "eksi", "ekşi", "wiki", "wife", "facts", "funny", "actor", "agent", "bulls", "movie", "music", "memes", "money", "house", "draft", "stats", "under", "prime", "shoes", "spurs", "rings", "young", "yahoo", "yeezy", "worth", "teeth", "spurs", "stats", "umass", "maine", "umich", "age", "son", "kia", "dad", "gif", "mom", "mvp", "xii", "xiv", "ppg", "png", "usa", "e60", "gif", "ppg", "kia", "the", "nba", "car", "bio", "gif", "age", "dad", "mvp", "mix", "mom", "okc", "ppg", "png", "say", "nba", "nba", "son", "bmx", "mlb", "nfl", "usc", "nba", "lsu", "lmu", "age", "inc", "mix", "nba", "now", "nfl", "nba", "nba", "age", "mix", "kid", "son", "gif", "sig", "lnb", "plk", "book", "espn", "news", "dunk", "diet", "cavs", "utep", "cars", "shaq", "quiz", "jump", "edit", "life", "wiki", "team", "tall", "hudl", "espn", "face", "utsa", "golf", "wife", "wiki", "zero", "ncsa", "jr", "ig", "on", "xv", "dj", "vj", "jr", "tv", "pe", "ou", "age", "acl", "mix", "mom", "mvp", "nfl", "nba", "nbl", "now", "dad", "okc", "ppg", "png", "kid", "son", "gsw", "gif", "yao", "lll", "iii", "bio", "fbu", "ibm", "sap", "son", "jpm", "gif", "mma", "nfl", "nba", "now", "uw", "ku", "jr", "md", "mn"];
//</editor-fold>

var currentPlayerDiv = null; //点击了那个div
var leftOrRight = null; //点击了左边的div还是右边的div

var team = new Set();

var p2Name = null; //球员头像
var playerInfo = null; //球员信息

var pc = new ParallelCoordinates('svg');
var timeAxis = new TimeAxis('svg');
var map = new Map("map");

var pop = d3.select("#currentPlayer");
var p_name = pop.select("#name");
var p_img = pop.select("#img");

pc.init({
    initX: 100,
    initY: 430,
    width: 1300,
    height: 600
});
timeAxis.init({
    initX: 280,
    initY: 30,
    width: 1000
});

var bar = new Bar("canvas");
var text = new Text('canvas');
var chart = new Chart('themeRiver');
bar.init({
    initX: 500,
    initY: 200,
    barH: 20,
    len: 500,
    interval: 10,
    showMiddleLine: true
});
text.init({
    initX: 460,
    initY: 200,
    interval: 30
});

var themeRiverData = {};

d3.csv('data/2017.csv', function (d) {
    "use strict";

    d.Age = +d.Age + 1;
    d.GP = +d.GP + 1;
    d.MPG = +d.MPG + 1;
    d.FTA = +d.FTA + 1;
    d.PPG = +d.PPG + 1;
    d.RPG = +d.RPG + 1;
    d.SPG = +d.SPG + 1;
    d.BPG = +d.BPG + 1;
    return d;
}, function (error, data) {
    if (error) throw new Error('an error occurred while retrieving data');

    var playerNames = [];
    var _data = data.map(function (d) {
        team.add(d["Team"]);
        playerNames.push(d.Name.replace(",", "_"));
        return {
            Age: d.Age + 1,
            GP: d.GP + 1,
            MPG: d.MPG + 1,
            FTA: d.FTA + 1,
            PPG: d.PPG + 1,
            RPG: d.RPG + 1,
            SPG: d.SPG + 1,
            BPG: d.BPG + 1
        };
    });
    p2Name = [playerNames[0], playerNames[1]];
    var barData = [_data[0], _data[1]];

    var queue = d3.queue();
    [2010, 2011, 2012, 2013, 2014, 2015, 2016, 2017].forEach(function (d) {
        queue.defer(d3.csv, "data/" + d + ".csv", function (d) {
            "use strict";

            d.Age = +d.Age + 1;
            d.GP = +d.GP + 1;
            d.MPG = +d.MPG + 1;
            d.FTA = +d.FTA + 1;
            d.PPG = +d.PPG + 1;
            d.RPG = +d.RPG + 1;
            d.SPG = +d.SPG + 1;
            d.BPG = +d.BPG + 1;
            return d;
        }, function (error, data) {
            if (error) throw new Error('an error occurred while retrieving data');
            //themeRiverData

            playerNames.forEach(function (p, i) {
                var _p = p.replace("_", ",");
                var obj = null;
                if (!themeRiverData[_p]) {
                    themeRiverData[_p] = [];
                }
                obj = {};
                obj.time = d;
                ["Age", "GP", "MPG", "FTA", "PPG", "RPG", "SPG", "BPG"].forEach(function (r) {
                    obj[r] = data[i][r];
                });
                themeRiverData[_p].push(obj);
            });
        });
    });
    queue.awaitAll(function (error) {
        if (error) throw new Error('an error occurred while retrieving data');
        alert("abc");
    });

    var wordChart = echarts.init(document.getElementById('wordCloud'));
    var _option = {
        backgroundColor: '#F7F7F7',
        series: [{
            name: '球员标签分析',
            type: 'wordCloud',
            sizeRange: [6, 66],
            rotationRange: [-45, 90],
            textPadding: 0,
            autoSize: {
                enable: true,
                minSize: 6
            },
            textStyle: {
                normal: {
                    color: function color() {
                        return 'rgb(' + [Math.round(Math.random() * 160), Math.round(Math.random() * 160), Math.round(Math.random() * 160)].join(',') + ')';
                    }
                },
                emphasis: {
                    shadowBlur: 10,
                    shadowColor: '#333'
                }
            }
        }]
    };

    setTimeout(function () {
        //<editor-fold desc="设置球员面板">
        var plane = d3.select("#plane");
        var playerSelPlane = d3.select("#playerSel");
        //添加分类头--按team分类
        d3.select("#teamHead").selectAll(".header").data([].concat(_toConsumableArray(team))).enter().append("div").attr("v", function (d) {
            return d;
        }).attr("class", "header").html(function (d) {
            return d;
        }).on("click", function (d, i) {
            playerSelPlane.selectAll(".player").style("display", "none");
            playerSelPlane.selectAll("div[team=" + d + "]").style("display", "inline-block");
        });

        var playerSel = playerSelPlane.selectAll(".player").data(playerNames).enter().append("div").attr("team", function (d, i) {
            return data[i]["Team"];
        }).attr("class", "player").style("display", "none").attr("pid", function (d, i) {
            return i;
        }).html(function (d) {
            return d;
        }).on("click", function (d, i) {
            var name = playerNames[d3.select(this).attr("pid")];
            d3.select(currentPlayerDiv).html(name);
            plane.style("display", "none");

            if (leftOrRight === "left") {
                barData[0] = _data[d3.select(this).attr("pid")];
                p2Name[0] = name;
            } else if (leftOrRight === "right") {
                barData[1] = _data[d3.select(this).attr("pid")];
                p2Name[1] = name;
            }
            setPlayerInfo(p2Name);
            bar.barHorizontal(barData);
        });
        d3.select("#teamHead").select("div[v='Ind']").dispatch("click");

        d3.select("#seledLeft").html(playerNames[0]).on("click", function (d, i) {
            currentPlayerDiv = this;
            leftOrRight = "left";
            plane.style("display", "block");
        });
        d3.select("#imgLeft").on("mouseenter", function (d, i) {
            d3.select("#infoLeft").style("display", "inline-block");
        }).on("mouseleave", function () {
            d3.select("#infoLeft").style("display", "none");
        });
        d3.select("#seledRight").html(playerNames[0]).on("click", function (d, i) {
            currentPlayerDiv = this;
            leftOrRight = "right";
            plane.style("display", "block");
        });
        d3.select("#imgRight").on("mouseenter", function (d, i) {
            d3.select("#infoRight").style("display", "inline-block");
        }).on("mouseleave", function () {
            d3.select("#infoRight").style("display", "none");
        });

        //</editor-fold>

        //<editor-fold desc="时间轴">
        var timeRange = [];
        timeRange.push.apply(timeRange, [new Date("2010"), new Date("2011"), new Date("2012"), new Date("2013"), new Date("2014"), new Date("2015"), new Date("2016"), new Date("2017")]);
        timeAxis.rander(timeRange);
        timeAxis.on("click.foo", function (d, i) {
            var year = d.getFullYear();
            d3.csv("data/" + year + ".csv", function (d) {
                "use strict";

                d.Age = +d.Age;
                d.GP = +d.GP;
                d.MPG = +d.MPG;
                d.FTA = +d.FTA;
                d.PPG = +d.PPG;
                d.RPG = +d.RPG;
                d.SPG = +d.SPG;
                d.BPG = +d.BPG;
                return d;
            }, function (error, data) {
                if (error) throw new Error('an error occurred while retrieving data');

                var _data = data.map(function (d) {
                    return {
                        Age: d.Age,
                        GP: d.GP,
                        MPG: d.MPG,
                        FTA: d.FTA,
                        PPG: d.PPG,
                        RPG: d.RPG,
                        SPG: d.SPG,
                        BPG: d.BPG
                    };
                });
                pc.render(_data, click, moouseover);
                d3.select("#ParallelCoordinates").selectAll(".pl").on("click.foo", function (d, i) {
                    d3.select("#seledLeft").html(playerNames[i]);
                    barData[0] = _data[i];
                    bar.barHorizontal(barData);
                });
            });
        });
        //</editor-fold>

        function click(d, i) {
            //更改左边球员
            //名称
            d3.select("#seledLeft").html(playerNames[i]);

            //头像
            p2Name[0] = playerNames[i];
            setPlayerInfo(p2Name);

            //修改柱状图
            barData[0] = _data[i];
            bar.barHorizontal(barData);

            //重绘河流图
            //d3.select("#thremeR_p").html(playerNames[i].replace("_",","));
            chart.themeRiver(themeRiverData[playerNames[i].replace("_", ",")]);

            //重绘文字云
            _option.series[0].data = createWordCloud(playerNames[0]);
            wordChart.setOption(_option);
        }
        function moouseover(d, i) {
            p_name.html(playerNames[i]);
            var url = "https://raw.githubusercontent.com/wilsonCernWq/NBAstatsVIS/master/data/playerList/$2.json";
            p_img.attr("src", "");
            d3.json(url.replace("$2", playerNames[i].toLowerCase()), function (d) {
                "use strict";

                var info = d.info;
                p_img.attr("src", "imgs/" + info["PERSON_ID"] + ".png");
            });
            pop.style("display", "inline-block");
            var coord = d3.mouse(document.getElementById("body"));
            pop.style("left", coord[0] + "px");
            pop.style("top", coord[1] + "px");
        }
        //<editor-fold desc="平行线坐标">
        pc.render(_data, click, moouseover);
        //</editor-fold>

        //<editor-fold desc="柱状图">
        setPlayerInfo(p2Name);
        bar.barHorizontal(barData);
        text.textHorizontal(Object.keys(_data[0]), {
            font: "bold 14px Arial",
            textAlign: "center",
            textBaseline: "top",
            fillStyle: "#7FFFD4"
        });
        //</editor-fold>

        //d3.select("#thremeR_p").html(playerNames[0].replace("_",","));
        chart.themeRiver(themeRiverData[playerNames[0].replace("_", ",")]);

        //<editor-fold desc="力导向图">
        d3.csv("data/2010.csv", function (d) {
            return d;
        }, function (error, data) {
            var team = {};
            var forceData = {
                nodes: [],
                links: []
            };
            data.forEach(function (d, i) {
                forceData.nodes.push({ id: d["Name"] });
                var arr = team[d["Team"]];
                if (!arr) {
                    arr = [];
                    team[d["Team"]] = arr;
                }
                arr.push(d["Name"]);
            });

            /*let team = {};
             for(let i=0, vals = Object.keys(_team); i<vals.length/2; i++){
             team[vals[i]] = _team[vals[i]];
             }*/

            var _iteratorNormalCompletion = true;
            var _didIteratorError = false;
            var _iteratorError = undefined;

            try {
                for (var _iterator = Object.keys(team)[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
                    var k = _step.value;

                    var arr = team[k];
                    for (var i = 0; i < arr.length - 1; i++) {
                        for (var j = i + 1; j < arr.length; j++) {
                            forceData.links.push({ source: arr[i], target: arr[j] });
                        }
                    }
                }
            } catch (err) {
                _didIteratorError = true;
                _iteratorError = err;
            } finally {
                try {
                    if (!_iteratorNormalCompletion && _iterator.return) {
                        _iterator.return();
                    }
                } finally {
                    if (_didIteratorError) {
                        throw _iteratorError;
                    }
                }
            }

            var rainbow = d3.interpolateRainbow,
                convert = d3.scaleLinear().domain([0, forceData['nodes'].length]).range([0, 1]);
            //draw

            map.forceDirectedGraph(forceData, { colors: function colors(i) {
                    return rainbow(convert(i));
                } });
        });
        //</editor-fold>


        //<editor-fold desc="文字云">
        _option.series[0].data = createWordCloud(playerNames[0]);
        wordChart.setOption(_option);
        //</editor-fold>
    }, 2000);

    function createWordCloud(name) {
        var _n = name.replace("_", ",");
        var allStart = nameWord[_n];
        var JosnList = [];
        //Math.ceil(Math.random()*900)
        if (allStart) {
            for (var i = 0; i < 500; i++) {
                JosnList.push({
                    "name": commonWrod[Math.ceil(Math.random() * 900)],
                    "value": Math.ceil(Math.random() * 900)
                });
            }
            JosnList.push({
                "name": allStart,
                "value": 1300
            });
        } else {
            for (var _i = 0; _i < 500; _i++) {
                JosnList.push({
                    "name": commonWrod[Math.ceil(Math.random() * 900)],
                    "value": Math.ceil(Math.random() * 900)
                });
            }
            JosnList.push({
                "name": commonWrod[Math.ceil(Math.random() * 900)],
                "value": 1300
            });
        }
        return JosnList;
    }
});

function setPlayerInfo(playerName) {
    var url = "https://raw.githubusercontent.com/wilsonCernWq/NBAstatsVIS/master/data/playerList/$2.json";
    d3.json(url.replace("$2", playerName[0].toLowerCase()), function (d) {
        "use strict";

        var info = d.info;
        d3.select("#img_L").attr("src", "imgs/" + info["PERSON_ID"] + ".png");
        var infoPlane = d3.select("#infoLeft");
        infoPlane.select("#nameLeft").html("NAME: " + playerName[0]);
        infoPlane.select("#weightLeft").html("WEIGHT: " + info["WEIGHT"]);
        infoPlane.select("#schoolLeft").html("SCHOOL: " + info["SCHOOL"]);
        infoPlane.select("#birthdateLeft").html("BIRTHDATE: " + info["BIRTHDATE"]);
        infoPlane.select("#heightLeft").html("HEIGHT: " + info["HEIGHT"]);
        infoPlane.select("#positionLeft").html("POSITION: " + info["POSITION"]);
        infoPlane.select("#posterstatusLeft").html("ROSTERSTATUS: " + info["ROSTERSTATUS"]);
    });
    d3.json(url.replace("$2", playerName[1].toLowerCase()), function (d) {
        "use strict";

        var info = d.info;
        d3.select("#img_R").attr("src", "imgs/" + info["PERSON_ID"] + ".png");

        var infoPlane = d3.select("#infoRight");
        infoPlane.select("#nameRight").html("NAME: " + playerName[1]);
        infoPlane.select("#weightRight").html("WEIGHT: " + info["WEIGHT"]);
        infoPlane.select("#schoolRight").html("SCHOOL: " + info["SCHOOL"]);
        infoPlane.select("#birthdateRight").html("BIRTHDATE: " + info["BIRTHDATE"]);
        infoPlane.select("#heightRight").html("HEIGHT: " + info["HEIGHT"]);
        infoPlane.select("#positionRight").html("POSITION: " + info["POSITION"]);
        infoPlane.select("#posterstatusRight").html("ROSTERSTATUS: " + info["ROSTERSTATUS"]);
    });
}

/***/ })
],[11]);