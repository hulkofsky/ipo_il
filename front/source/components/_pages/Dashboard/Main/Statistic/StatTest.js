import React from 'react';
import { AreaClosed, Line, Bar, LinePath } from '@vx/shape';
import { appleStock } from '@vx/mock-data';
import { curveMonotoneX } from '@vx/curve';
import { LinearGradient } from '@vx/gradient';
import { GridRows, GridColumns } from '@vx/grid';
import { scaleTime, scaleLinear } from '@vx/scale';
import { withTooltip, Tooltip } from '@vx/tooltip';
import { localPoint } from '@vx/event';
import { extent, max, bisector } from 'd3-array';
import { timeFormat } from 'd3-time-format';
import { Point } from '@vx/point';
import { GlyphDot } from '@vx/glyph';
import TooltipCustom from './Tooltip';
import GlyphDotCustom from './GlyphDot';
import StatGraphValueScale from './StatGraphValueScale';

let count = 0;
let dateCount = 0;

// purchases.forEach( (item, i, arr) => {
//   item.close = item.unit_count;
//   item.date = item.purchase_date;
//   item.unit = item.unit_price;
//   let newDate = new Date(item.date);
//   const day = newDate.getDate();
//   newDate.setDate(day - dateCount);
//   dateCount++;
//   item.date = newDate;
//   item.close += count * 1;
//   item.unit += count;
//
//   if(i < arr.length / 2) {
//     count++;
//   } else {
//     count--;
//   }
// })
//
// const stock = purchases;
// const resArr = purchases;
// const resArr = [];

// creates intermidiate points between existing for smoothy floating info point
function smoothGraph(data) {
  const minPointsAmount = 500;
  const arr = data;
  const resArr = [];
  const { length } = arr;

  if(length >= minPointsAmount ) {
    return;
  }

  const differenceOfPoints = minPointsAmount - length;
  // how many points need to add between each current points
  const additionalPointsBetweenEach = Math.floor(minPointsAmount / length);

  for(let i = 0; i < length; i++) {
    // if(i === length - 1) {
    //   debugger
    // }
    const currentItem = arr[i];
    const nextItem = arr[i + 1];

    if( !nextItem ) {
      resArr.push(currentItem);
      break;
    }

    const valuesDifference = nextItem.close - currentItem.close;
    const increaseValueToEachPoint = valuesDifference / additionalPointsBetweenEach;

    const dateDifference = nextItem.date - currentItem.date;
    const increaseDateToEachpoint = dateDifference / additionalPointsBetweenEach;

    currentItem.isFake = false;
    resArr.push(currentItem);

    // create intermidiate points
    for(let ii = 0; ii < additionalPointsBetweenEach; ii++) {
      const objToPush = Object.assign({}, currentItem);
      objToPush.close += increaseValueToEachPoint * ii;
      objToPush.isFake = true;

      const newDate = new Date(currentItem.date.valueOf() + increaseDateToEachpoint * ii);
      objToPush.date = newDate;
      resArr.push(objToPush);
    }
  }

  return resArr;
}

// smoothGraph();

const formatDate = timeFormat("%b %d, '%y");

// accessors
const xStock = d => new Date(d.date);
const yStock = d => d.close;
const bisectDate = bisector(d => new Date(d.date)).left;

class Area extends React.Component {
  constructor(props) {
    super(props);
    this.handleTooltip = this.handleTooltip.bind(this);
  }

  handleTooltip({ event, data, xStock, xScale, yScale }) {
    const { showTooltip } = this.props;
    const { x } = localPoint(event);
    const x0 = xScale.invert(x);
    const index = bisectDate(data, x0, 1);
    const d0 = data[index - 1];
    const d1 = data[index];
    let d = d0;
    if (d1 && d1.date) {
      d = x0 - xStock(d0.date) > xStock(d1.date) - x0 ? d1 : d0;
    }

    showTooltip({
      tooltipData: {d, index, data},
      tooltipLeft: x,
      tooltipTop: yScale(d.close),
    });
  }

