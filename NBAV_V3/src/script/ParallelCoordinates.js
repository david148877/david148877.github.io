/**
 * 项目名称 - 版本号
 * 类名称
 * @author : lenovo
 * 基础类
 * @description : 请添加描述信息
 * @date : 2017/4/18
 */
let d3 = require("d3");
let colors = d3.interpolateCool;
let opt = {};
export class ParallelCoordinates{
    constructor(svg){
        if(new.target !== ParallelCoordinates){
            throw new Error("you should use new to create a instance!");
        }
        typeof svg ==="string"?
            this.svg = d3.select("#"+svg):
            this.svg = d3.select(svg);

        this.g = this.svg.append('g')
            .attr('id','ParallelCoordinates');

        opt={};
        Object.assign(opt,{
            width: +this.svg.attr('width'),
            height: +this.svg.attr('height'),
            color: colors
        });

    }
    init(opts){
        Object.assign(opt,opts);
    }

    render(data,fun,fun2){
        this.clean();
        //重新构造data
        let pop = d3.select("#currentPlayer");
/*        let p_name = pop.select("#name");
        let p_img = pop.select("#img");*/
        let keys = Object.keys(data[0]);
        let _keys = ["Game Played","Minute Per Game","Free Throw Attempt",
            "Point Per Game","Rebound Per Game","Steal Per Game","Block Per Game"];
        opt.keys = keys;
        opt.data = data;
        let self = this;
        let _data = keys.map((k)=>{
            let innerD=[];
            data.forEach((d)=>{
                innerD.push(d[k]);
            });
            return innerD;
        });

        //if(!opt.scaleX){
            opt.scaleX = d3.scaleLinear()
                .domain([0,keys.length-1])
                .range([opt.initX, opt.initX+opt.width]);
        //}

        //if(!opt.scaleYs){
            opt.scaleYs = [];
            _data.forEach((d, i)=>{
                opt.scaleYs[i] = d3.scaleLinear()
                    .domain(d3.extent(d))
                    .range([opt.initY+opt.height, opt.initY]);
            });
        //}
        if(typeof opt.colorTransform !== 'function'){
            opt.colorTransform = d3.scaleLinear()
                .domain([0,keys.length])
                .range([0,1]);
        }

        opt.line = d3.line();


        // Add blue foreground lines for focus.
        this.g.append("g")
            //.attr("class", "foreground")
            .selectAll("path")
            .data(data)
            .enter().append("path")
            .attr('class','pl')
            .attr("d", ParallelCoordinates.path)
            .style('stroke',"#88FFFE")//(d,i)=>opt.color(opt.colorTransform(i))
            .style('stroke-width',1)
            .style('fill','none')
            .on('click',(d,i)=>{
                self.render(data,fun,fun2);
                fun(d,i,fun2);
                d3.selectAll('.pl')
                    .filter((_d,i)=>{
                        return d !== _d;
                    })
                    .style('stroke','#ddd')
                    .style('stroke-width',1)
                    .style("opacity","0.3")
                    .style('shape-rendering','crispEdges')
                    .style('fill','none');
                d3.selectAll('.pl')
                    .filter((_d,i)=>{
                        return d == _d;
                    })
                    .style('stroke-width',2);
                d3.event.stopPropagation();
            })
            .on("mouseover",function (d, i) {
                fun2(d,i);
            })
            .on("mouseout",function (d, i) {
                pop.style("display","none");
            });


        let brush = d3.brush()
            .on("start", brushStart.bind(this))
            .on("end", brushended);
        // Add an axis and title.
        let axisY = this.g.append("g")
            .attr('id','axisY');
        keys.forEach((d,i)=>{
            axisY.append('g')
                .attr('class','axis')
                .call(d3.axisLeft(opt.scaleYs[i]))
                .attr("transform","translate("+opt.scaleX(i)+",0)")
                .append('text')
                .style("text-anchor", "middle")
                .attr("y", opt.initY - 10)
                .style("stroke",'black')
                .style('fill','none')
                .text(_keys[i]);
            //add brush
            this.g.append('g')
                .attr('bid',i)
                .attr("class", "brush")
                .attr('width','30')
                .attr("transform","translate("+opt.scaleX(i)+",0)")
                .call(brush)
                .selectAll("rect")
                .attr("x", -8)
                .attr("width", 16);
        });

        this.svg.on('click',function () {
            self.render(data,fun,fun2);
        });

    }

    setScaleX(scaleX){
        this.scaleX = scaleX;
    }
    setScaleYs(scaleYs){
        this.scaleYs = scaleYs;
    }
    colorTransfom(colorTransform){
        opt.colorTransform = colorTransform;
    }

    clean(){
        this.g.remove();
        this.g = this.svg.append('g')
            .attr('id','ParallelCoordinates');
        //this.g.html("");
    }
    static path(d){
        return opt.line(Object.keys(d).map((_d,i)=>{
            return [opt.scaleX(i),opt.scaleYs[i](d[_d])];
        }));
    }
}

function brushStart() {
    //console.log(('brushed'));
    this.render(opt.data);

}
function brushended(d) {
    let selection = d3.event.selection;
    let minX = selection[0][0];
    let minXY = selection[0][1];
    let maxX = selection[1][0];
    let maxXY = selection[1][1];


    let i = d3.select(this).attr('bid');

    d3.selectAll('.pl')
        .filter((_d)=>{
            let val = opt.scaleYs[i](_d[opt.keys[i]]);
            return !(val>=minXY && val<=maxXY);
        })
        .style('stroke','#ddd')
        .style('shape-rendering','crispEdges')
        .style('fill','none');
    //d3.event.stopPropagation();

}

