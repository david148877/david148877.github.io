
import '../css/style.css';
import '../css/svg.css';
import '../css/nice-select.css';
let d3 = require('d3');
let {Bar} = require('./Bar');
let {Common} = require('./Common');
let {Text} = require('./Text');
let {ParallelCoordinates} = require('./ParallelCoordinates');
let {TimeAxis} = require('./TimeAxis');
let {Chart} = require("./Chart");
let {Map} = require("./Map");

//<editor-fold desc="word cloud data">
let nameWord={
    "Kyrie,Irving":"Big Heart",
    "DeMar,DeRozan":"No.1 Kobe Fan",
    "LeBron,James":"Empire",
    "Giannis,Antetokounmpo":"Mr.Letter",
    "Jimmy,Butler":"Jordan's son？",
    "Stephen,Curry":"From Downtown",
    "James,Harden":"Euro Step",
    "Kevin,Durant":"For champion?",
    "Kawhi,Leonard":"No expression",
    "Anthony,Davis":"Mr.Eyebrows",
    "John,Wall":"Fastest Guard",
    "Isaiah,Thomas":"Best 175",
    "Kyle,Lowry":"Injury",
    "Paul,George":"New shoes",
    "Kevin,Love":"best family name",
    "Russell,Westbrook":"Non human",
    "Klay,Thompson":"God thom",
    "Draymond,Green":"Tough defence",
    "Marc,Gasol":"The Spinach Brother",
    "Dwyane,Wade":"Thunder",
    "Carmelo,Anthony":"Sweetie of apple",
    "Kobe,Bryant":"Mamba",
    "Blake,Griffin":"Slam dunk",
    "Tim,Duncan":"Bank shot",
    "Dirk,Nowitzki":"Grestest international",
    "Pau,Gasol":"The Spinach Brother",
    "Chris,Paul":"Speed",
    "Dwight,Howard":"Beast",
    "Tony,Parker":"Frendch speedie",
    "Rajon,Rondo":"Can him shot?",
    "Paul,Pierce":"Faith",
    "Steve,Nash":"no looking pass",
    "Derrick,Rose":"son of wind",
    "Manu,Ginóbili":"Argentina hawk",
    "Allen,Iverson":"Answer"
};
let commonWrod = ["wallpaper","king kong","game show","greatness",
    "shoe size","autograph","liverpool","lion logo","old shoes","biography",
    "education","eye color","questions","quiz 2016","qualities","interview",
    "i promise","rotoworld","net worth","new shoes","years pro",
    "usa shoes","ellie day","the block","quotes by","disney xd",
    "update on","usa today","father of","family of","photos of",
    "rotoworld","rap about","crossover","space jam","the shoes",
    "old shoes","jim brown","jordan vs","height of","instagram",
    "is injury","new shoes","net worth","is clutch","ethnicity","extension",
    "cyberface","childhood","hand size","hairstyle","last name","languages",
    "last game","autograph","dunk 2017","rotoworld","overrated","interview",
    "instagram","potential","shoe size","shoe deal","years pro","yesterday",
    "zach lowe","wallpaper","jersey uk","vs knicks","instagram","espn body",
    "jump shot","vs lebron","lebron on","2k rating","nba hands","nba draft","height of",
    "is 7 feet","pronounce","net worth","nba draft","grantland","instagram","odessa tx","nashville","net worth","nightclub",
    "nba stats","images of","wrestling","wikipedia","instagram","interview","autograph","grizzlies","draft net","nba draft",
    "net worth","nba stats","lsu stats","rotoworld","reference","nba draft","instagram","barcelona","biography","interview",
    "reference","rotoworld","net worth","suns sign","net worth","instagram","nba stats","wikipedia","instagram","foamposite",
    "best dunks","eurobasket","euroleague","highlights","okc jersey","uncle drew","underneath","is retired","kryptonate",
    "kay felder","underrated","restaurant","glen davis","did retire","lamar odom","leaves nba","best dunks","video dunk",
    "in the nfl","in college","top blocks","does start","al b. sure","holy cross","basketball","bear clark","buffalo mn",
    "copywriter","highlights","ohio state","pittsburgh","nba salary","sacramento","daughter","jr grade","headband","game log",
    "football","as a kid","olympics","on trump","contract","children","birthday","earnings","earrings","xiii low","xi shoes",
    "nickname","position","pictures","wingspan","wife age","yo gotti","vertical","essay on","the wall","quien es","xbox one",
    "facebook","contract","the diet","my house","yo gotti","house of","when was","can dunk","contract","wingspan","facebook",
    "earnings","birthday","game log","all star","military","religion","orthodox","vertical","position","phonetic","siblings","zaragoza","warriors","snapchat","deadspin","is greek","nba 2k15","nba 2k16","nba 2k14","is black","nba vote","nickname","nba 2k17","did grew","facebook","baseball","brooklyn","football","contract","obituary","musician","poohtang","producer","clippers","wrestler","zimbabwe","linkedin","and wife","aldridge","eisbären","marriage","mackolik","maçkolik","aldridge","oklahoma","contract","comeback","d league","verletzt","nba 2k15","lsu team","lsu dunk","where is","nba news","daughter","arkansas","facebook","football","birthday","interviu","contract","maçkolik","mackolik","transfer","released","wingspan","vertical","vikipedi","clarence","game log","where is","bebasket","nbadraft","facebook","zip code","x reader","mackolik","maçkolik","as a baby","nba stats","cleveland","shoe size","slam dunk","rotoworld","reference","quits nba","jump ball","jump shot","last game","last team","wallpaper","instagram","interview","why trade","team 2k17","best game","best team","nba trade","wrestling","net worth","instagram","contracts","insurance","olathe ks","odessa tx","jp morgan","vancouver","rochester","utah jazz","minnesota","north bay","neurology","nba stats","drawing","son age","address","overall","college","mansion","muscles","brother","records","parents","workout","wedding","witness","youtube","uniform","twitter","tattoos","tv show","quiz on","zapatos","life of","beyonce","best of","cars of","drawing","twitter","the kid","tattoos","youtube","news on","what is","is dead","brother","fathead","cartoon","celtics","haircut","defense","mixtape","overall","is from","vs heat","parents","profile","youtube","twitter","t shirt","talking","workout","website","kobe on","is good","is hurt","nigeria","twitter","hip hop","designs","drummer","chicago","married","myspace","referee","retired","nba bio","jordans","twitter","tv host","wizards","succezz","youtube","amnesty","memphis","germany","unicaja","youtube","vikings","nba bio","hornets","raptors","twitter","tattoos","tribune","wedding","spotrac","surgery","twitter","twitter","fantasy","brother","maccabi","married","to suns","raptors","defense","phoenix","parents","youtube","raptors","twitter","youtube","eurocup","youtube","twitter","twitter","football","filipino","facebook","and shaq","earnings","estatura","nba team","d league","delaware","on bulls","vertical","pelicans","position","playoffs","contract","comeback","seahawks","game log","yao ming","released","xinjiang","wingspan","warriors","the trio","can dunk","training","tel aviv","flat top","nba dunk","shooting","linkedin","baseball","bruisers","attorney","cs lewis","computer","football","facebook","tampa fl","softball","obituary","victoria","randstad","pictures","mckinsey","wrestler","salary","knicks","jersey","jacket","height","game 7","father","family","finals","awards","lakers","legacy","outfit","crying","career","mother","quotes","images","income","retire","number","zimbio","zoom 1","zoom 3","points","poster","powder","violin","update","eminem","game 6","zimbio","zappos","lakers","forbes","poster","prince","reddit","record","rookie","ritual","age of","son of","salary","my way","jersey","who is","how is","top 10","family","height","greece","growth","lakers","length","lebron","muscle","mother","rookie","reddit","rating","origin","injury","images","poster","points","salary","top 10","travel","zimbio","quotes","future","update","upside","knicks","jersey","top 10","realgm","who is","number","simeon","salary","depaul","rapper","robbed","videos","jodeci","zodiac","family","mother","boosie","blocks","realgm","knicks","height","lakers","rivals","salary","height","family","moscow","macabi","tattoo","top 10","knicks","realgm","rivals","russia","waived","sixers","jersey","vaikas","who is","quotes","realgm","sixers","knicks","basket","salary","realgm","jersey","quotes","temple","average","haircut","how old","old man","overall","vs nets","vs shaq","parents","college","celtics","quartet","spotrac","retired","youtube","jordans","workout","twitter","thunder","tattoos","twitter","bastrop","bendigo","atlanta","calgary","indiana","houston","tolkien","toronto","youtube","memphis","wedding","wichita","shoes","stats","house","draft","games","facts","agent","movie","block","beard","email","emoji","xiiii","irish","rings","pizza","worth","young","yahoo","video","vogue","email","trade","trump","games","queen","vine","funny","pizza","beats","video","vogue","about","draft","stats","miami","james","young","hands","draft","facts","funny","block","house","greek","agent","memes","reach","obama","voice","video","shoes","shirt","story","yahoo","young","trade","forum","bucks","stats","house","stats","spurs","chain","b o b","music","primo","judge","trade","money","bulls","dunks","yahoo","video","bulls","house","spurs","stats","agent","child","trade","signs","shoes","video","draft","yahoo","quote","teams","x-men","draft","turow","video","family","father","awards","altura","braces","blocks","myteam","mother","height","salary","update","violin","videos","visina","poster","pacers","knicks","return","reddit","realgm","giants","quotes","jersey","retire","lakers","lights","latest","zasięg","israel","injury","images","top 10","author","asbury","hockey","hobbit","salary","tennis","toledo","gitaar","guitar","mother","soccer","gatech","wife","kids","king","dunk","diet","dead","heat","home","goat","gear","face","wife","logo","life","lion","cars","mask","born","espn","edit","quiz","quit","xiii","x111","info","imdb","news","nike","zoom","wiki","vine","espn","espy","team","xiii","x 11","zoom","logo","king","cavs","vine","dunk","diet","imdb","nike","next","will","vote","from","face","feet","espn","edit","body","logo","arms","diet","joke","ruby","team","quiz","wiki","meet","espn","vine","life","roto","name","nike","show","club","wife","pitt","dunk","nets","jazz","flop","iowa","espn","duke","news","espn","dunk","team","wiki","dunk","wife","cska","team","suns","espn","efes","news","vine","espn","suns","dunk","espn","eksi","ekşi","wiki","wife","facts","funny","actor","agent","bulls","movie","music","memes","money","house","draft","stats","under","prime","shoes","spurs","rings","young","yahoo","yeezy","worth","teeth","spurs","stats","umass","maine","umich","age","son","kia","dad","gif","mom","mvp","xii","xiv","ppg","png","usa","e60","gif","ppg","kia","the","nba","car","bio","gif","age","dad","mvp","mix","mom","okc","ppg","png","say","nba","nba","son","bmx","mlb","nfl","usc","nba","lsu","lmu","age","inc","mix","nba","now","nfl","nba","nba","age","mix","kid","son","gif","sig","lnb","plk","book","espn","news","dunk","diet","cavs","utep","cars","shaq","quiz","jump","edit","life","wiki","team","tall","hudl","espn","face","utsa","golf","wife","wiki","zero","ncsa","jr","ig","on","xv","dj","vj","jr","tv","pe","ou","age","acl","mix","mom","mvp","nfl","nba","nbl","now","dad","okc","ppg","png","kid","son","gsw","gif","yao","lll","iii","bio","fbu","ibm","sap","son","jpm","gif","mma","nfl","nba","now","uw","ku","jr","md","mn"];
