import { Component } from '@angular/core';
import { MenuItem } from 'primeng/api';
import html2canvas from 'html2canvas';

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
          pointStyle: 'rect'
        },
        {
          type: "line",
          label: 'AVS2 TR-Asia Regional Bias: Developed Equities',
          backgroundColor: 'orange',
          borderColor: 'orange',
          fill: false,
          pointStyle: 'rect',
          data: [21, 22, 24, 25.000001, 26, 27, 28, 29, 30, 31]
        },
        {
          type: "line",
          label: 'AVS2 TR-Asia Regional Bias: Developed Investment Grade',
          backgroundColor: 'lightblue',
          borderColor: 'lightblue',
          fill: false,
          pointStyle: 'rect',
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
      scales: {
        yAxes: [{
          scaleLabel: {
            display: true,
            labelString: 'Value'
          },
        }],
        xAxes: [{
          gridLines: {
            lineWidth: Array.apply(null, Array(10)).map(Number.prototype.valueOf, 0),
            zeroLineColor: ['#A5AEC3'],
            zeroLineWidth: 8,
            zeroLineBorderDash: [12, 2],
            zeroLineBorderDashOffset: 6,
            z: 1
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

        mode: 'index',


        enabled: false,

        custom: function (tooltipModel) {
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
          } else if (tooltipEl1 && tooltipEl2) {
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
              const title = tooltipModel.title.datasets[index].label;
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
            tooltipElArr[i].style.border = '1.5px solid ' + tooltipModel.title.datasets[index].borderColor;
            tooltipElArr[i].style.borderRadius = '5px'
            tooltipElArr[i].style.width = '28%';
            
            if(i === 0){
              tooltipElArr[i].style.left = window.pageXOffset + tooltipModel.caretX + position.left + 'px';
              tooltipElArr[i].style.top = window.pageYOffset + tooltipModel.caretY + position.top + 'px';
              var tooltipDim = tooltipElArr[i].getBoundingClientRect();
              if((tooltipDim.left + tooltipElArr[i].clientWidth) > position.right) {
                tooltipElArr[i].style.left = (tooltipDim.left - tooltipDim.width) + 'px';
              }
              if((tooltipDim.top + tooltipElArr[i].clientHeight) > position.bottom){
                tooltipElArr[i].style.top = (tooltipDim.top - tooltipDim.height) + 'px';
              }
            }
            else {
              
              var tooltipDim = tooltipElArr[i-1].getBoundingClientRect();
              var bottomPos = tooltipDim.top + tooltipElArr[i-1].clientHeight;
              var topPos = tooltipDim.top - tooltipElArr[i-1].clientHeight;
              var leftPos = tooltipDim.left + tooltipElArr[i-1].clientWidth;

              //check bottom
              if((bottomPos + tooltipElArr[i].clientHeight) < position.bottom)
              {
                tooltipElArr[i].style.top = bottomPos + 'px';
                tooltipElArr[i].style.left = tooltipElArr[i-1].style.left;
              }
              //check left
              else if((leftPos + tooltipElArr[i].clientWidth) < position.right)
              {
                tooltipElArr[i].style.left = leftPos + 'px';
                tooltipElArr[i].style.top = tooltipElArr[i-1].style.top;
              }
              //check top
              else 
              {
                tooltipElArr[i].style.top = topPos + 'px';
                tooltipElArr[i].style.left = tooltipElArr[i-1].style.left;
              }

            }

          }

          function getBody(bodyItem) {
            return bodyItem.lines;
          }

        }
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






}




