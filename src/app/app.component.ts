import { Component } from '@angular/core';
import { MenuItem } from 'primeng/api';
import html2canvas from 'html2canvas';
import { ChartType, ChartOptions } from 'chart.js';
// import { Label } from 'ng2-charts';
import 'chartjs-plugin-piechart-outlabels';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'export-chart-demo-app';
  items: MenuItem[];
  data: any;
  chartImg: any;
  toggleItem: boolean = false;
  options: any;
  public pieChartOptions: ChartOptions = {

    responsive: true,
    maintainAspectRatio: false,
    legend: {
      position: 'right',
    },
    plugins: {
      // datalabels: {
      //   formatter: (value, ctx) => {
      //     const label = ctx.chart.data.labels[ctx.dataIndex];
      //     return label;
      //   },
      // }
      outlabels: {
        text: '%l',
        color: 'black',
        stretch: 80,
        lineColor: 'black',
        font: {
          resizable: true,
          minSize: 12,
          maxSize: 18
        },
        backgroundColor: 'white'
      }
    },
    layout: {
      padding: {
        left: 0,
        right: 0,
        top: 100,
        bottom: 100
      }
    }
  };
  public pieChartData: number[] = [300, 500, 100, 78];
  // public pieChartLabels: Label[] = this.pieChartData.map(String);
  public pieChartType: ChartType = 'pie';
  public pieChartLegend = true;
  public pieChartPlugins = [];
  public pieChartColors = [
    {
      backgroundColor: ['rgba(255,0,0,0.3)', 'rgba(0,255,0,0.3)', 'rgba(0,0,255,0.3)'],
    },
  ];

  constructor() {
    this.data = {
      labels: ['year1', 'year2', 'year3', 'year3', 'year4', 'year5', 'year6', 'year7', 'year8', 'year9', 'year10'],
      datasets: [
        {
          type: "line",
          fill: false,
          label: 'AVS2 TR-Asia Regional Bias: Cash',
          data: [21, 22.01, 24.02, 25, 26, 27, 28, 29, 30, 31],
          backgroundColor: 'lightgreen',
          borderColor: 'lightgreen',
          pointStyle: 'rect',
          // pointHitRadius: 0
          
        },
        {
          type: "line",
          label: 'AVS2 TR-Asia Regional Bias: Developed Equities',
          backgroundColor: 'orange',
          borderColor: 'orange',
          fill: false,
          pointStyle: 'rect',
          // pointHitRadius: 0,
          data: [21, 22, 24, 25.000001, 26, 27, 28, 29, 30, 31]
        },
        {
          type: "line",
          label: 'AVS2 TR-Asia Regional Bias: Developed Investment Grade',
          backgroundColor: 'lightblue',
          borderColor: 'lightblue',
          fill: false,
          pointStyle: 'rect',
          // pointHitRadius: 0,
          data: [21, 22, 24.5, 25.09, 26, 27, 28, 29, 30, 31]
        }
        // {
        //   type: "bar",  
        //   label: 'proposed',
        //   backgroundColor: '#42A5F5',
        //   fill: false,
        //   data: [19, 46, 27, 30]
        // }
      ]
    };

    this.options = {
      layout: {
        padding: {
          left: 50,
          right: 0,
          top: 100,
          bottom: 0
        }
      },
      scales: {
        yAxes: [{
          scaleLabel: {
            display: true,
            labelString: 'Value'
          },
          gridLines: {
            // zeroLineColor: 'red',
            // zeroLineWidth: 8,
            // zeroLineBorderDash: [12, 2],
            // zeroLineBorderDashOffset: 6,
            lineWidth: [0.5, 0.5, 0.5, 0.5, 0.5, 0.5, 0.5, 0.5, 0.5, 0.5, 8],
            color: ['gray', 'gray', 'gray', 'gray', 'gray', 'gray', 'gray', 'gray', 'gray', 'gray', '#A5AEC3']
          },
        }],
        xAxes: [{
          gridLines: {
            lineWidth: Array.apply(null, Array(10)).map(Number.prototype.valueOf, 0),
            zeroLineColor: ['#A5AEC3'],
            zeroLineWidth: 8,
            zeroLineBorderDash: [12, 2],
            zeroLineBorderDashOffset: 6,
            z: 1,
          }
        }]
      },
      tooltips: {
        callbacks: {
          title: function (tooltipItem, data) {
            const index = tooltipItem[0].datasetIndex;
            const title = data.datasets[index].label;
            // console.log(index, title);
            return title;
          },
          label: function (tooltipItem, data) {
            const label1 = tooltipItem.xLabel;
            const label2 = tooltipItem.yLabel;
            // console.log('label1: ' + label1);
            // console.log('label2: ' + label2);
            return [label1, label2];
          },
          labelColor: function (tooltipItem, data) {
            return data.config.options.tooltips.borderColor = 'red';
          }
        },

        mode: 'nearest',
        borderWidth: 1,
        backgroundColor: 'rgb(256, 256, 256, 0.6)',
        titleFontColor: 'black',
        bodyFontColor: '#000',
        bodyFontSize: 11,
        displayColors: false,


        enabled: false,

        custom: this.customTooltip2
      }



    }

    


    this.items = [
      {
        label: 'Update', id: "up", command: () => {
          if (this.toggleItem) {
            this.items[0].icon = 'pi pi-check';
            this.toggleItem = false;
          }
          else {
            this.items[0].icon = "";
            this.toggleItem = true;
          }
          console.log("Inside update");
        }
      },
      {
        label: 'Delete', icon: 'pi pi-times', command: () => {
        }
      },
      { label: 'Angular.io', icon: 'pi pi-info', url: 'http://angular.io' },
      { separator: true },
      { label: 'Setup', icon: 'pi pi-cog', routerLink: ['/setup'] }
    ];

  }

  export(chart) {
    const urlBase64 = chart.getBase64Image();
    if (window.navigator.msSaveBlob) {
      // btn.onclick = this.download;
      var data = urlBase64.split(',');
      var sampleBytes = this.base64ToArrayBuffer(data[1]);
      var content = new Blob([sampleBytes], { type: 'data:image/png' });
      window.navigator.msSaveBlob(content, "ChartImageIE.png");
    }
    else {
      const link = document.getElementById('link1') as HTMLAnchorElement;
      link.href = urlBase64;


      // var data = urlBase64.split(',');
      // var sampleBytes = this.base64ToArrayBuffer(data[1]);
      // var content = new Blob([sampleBytes], { type: 'data:image/png' });

    }

  }

  customTooltip = function (tooltipModel) {
    // Tooltip Element
    // var tooltipEl;

    // Create element on first render
    // if (!tooltipEl) {
    //   tooltipEl = document.createElement('div');
    //   tooltipEl.id = 'chartjs-tooltip';
    //   tooltipEl.innerHTML = '<table></table>';
    //   document.body.appendChild(tooltipEl);
    // }
    var tooltipElArr: any[] = [];
    var tooltipEl1 = document.getElementById('chartjs-tooltip1');
    var tooltipEl2 = document.getElementById('chartjs-tooltip2');
    var tooltipEl3 = document.getElementById('chartjs-tooltip3');
    if (tooltipEl1 && tooltipEl2 && tooltipEl3) {
      // Hide if no tooltip
      if (tooltipModel.opacity === 0) {
        tooltipEl1.style.opacity = '0';
        tooltipEl2.style.opacity = '0';
        tooltipEl3.style.opacity = '0';
        return;
      }
    } else if ((tooltipEl1 && tooltipEl2)) {
      // Hide if no tooltip
      if (tooltipModel.opacity === 0) {
        tooltipEl1.style.opacity = '0';
        tooltipEl2.style.opacity = '0';
        return;
      }
    } else if (tooltipEl1) {
      // Hide if no tooltip
      if (tooltipModel.opacity === 0) {
        tooltipEl1.style.opacity = '0';
        return;
      }
    }

    console.log(tooltipModel.dataPoints.length);
    // var min = Math.min(tooltipModel.dataPoints.length, 3)
    for (let i = 0; i < tooltipModel.dataPoints.length; i++) {
      var tooltipEl = document.getElementById('chartjs-tooltip' + (i + 1));
      if (!tooltipEl) {
        tooltipElArr.push(document.createElement('div'))
        // tooltipElArr[i] = document.createElement('div');
        tooltipElArr[i].id = 'chartjs-tooltip' + (i + 1);
        tooltipElArr[i].innerHTML = "<table></table>";
        document.body.appendChild(tooltipElArr[i]);
      }
      else {
        tooltipElArr.push(tooltipEl);
      }

      // Set caret Position
      tooltipElArr[i].classList.remove('above', 'below', 'no-transform');
      if (tooltipModel.yAlign) {
        tooltipElArr[i].classList.add(tooltipModel.yAlign);
      } else {
        tooltipElArr[i].classList.add('no-transform');
      }

      // Set Text
      if (tooltipModel.body) {
        // var titleLines = tooltipModel.title || [];
        const index = tooltipModel.dataPoints[i].datasetIndex;
        const title = tooltipModel.datasets[index].label;
        // var bodyLines = tooltipModel.body.map(getBody);

        var innerHtml = '<thead>';

        // titleLines.forEach(function (title) {
        //   innerHtml += '<tr><th>' + title + '</th></tr>';
        // });
        innerHtml += "<tr style = 'text-align: left' ><th>" + title + '</th></tr>';
        innerHtml += '</thead><tbody>';

        // bodyLines.forEach(function (body, i) {
        //   var colors = tooltipModel.labelColors[i];
        //   var style = 'background:' + colors.backgroundColor;
        //   style += '; border-color:' + colors.borderColor;
        //   style += '; border-width: 2px';
        //   var span = '<span style="' + style + '"></span>';
        //   innerHtml += '<tr><td>' + span + body + '</td></tr>';
        // });

        // <thead><tr><th>Initial</th></tr></thead>
        // <tbody><tr><td>year5</td></tr>

        // var colors = tooltipModel.labelColors[i];
        // var style = 'background:' + colors.backgroundColor;
        // style += '; border-color:' + colors.borderColor;
        // style += '; border-width: 2px';
        // var span = '<span style="' + style + '"></span>';
        innerHtml += '<tr><td>' + tooltipModel.dataPoints[i].label + '</td></tr>';
        innerHtml += '<tr><td>' + tooltipModel.dataPoints[i].value + '</td></tr>';
        innerHtml += '</tbody>';

        var tableRootArr = tooltipElArr[i].querySelector('table');
        tableRootArr.innerHTML = innerHtml;
      }

      // `this` will be the overall tooltip
      var position = this._chart.canvas.getBoundingClientRect();
      const index = tooltipModel.dataPoints[i].datasetIndex;

      // Display, position, and set styles for font
      // const windowOuterWidth = window.outerWidth;
      // const windowInnerWidth = window.innerWidth;
      // const windowOuterHeight = window.outerHeight;
      // const windowInnerHeight = window.innerHeight;

      tooltipElArr[i].style.opacity = '1';
      tooltipElArr[i].style.position = 'absolute';
      tooltipElArr[i].style.fontFamily = tooltipModel._bodyFontFamily;
      tooltipElArr[i].style.fontSize = tooltipModel.bodyFontSize + 'px';
      tooltipElArr[i].style.fontStyle = tooltipModel._bodyFontStyle;
      tooltipElArr[i].style.padding = tooltipModel.yPadding + 'px ' + tooltipModel.xPadding + 'px';
      tooltipElArr[i].style.pointerEvents = 'none';
      tooltipElArr[i].style.border = '1.5px solid ' + tooltipModel.datasets[index].borderColor;
      tooltipElArr[i].style.borderRadius = '5px'
      tooltipElArr[i].style.width = '20%';
      tooltipElArr[i].style.background = 'rgba(255, 255, 255, 0.8)';

      if (i === 0) {
        tooltipElArr[i].style.left = window.pageXOffset + tooltipModel.caretX + position.left + 'px';
        tooltipElArr[i].style.top = window.pageYOffset + tooltipModel.caretY + position.top + 'px';
        var tooltipDim = tooltipElArr[i].getBoundingClientRect();
        if ((tooltipDim.left + tooltipElArr[i].clientWidth) > position.right) {
          tooltipElArr[i].style.left = (tooltipDim.left - tooltipDim.width) + 'px';
        }
        if ((tooltipDim.top + tooltipElArr[i].clientHeight) > position.bottom) {
          tooltipElArr[i].style.top = (tooltipDim.top - tooltipDim.height) + 'px';
        }
      }
      else {

        var tooltipDim = tooltipElArr[i - 1].getBoundingClientRect();
        var bottomPos = tooltipDim.top + tooltipElArr[i - 1].clientHeight;
        var topPos = tooltipDim.top - tooltipElArr[i - 1].clientHeight;
        var leftPos = tooltipDim.left + tooltipElArr[i - 1].clientWidth;

        //check bottom
        if ((bottomPos + tooltipElArr[i].clientHeight) < position.bottom) {
          tooltipElArr[i].style.top = bottomPos + 'px';
          tooltipElArr[i].style.left = tooltipElArr[i - 1].style.left;
        }
        //check left
        else if ((leftPos + tooltipElArr[i].clientWidth) < position.right) {
          tooltipElArr[i].style.left = leftPos + 'px';
          tooltipElArr[i].style.top = tooltipElArr[i - 1].style.top;
        }
        //check top
        else {
          tooltipElArr[i].style.top = topPos + 'px';
          tooltipElArr[i].style.left = tooltipElArr[i - 1].style.left;
        }

      }

    }

    function getBody(bodyItem) {
      return bodyItem.lines;
    }

  }

  customTooltip2 = function (tooltipModel) {
    // Tooltip Element
    // var tooltipEl;

    // Create element on first render
    // if (!tooltipEl) {
    //   tooltipEl = document.createElement('div');
    //   tooltipEl.id = 'chartjs-tooltip';
    //   tooltipEl.innerHTML = '<table></table>';
    //   document.body.appendChild(tooltipEl);
    // }
    var tooltipElArr: any[] = [];
    var tooltipEl1 = document.getElementById('chartjs-tooltip1');
    var tooltipEl2 = document.getElementById('chartjs-tooltip2');
    var tooltipEl3 = document.getElementById('chartjs-tooltip3');
    if (tooltipEl1 && tooltipEl2 && tooltipEl3) {
      // Hide if no tooltip
      if (tooltipModel.opacity === 0) {
        tooltipEl1.style.opacity = '0';
        tooltipEl2.style.opacity = '0';
        tooltipEl3.style.opacity = '0';
        return;
      }
    } else if ((tooltipEl1 && tooltipEl2)) {
      // Hide if no tooltip
      if (tooltipModel.opacity === 0) {
        tooltipEl1.style.opacity = '0';
        tooltipEl2.style.opacity = '0';
        return;
      }
    } else if (tooltipEl1) {
      // Hide if no tooltip
      if (tooltipModel.opacity === 0) {
        tooltipEl1.style.opacity = '0';
        return;
      }
    }

    console.log(tooltipModel.dataPoints.length);
    // var min = Math.min(tooltipModel.dataPoints.length, 3)
    var tooltipList = []
    const index = tooltipModel.dataPoints[0].datasetIndex;
    const yLabel = tooltipModel.dataPoints[0].value;
    tooltipList.push({title: tooltipModel.title[0], xLabel: tooltipModel.dataPoints[0].label, yLabel: yLabel, borderColor: tooltipModel.datasets[index].borderColor })
    const datapointIndex = tooltipModel.datasets[index].data.indexOf(Number(yLabel));
    for(let j = 0; j< tooltipModel.datasets.length; j++){
      if(j !== index){
        var value = tooltipModel.datasets[j].data[datapointIndex];
        if(Math.abs(value - Number(yLabel)) < 0.3){
          tooltipList.push({title: tooltipModel.datasets[j].label, xLabel: tooltipModel.dataPoints[0].label, yLabel: value.toString(), borderColor: tooltipModel.datasets[j].borderColor })
        }
      }
    }
    console.log(tooltipList);
    for (let i = 0; i < tooltipList.length; i++) {
      var tooltipEl = document.getElementById('chartjs-tooltip' + (i + 1));
      if (!tooltipEl) {
        tooltipElArr.push(document.createElement('div'))
        // tooltipElArr[i] = document.createElement('div');
        tooltipElArr[i].id = 'chartjs-tooltip' + (i + 1);
        tooltipElArr[i].innerHTML = "<table></table>";
        document.body.appendChild(tooltipElArr[i]);
      }
      else {
        tooltipElArr.push(tooltipEl);
      }

      // Set caret Position
      tooltipElArr[i].classList.remove('above', 'below', 'no-transform');
      if (tooltipModel.yAlign) {
        tooltipElArr[i].classList.add(tooltipModel.yAlign);
      } else {
        tooltipElArr[i].classList.add('no-transform');
      }

      // Set Text
      if (tooltipModel.body) {
        // var titleLines = tooltipModel.title || [];
        // const index = tooltipModel.dataPoints[i].datasetIndex;
        const title = tooltipList[i].title;
        // var bodyLines = tooltipModel.body.map(getBody);

        var innerHtml = '<thead>';

        // titleLines.forEach(function (title) {
        //   innerHtml += '<tr><th>' + title + '</th></tr>';
        // });
        innerHtml += "<tr style = 'text-align: left' ><th>" + title + '</th></tr>';
        innerHtml += '</thead><tbody>';

        // bodyLines.forEach(function (body, i) {
        //   var colors = tooltipModel.labelColors[i];
        //   var style = 'background:' + colors.backgroundColor;
        //   style += '; border-color:' + colors.borderColor;
        //   style += '; border-width: 2px';
        //   var span = '<span style="' + style + '"></span>';
        //   innerHtml += '<tr><td>' + span + body + '</td></tr>';
        // });

        // <thead><tr><th>Initial</th></tr></thead>
        // <tbody><tr><td>year5</td></tr>

        // var colors = tooltipModel.labelColors[i];
        // var style = 'background:' + colors.backgroundColor;
        // style += '; border-color:' + colors.borderColor;
        // style += '; border-width: 2px';
        // var span = '<span style="' + style + '"></span>';
        innerHtml += '<tr><td>' + tooltipList[i].xLabel + '</td></tr>';
        innerHtml += '<tr><td>' + tooltipList[i].yLabel + '</td></tr>';
        innerHtml += '</tbody>';

        var tableRootArr = tooltipElArr[i].querySelector('table');
        tableRootArr.innerHTML = innerHtml;
      }

      // `this` will be the overall tooltip
      var position = this._chart.canvas.getBoundingClientRect();
      // const index = tooltipModel.dataPoints[i].datasetIndex;

      // Display, position, and set styles for font
      // const windowOuterWidth = window.outerWidth;
      // const windowInnerWidth = window.innerWidth;
      // const windowOuterHeight = window.outerHeight;
      // const windowInnerHeight = window.innerHeight;

      tooltipElArr[i].style.opacity = '1';
      tooltipElArr[i].style.position = 'absolute';
      tooltipElArr[i].style.fontFamily = tooltipModel._bodyFontFamily;
      tooltipElArr[i].style.fontSize = tooltipModel.bodyFontSize + 'px';
      tooltipElArr[i].style.fontStyle = tooltipModel._bodyFontStyle;
      tooltipElArr[i].style.padding = tooltipModel.yPadding + 'px ' + tooltipModel.xPadding + 'px';
      tooltipElArr[i].style.pointerEvents = 'none';
      tooltipElArr[i].style.border = '1.5px solid ' + tooltipList[i].borderColor;
      tooltipElArr[i].style.borderRadius = '5px'
      tooltipElArr[i].style.width = '20%';
      tooltipElArr[i].style.background = 'rgba(255, 255, 255, 0.8)';

      if (i === 0) {
        tooltipElArr[i].style.left = window.pageXOffset + tooltipModel.caretX + position.left + 'px';
        tooltipElArr[i].style.top = window.pageYOffset + tooltipModel.caretY + position.top + 'px';
        var tooltipDim = tooltipElArr[i].getBoundingClientRect();
        if ((tooltipDim.left + tooltipElArr[i].clientWidth) > position.right) {
          tooltipElArr[i].style.left = (tooltipDim.left - tooltipDim.width) + 'px';
        }
        if ((tooltipDim.top + tooltipElArr[i].clientHeight) > position.bottom) {
          tooltipElArr[i].style.top = (tooltipDim.top - tooltipDim.height) + 'px';
        }
      }
      else {

        var tooltipDim = tooltipElArr[i - 1].getBoundingClientRect();
        var bottomPos = tooltipDim.top + tooltipElArr[i - 1].clientHeight;
        var topPos = tooltipDim.top - tooltipElArr[i - 1].clientHeight;
        var leftPos = tooltipDim.left + tooltipElArr[i - 1].clientWidth;

        //check bottom
        if ((bottomPos + tooltipElArr[i].clientHeight) < position.bottom) {
          tooltipElArr[i].style.top = bottomPos + 'px';
          tooltipElArr[i].style.left = tooltipElArr[i - 1].style.left;
        }
        //check left
        else if ((leftPos + tooltipElArr[i].clientWidth) < position.right) {
          tooltipElArr[i].style.left = leftPos + 'px';
          tooltipElArr[i].style.top = tooltipElArr[i - 1].style.top;
        }
        //check top
        else {
          tooltipElArr[i].style.top = topPos + 'px';
          tooltipElArr[i].style.left = tooltipElArr[i - 1].style.left;
        }

      }

    }

    function getBody(bodyItem) {
      return bodyItem.lines;
    }

  }

  rederBarChart() {
    html2canvas(document.getElementById('barChart'), { height: 500 })
      .then((canvas) => {
        var img = canvas.toDataURL("image/png")
        const link = document.getElementById('link1') as HTMLAnchorElement;
        link.href = img;
      })
  }

  rederBarChart2() {
    html2canvas(document.getElementById('barChart'), { height: 500 })
      .then((canvas) => {
        var img = canvas.toDataURL("image/png")
        if (window.navigator.msSaveBlob) {
          // btn.onclick = this.download;
          var data = img.split(',');
          var sampleBytes = this.base64ToArrayBuffer(data[1]);
          var content = new Blob([sampleBytes], { type: 'data:image/png' });
          window.navigator.msSaveBlob(content, "ChartImageIE.png");
        }
        else {
          const link = document.getElementById('link1') as HTMLAnchorElement;
          link.href = img;
        }
      })
  }

  base64ToArrayBuffer(base64) {
    const binaryString = window.atob(base64);
    const binaryLen = binaryString.length;
    const bytes = new Uint8Array(binaryLen);
    for (let i = 0; i < binaryLen; i++) {
      let ascii = binaryString.charCodeAt(i);
      bytes[i] = ascii;
    }
    console.log(bytes);
    return bytes;
  }

  addZeroes(num: any) {
    // Convert input string to a number and store as a variable.
    var value = Number(num);
    // Split the input string into two arrays containing integers/decimals
    var res = num.split(".");
    var convertedNum: string;
    // If there is no decimal point or only one decimal place found.
    if (res.length == 1 || res[1].length < 3) {
      // Set the number to two decimal places
      convertedNum = value.toFixed(2);
    }
    else {
      num = num.toString(); //If it's not already a String
      num = num.slice(0, (num.indexOf(".")) + 3); //With 3 exposing the hundredths place
      convertedNum = num;
    }

    // Return updated or original number.
    return convertedNum;
  }






}