//</editor-fold>

let currentPlayerDiv=null;//click div
let leftOrRight=null;//intial click

let team = new Set();

let p2Name = null;//Players Profile photo
let playerInfo = null;//players info

let pc = new ParallelCoordinates('svg');
let timeAxis = new TimeAxis('svg');
let map = new Map("map");

let pop = d3.select("#currentPlayer");
let p_name = pop.select("#name");
let p_img = pop.select("#img");

pc.init({
    initX:100,
    initY:430,
    width:1300,
    height:600
});
timeAxis.init({
    initX:280,
    initY:30,
    width:1000
});

let bar = new Bar("canvas");
let text = new Text('canvas');
let chart = new Chart('themeRiver');
bar.init({
    initX:500,
    initY:200,
    barH:20,
    len:500,
    interval:10,
    showMiddleLine:true
});
text.init({
    initX:460,
    initY:200,
    interval:30
});

let themeRiverData = {};

d3.csv('data/2017.csv',(d)=>{
    "use strict";
    d.Age = +d.Age + 1;
    d.GP =  +d.GP + 1;
    d.MPG = +d.MPG + 1;
    d.FTA = +d.FTA + 1;
    d.PPG = +d.PPG + 1;
    d.RPG = +d.RPG + 1;
    d.SPG = +d.SPG + 1;
    d.BPG = +d.BPG + 1;
    return d;
},(error,data)=>{
    if(error)
        throw new Error('an error occurred while retrieving data');

    let playerNames = [];
    let _data = data.map((d)=>{
        team.add(d["Team"]);
        playerNames.push(d.Name.replace(",","_"));
        return {
            Age:d.Age + 1,
            GP:d.GP + 1,
            MPG:d.MPG + 1,
            FTA:d.FTA + 1,
            PPG:d.PPG + 1,
            RPG:d.RPG + 1,
            SPG:d.SPG + 1,
            BPG:d.BPG + 1
        }
    });
    p2Name=[playerNames[0],playerNames[1]];
    let barData=[_data[0], _data[1]];

    let queue = d3.queue();
    [2010,2011,2012,2013,2014,2015,2016,2017].forEach((d)=>{
        queue.defer(d3.csv,"data/"+d+".csv",(d)=>{
            "use strict";
            d.Age = +d.Age + 1;
            d.GP =  +d.GP + 1;
            d.MPG = +d.MPG + 1;
            d.FTA = +d.FTA + 1;
            d.PPG = +d.PPG + 1;
            d.RPG = +d.RPG + 1;
            d.SPG = +d.SPG + 1;
            d.BPG = +d.BPG + 1;
            return d;
        },(error,data)=>{
            if(error)
                throw new Error('an error occurred while retrieving data');
            //themeRiverData

            playerNames.forEach((p,i)=>{
                let _p = p.replace("_", ",");
                let obj=null;
                if(!themeRiverData[_p]){
                    themeRiverData[_p] = [];
                }
                obj = {};
                obj.time = d;
                ["Age","GP","MPG","FTA","PPG","RPG","SPG","BPG"].forEach((r)=>{
                    obj[r] = data[i][r];
                });
                themeRiverData[_p].push(obj)
            });
        });
    });
    queue.awaitAll(function (error) {
        if(error)
            throw new Error('an error occurred while retrieving data');
        alert("abc");
    });

    let wordChart = echarts.init(document.getElementById('wordCloud'));
    let _option = {
        backgroundColor: '#F7F7F7',
        series: [{
            name: 'players tags analyze',
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
                    color: function() {
                        return 'rgb(' + [
                                Math.round(Math.random() * 160),
                                Math.round(Math.random() * 160),
                                Math.round(Math.random() * 160)
                            ].join(',') + ')';
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
        
        let plane = d3.select("#plane");
        let playerSelPlane = d3.select("#playerSel");
        //
        d3.select("#teamHead")
            .selectAll(".header")
            .data([...team])
            .enter().append("div")
            .attr("v",(d)=>d)
            .attr("class","header")
            .html((d)=>d)
            .on("click",(d,i)=>{
                playerSelPlane.selectAll(".player")
                    .style("display","none");
                playerSelPlane.selectAll("div[team="+d+"]")
                    .style("display","inline-block");
            });

        let playerSel = playerSelPlane.selectAll(".player")
            .data(playerNames)
            .enter().append("div")
            .attr("team",(d,i)=>data[i]["Team"])
            .attr("class","player")
            .style("display","none")
            .attr("pid",(d,i)=>i)
            .html((d)=>d)
            .on("click",function (d, i) {
                let name = playerNames[d3.select(this).attr("pid")];
                d3.select(currentPlayerDiv)
                    .html(name);
                plane.style("display","none");

                if(leftOrRight === "left"){
                    barData[0]=_data[d3.select(this).attr("pid")];
                    p2Name[0]=name;
                }else if(leftOrRight === "right"){
                    barData[1]=_data[d3.select(this).attr("pid")];
                    p2Name[1]=name;
                }
                setPlayerInfo(p2Name);
                bar.barHorizontal(barData);
            });
        d3.select("#teamHead").select("div[v='Ind']").dispatch("click");

        d3.select("#seledLeft").html(playerNames[0])
            .on("click",function (d, i) {
                currentPlayerDiv = this;
                leftOrRight = "left";
                plane.style("display","block");
            });
        d3.select("#imgLeft")
            .on("mouseenter",function (d, i) {
                d3.select("#infoLeft").style("display","inline-block");
            })
            .on("mouseleave",function () {
                d3.select("#infoLeft").style("display","none");
            });
        d3.select("#seledRight").html(playerNames[0])
            .on("click",function (d, i) {
                currentPlayerDiv = this;
                leftOrRight = "right";
                plane.style("display","block");
            });
        d3.select("#imgRight")
            .on("mouseenter",function (d, i) {
                d3.select("#infoRight").style("display","inline-block");
            })
            .on("mouseleave",function () {
                d3.select("#infoRight").style("display","none");
            });

        //</editor-fold>

     
        let timeRange = [];
        timeRange.push(...[new Date("2010"),new Date("2011"),new Date("2012"),new Date("2013"),
            new Date("2014"),new Date("2015"),new Date("2016"),new Date("2017")]);
        timeAxis.rander(timeRange);
        timeAxis.on("click.foo",function (d, i) {
            let year = d.getFullYear();
            d3.csv("data/"+year+".csv",(d)=>{
                "use strict";
                d.Age = +d.Age;
                d.GP =  +d.GP;
                d.MPG = +d.MPG;
                d.FTA = +d.FTA;
                d.PPG = +d.PPG;
                d.RPG = +d.RPG;
                d.SPG = +d.SPG;
                d.BPG = +d.BPG;
                return d;
            },(error,data)=>{
                if(error)
                    throw new Error('an error occurred while retrieving data');

                let _data = data.map((d)=>{
                    return {
                        Age:d.Age,
                        GP:d.GP,
                        MPG:d.MPG,
                        FTA:d.FTA,
                        PPG:d.PPG,
                        RPG:d.RPG,
                        SPG:d.SPG,
                        BPG:d.BPG
                    }
                });
                pc.render(_data,click,moouseover);
                d3.select("#ParallelCoordinates").selectAll(".pl")
                    .on("click.foo",function (d, i) {
                        d3.select("#seledLeft")
                            .html(playerNames[i]);
                        barData[0]=_data[i];
                        bar.barHorizontal(barData);
                    });
            });
        });
        //</editor-fold>

        function click(d,i) {
            
            //
            d3.select("#seledLeft")
                .html(playerNames[i]);

            //Profile
            p2Name[0]=playerNames[i];
            setPlayerInfo(p2Name);

            //Edit Bar
            barData[0]=_data[i];
            bar.barHorizontal(barData);

           
            chart.themeRiver(themeRiverData[playerNames[i].replace("_",",")]);

            //Word Cloud
            _option.series[0].data = createWordCloud(playerNames[0]);
            wordChart.setOption(_option);
        }
        function moouseover(d, i) {
            p_name.html(playerNames[i]);
            let url = "https://raw.githubusercontent.com/wilsonCernWq/NBAstatsVIS/master/data/playerList/$2.json";
            p_img.attr("src","");
            d3.json(url.replace("$2",playerNames[i].toLowerCase()),(d)=>{
                "use strict";
                let info = d.info;
                p_img.attr("src","imgs/"+info["PERSON_ID"]+".png");
            });
            pop.style("display","inline-block");
            let coord = d3.mouse(document.getElementById("body"));
            pop.style("left",coord[0]+"px");
            pop.style("top",coord[1]+"px");
        }
        
        pc.render(_data,click,moouseover);
        //</editor-fold>

        
        setPlayerInfo(p2Name);
        bar.barHorizontal(barData);
        text.textHorizontal(Object.keys(_data[0]),{
            font:"bold 14px Arial",
            textAlign:"center",
            textBaseline:"top",
            fillStyle:"#7FFFD4"
        });
        //</editor-fold>

        //d3.select("#thremeR_p").html(playerNames[0].replace("_",","));
        chart.themeRiver(themeRiverData[playerNames[0].replace("_",",")]);

        
        d3.csv("data/2010.csv",(d)=>{
            return d;
        },(error,data)=>{
            let team = {};
            let forceData={
                nodes:[],
                links:[]
            };
            data.forEach((d,i)=>{
                forceData.nodes.push({id:d["Name"]});
                let arr = team[d["Team"]];
                if(!arr){
                    arr = [];
                    team[d["Team"]] = arr;
                }
                arr.push(d["Name"]);
            });

            /*let team = {};
             for(let i=0, vals = Object.keys(_team); i<vals.length/2; i++){
             team[vals[i]] = _team[vals[i]];
             }*/

            for (let k of Object.keys(team)){
                let arr = team[k];
                for(let i=0; i< arr.length -1; i++){
                    for(let j=i+1; j<arr.length; j++){
                        forceData.links.push({source: arr[i],target: arr[j]});
                    }
                }
            }

            let rainbow = d3.interpolateRainbow,
                convert = d3.scaleLinear()
                    .domain([0, forceData['nodes'].length])
                    .range([0,1]);
            //draw

            map.forceDirectedGraph(forceData,{colors:(i)=>rainbow(convert(i))})

        });
        //</editor-fold>


        
        _option.series[0].data = createWordCloud(playerNames[0]);
        wordChart.setOption(_option);
        //</editor-fold>

    },2000);

    function createWordCloud(name) {
        let _n=name.replace("_",",");
        let allStart = nameWord[_n];
        let JosnList = [];
        //Math.ceil(Math.random()*900)
        if(allStart){
            for(let i=0; i<500; i++){
                JosnList.push({
                    "name":commonWrod[Math.ceil(Math.random()*900)],
                    "value":Math.ceil(Math.random()*900)
                })
            }
            JosnList.push({
                "name":allStart,
                "value":1300
            })
        }else {
            for(let i=0; i<500; i++){
                JosnList.push({
                    "name":commonWrod[Math.ceil(Math.random()*900)],
                    "value":Math.ceil(Math.random()*900)
                })
            }
            JosnList.push({
                "name":commonWrod[Math.ceil(Math.random()*900)],
                "value":1300
            })
        }
        return JosnList;
    }

});

function setPlayerInfo(playerName) {
    let url = "https://raw.githubusercontent.com/wilsonCernWq/NBAstatsVIS/master/data/playerList/$2.json";
    d3.json(url.replace("$2",playerName[0].toLowerCase()),(d)=>{
        "use strict";
        let info = d.info;
        d3.select("#img_L").attr("src","imgs/"+info["PERSON_ID"]+".png");
        let infoPlane = d3.select("#infoLeft");
        infoPlane.select("#nameLeft").html("NAME: "+playerName[0]);
        infoPlane.select("#weightLeft").html("WEIGHT: "+info["WEIGHT"]);
        infoPlane.select("#schoolLeft").html("SCHOOL: "+info["SCHOOL"]);
        infoPlane.select("#birthdateLeft").html("BIRTHDATE: "+info["BIRTHDATE"]);
        infoPlane.select("#heightLeft").html("HEIGHT: "+info["HEIGHT"]);
        infoPlane.select("#positionLeft").html("POSITION: "+info["POSITION"]);
        infoPlane.select("#posterstatusLeft").html("ROSTERSTATUS: "+info["ROSTERSTATUS"]);
    });
    d3.json(url.replace("$2",playerName[1].toLowerCase()),(d)=>{
        "use strict";
        let info = d.info;
        d3.select("#img_R").attr("src","imgs/"+info["PERSON_ID"]+".png");

        let infoPlane = d3.select("#infoRight");
        infoPlane.select("#nameRight").html("NAME: "+playerName[1]);
        infoPlane.select("#weightRight").html("WEIGHT: "+info["WEIGHT"]);
        infoPlane.select("#schoolRight").html("SCHOOL: "+info["SCHOOL"]);
        infoPlane.select("#birthdateRight").html("BIRTHDATE: "+info["BIRTHDATE"]);
        infoPlane.select("#heightRight").html("HEIGHT: "+info["HEIGHT"]);
        infoPlane.select("#positionRight").html("POSITION: "+info["POSITION"]);
        infoPlane.select("#posterstatusRight").html("ROSTERSTATUS: "+info["ROSTERSTATUS"]);
    });
}