  floorValue = val => {
    const valString = Math.ceil(val).toString();
    const { length } = valString;
    const flooringCharCeil = Math.ceil(length / 2) - 1;
    const rest = valString.slice(flooringCharCeil);
    const start = valString.slice(0, flooringCharCeil);
    const newStart = start + new Array(rest.length).fill('0').join('');
    const newRest = (+rest[0] + 1) + new Array(rest.length - 1).fill('0').join('');

    return +newStart + +newRest;
  }

  createAxisValues = maxValue => {
    const rows = 5;
    const gradation = (maxValue / rows);
    const gradationArray = new Array(rows + 1).fill().map( (item, i) => {
      return (i * gradation).toString();
    })

    return gradationArray;
  }

  createAxisDates = () => {

  }

  render() {
    const {
      width,
      height,
      margin,
      showTooltip,
      hideTooltip,
      tooltipData,
      tooltipTop,
      tooltipLeft,
      events,
      total,
      units,
      dateRange,
      item,
    } = this.props;

    // bounds
    const xMax = width - margin.left - margin.right;
    const yMax = height - margin.top - margin.bottom;

    const columnsLeft = -62;
    const rowsTop = -75;
    const firstPoint = item.first();
    const lastPoint = item.last();
    let dateFilteredData;
    let smoothedData;
    let maxValue;
    let maxValueFloored;
    let valuesAxisValues;

    dateFilteredData = filterDataByDate(item);
    smoothedData = smoothGraph(dateFilteredData);

    function filterDataByDate(data) {
      const dateLimitMs = defineDateLimit(dateRange);

      const dateSortedStock = data.filter( item => {
        return (new Date().valueOf() - item.date.valueOf() ) < dateLimitMs;
      });

      return dateSortedStock;

      // @param dateRange: value from select
      function defineDateLimit(dateRange) {
        const currentDate = new Date();
        const currentDateValueMs = currentDate.valueOf();

        switch(dateRange) {
          case 'week': {
            const rangeDate = new Date();
            const date = rangeDate.getDate();
            rangeDate.setDate(date - 7);
            return currentDateValueMs - rangeDate.valueOf();
          }

          case 'month': {
            return monthDifference(-1);
          }

          case '3-month': {
            return monthDifference(-3);
          }

          case '6-month': {
            return monthDifference(-6);
          }

          case 'year': {
            return monthDifference(-12);
          }
        }

        function monthDifference(monthDiff) {
          const rangeDate = new Date();
          const month = rangeDate.getMonth();
          rangeDate.setMonth(month + monthDiff);
          return currentDateValueMs - rangeDate.valueOf();
        }
      }
    }

    maxValue = Math.floor( Math.max( ...(dateFilteredData.map( item => item.close))));
    maxValueFloored = this.floorValue(maxValue);
    valuesAxisValues = this.createAxisValues(maxValueFloored);

    // scales
    const xScale = scaleTime({
      range: [130, xMax - 69],
      domain: extent(dateFilteredData, xStock),
    });

    const yScale = scaleLinear({
      range: [yMax, 0],
      domain: [0, maxValueFloored * 1.2],
      nice: true,
    });

    function columnsScale() {}

    function rowsScale(val) {
      return yScale(val);
    }

    columnsScale.domain = function() {
      const columns = 7;
      return new Array(columns).fill();
    }

    rowsScale.domain = function () {
      return valuesAxisValues;
    }

    function tooltipGetValue() {
      const { d: current, index, data} = tooltipData;

      // last point
      if(index === data.length) {
        return current;
      }

      // maby bug but index of last point equals to arr.length
      // so it crashes
      let i = index === data.length ? index-1 : index;

      if( !current.isFake ) {
        return current;
      }

      // find value of truly point
      while( data[i] && data[i].isFake ) {
        i--;
      }

      return data[i];
    }

    return (
      <div className="stat__graph-wrap">
        <div className="stat__graph">
          <svg ref={s => (this.svg = s)} width={width} height={height}>
            <rect
              x={0}
              y={0}
              height={height}
              width={width}
              fill="#fff"
              rx={0}
            />
            <defs>
              <linearGradient
                id="gradient"
                x1="0%"
                y1="0%"
                x2="0%"
                y2="100%"
                >
                  <stop
                    offset="0%"
                    stopColor="rgba(106,177,66, 0.2)"
                    stopOpacity={1}
                  />
                  <stop
                    offset="100%"
                    stopColor="rgba(106, 177, 66, 0)"
                    stopOpacity={1}
                  />
                </linearGradient>
              </defs>
              <GridRows
                lineStyle={{ pointerEvents: 'none' }}
                scale={yScale}
                width={xMax}
                stroke="#EDEDED"
                scale={rowsScale}
                // top={rowsTop}
                left={90}
              />
              <GridColumns
                lineStyle={{ pointerEvents: 'none' }}
                scale={xScale}
                height={yMax}
                strokeDasharray="5,5"
                stroke="#C4C4C4"
                left={columnsLeft}
                scale={columnsScale}
                strokeWidth={1}
              />
              {/* <LinePath
                data={dateFilteredData}
                xScale={xScale}
                yScale={yScale}
                x={xStock}
                y={yStock}
                strokeWidth={4}
                stroke={'#6AB142'}
                fill={'transparent'}
                curve={curveMonotoneX}
              /> */}
              <StatGraphValueScale
                scale={yScale}
                maxValue={maxValueFloored}
                values={valuesAxisValues}
              />
              {/* just for gradient */}
              <AreaClosed
                data={dateFilteredData}
                xScale={xScale}
                yScale={yScale}
                x={xStock}
                y={yStock}
                strokeWidth={0}
                stroke={'transparent'}
                fill={'url(#gradient)'}
                curve={curveMonotoneX}
              />
              { units && (
                <React.Fragment>
                  <GlyphDotCustom
                    left={xScale(xStock( firstPoint ))}
                    top={yScale(yStock( firstPoint ))}
                    stroke="#C4C4C4"
                  />
                  <GlyphDotCustom
                    left={xScale(xStock( lastPoint ))}
                    top={yScale(yStock( lastPoint ))}
                    stroke="#6AB142"
                  />
                </React.Fragment>
              )}
              <Bar
                x={130}
                y={0}
                width={width - 99*2}
                height={height}
                fill="transparent"
                rx={14}
                data={smoothedData}
                onTouchStart={data => event =>
                  this.handleTooltip({
                    event,
                    data,
                    xStock,
                    xScale,
                    yScale,
                  })}
                onTouchMove={data => event =>
                  this.handleTooltip({
                    event,
                    data,
                    xStock,
                    xScale,
                    yScale,
                  })}
                onMouseMove={data => event =>
                  this.handleTooltip({
                    event,
                    data,
                    xStock,
                    xScale,
                    yScale,
                  })}
                  onMouseLeave={data => event => hideTooltip()}
                />
                {tooltipData && (
                  <g>
                    <circle
                      cx={tooltipLeft}
                      cy={tooltipTop}
                      r={12}
                      fill="#fff"
                      stroke="#36436B"
                      strokeWidth={5}
                      style={{ pointerEvents: 'none' }}
                    />
                  </g>
                )}
              </svg>
              {tooltipData && (
                <div>
                  <TooltipCustom
                    top={tooltipTop - 12}
                    left={tooltipLeft + 24}
                    zIndex={3}
                    value={tooltipGetValue().close}
                    units={ units && tooltipGetValue().unit}
                  />
                </div>
              )}
              {
                units && (
                  <React.Fragment>
                    {/* description element for first dot */}
                    <TooltipCustom
                      left={xScale(xStock( firstPoint )) + 25}
                      top={yScale(yStock( firstPoint )) - 20}
                      units={firstPoint.unit_price}
                      value={firstPoint.close}
                    />
                    {/* description element for last dot */}
                    <TooltipCustom
                      left={xScale(xStock( lastPoint )) + 25}
                      top={yScale(yStock( lastPoint )) - 20}
                      units={lastPoint.unit_price}
                      value={lastPoint.close}
                    />
                  </React.Fragment>
                )
              }
        </div>
      </div>
    );
  }
}

export default withTooltip(Area);
