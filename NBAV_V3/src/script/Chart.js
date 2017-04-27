/**
 * 项目名称 - 版本号
 * 类名称
 * @author : lenovo
 * 基础类
 * @description : 请添加描述信息
 * @date : 2017/4/23
 */
"use strict";

let time = [2010,2011,2012,2013,2014,2015,2016,2017];
let d3 = require('d3');
import {Common} from './Common.js';
export class Chart{
    constructor(svg){
        if(new.target !== Chart){
            throw new Error("Chart 不是函数，请使用new来生成实例~~~");
        }

        if(typeof svg === 'string'){
            this.svg = d3.select("#"+svg);
        }else {
            this.svg = svg;
        }
        //this.context = this.canvas.getContext('2d');

        let streamG= this.svg.append("g")
            .attr("id","streamG")
            .attr('transform','translate(70,50)');
        this.streamG = streamG;

        let options = this.options = {};
        //let d3Canvas = d3.select(this.canvas);
        options.padding = 50;
        options.width = +this.svg.attr('width') - options.padding;
        options.height = 600;//+this.svg.attr('height')/5*3;
        options.color = d3.interpolateCool;

    }

    themeRiver(data,options){
        //todo 构造options

        /**stack 生成器
         * 必须设置key访问器，stack 生成器按照key来生成数据，返回一个数组，数组每个元素代表对应的key值对应的数据序列，
         * 序列内部就是按照剩下的哪一个数组元素的key计算出的堆叠偏移量，
         *
         * 默认情况下使用第一个分量作为计算堆叠偏移量的key,使用剩下的n-1个作为分组计算
         */
            //this.context.translate(50,0);

            this.clean();
        let _options = this.options;
        let props=["Age","BPG","FTA","GP","MPG","PPG","RPG","SPG"];
        //todo 添加一些themeRiver特有的配置属性
        Object.assign(_options,{
            order: d3.stackOrderNone,//次序是根据keys得到的，相当于没有排序
            offset: d3.stackOffsetWiggle
        });
        Object.assign(_options,options);

        let auxiliaryG = this.svg.append('g');

        console.log(data[0]);
        let keys = Object.keys(data[0]);


        let sliceK = keys.slice(1);
        let stack = d3.stack()
            .keys(sliceK)
            .order(_options.order)
            .offset(_options.offset);

        let _data = stack(data);

        let x = d3.scaleLinear()
            .domain([0, time.length+1])
            .range([0, _options.width]);


        let y = d3.scaleLinear()
            .domain([d3.min(_data,Common.stackMin),d3.max(_data,Common.stackMax)])
            .range([_options.height, 0]);

        let z = d3.scaleLinear()
            .domain([0,sliceK.length])
            .range([0,1]);

        let area = d3.area()
            .x((d,i)=>x(i))
            .y0((d)=>y(d[0]))
            .y1((d)=>y(d[1]))
            .curve(d3.curveNatural);
        //.context(this.context);

        //arc生成器
        let arc2 = d3.arc()
            .innerRadius(0)
            .outerRadius(_options.height/4);
        let pie = d3.pie()
            .value(function (d) {
                return d['v'];
            });


        let streamG = this.streamG;
        streamG.selectAll(".stream")
            .data(_data)
            .enter().append("path")
            .attr("class",'stream')
            .attr('transform','translate('+_options.padding+',0)')
            .attr("d", area)
            .attr("fill", function(d,i) { return _options.color(z(i)); })
            .on("mouseover",function (d, i) {
                let themeRN = d3.select("#themeRN")
                    .html(props[i]);
                let coord = d3.mouse(document.getElementById("body"));
                themeRN.style("left",coord[0]+"px");
                themeRN.style("top",coord[1]+"px");
                themeRN.style("display","inline-block");
            })
            .on("mouseout",function (d, i) {
                d3.select("#themeRN").style("display","none");
            });

        //设置缓冲区
        let buffer = [];
        for (let i=0; i< time.length; i++){
            let d = x(i);
            buffer.push([d-10, d+10]);
        }
        let popup = d3.select("#popup");

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


        let orderScale = d3.scaleOrdinal()
            .domain(time)
            .range((function () {
                let range=[];
                for(let i=0; i<=time.length; i++){
                    range.push(x(i));
                }
                return range;
            }()));
        //x轴

        //let svg = d3.select("#svg");
        streamG.append("g")
            .attr("transform", "translate("+_options.padding+"," + _options.height + ")")
            .call(d3.axisBottom(orderScale).ticks(time.length));
        //y轴
        let axisLeft = this.axis([d3.max(_data,Common.stackMax), d3.min(_data,Common.stackMin)],{
            scale:d3.scaleLinear,
            direction:'axisLeft'
        });
        streamG.append("g")
            .attr("transform", "translate("+_options.padding+",0)")
            .call(d3.axisLeft(y));

        /* streamG.append("g")
         .attr("transform", "translate("+_options.padding+",0)")
         .call(d3.axisBottom(orderScale).ticks(time.length));*/


    }
    clean(){
        this.streamG.remove();
        this.streamG= this.svg.append("g")
            .attr("id","streamG")
            .attr('transform','translate(70,50)');
    }

    /**
     * 顺序
     * @param domain
     * @param option
     */
    axis(domain, option){
        let _option =this.options;
        //初始化默认选项
        Object.assign(_option,{
            scale:d3.scaleOrdinal,
            direction:'axisBottom',
            order:'asc'
        });
        //用户配置选项
        Object.assign(_option, option);

        let scale = _option.scale()
            .domain(domain);

        if(_option.order === 'asc'){
            if(_option.direction === 'axisBottom' || _option.direction === 'axisTop'){
                scale.range([0,_option.width]);
            }else if(_option.direction === 'axisLeft' || _option.direction === 'axisRight') {
                scale.range([0,_option.height]);
            }
        }else {
            if(_option.direction === 'axisBottom' || _option.direction === 'axisTop'){
                scale.range([_option.width,0]);
            }else if(_option.direction === 'axisLeft' || _option.direction === 'axisRight') {
                scale.range([_option.height,0]);
            }
        }

        //d3.axisBottom(orderScale)
        return d3[_option.direction](scale);

    }
}