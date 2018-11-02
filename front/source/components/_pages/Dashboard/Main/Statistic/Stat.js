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
import StatGraphDateScale from './StatGraphDateScale';
import { Group } from '@vx/group';
import { connect } from 'react-redux';
import Loader from '../../partials/Loader';

const formatDate = timeFormat("%b %d, '%y");

// creates intermidiate points between existing for smoothy floating info point
function smoothGraph(data) {
  const minPointsAmount = 160;
  const arr = data;
  const resArr = [];
  const { length } = arr;

  if(length >= minPointsAmount ) {
    return data;
  }

  const differenceOfPoints = minPointsAmount - length;
  // how many points need to add between each current points
  const additionalPointsBetweenEach = Math.floor(minPointsAmount / length);

  for(let i = 0; i < length; i++) {
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

    resArr.push(currentItem);

    // create intermidiate points
    for(let ii = 1; ii < additionalPointsBetweenEach+1; ii++) {
      const objToPush = Object.assign({}, currentItem);
      // objToPush.close += increaseValueToEachPoint * ii;
      objToPush.close += increaseValueToEachPoint * ii;
      objToPush.isFake = true;
      // debugger
      objToPush.unit = currentItem.unit;

      const newDate = new Date(currentItem.date.valueOf() + increaseDateToEachpoint * ii);
      objToPush.date = newDate;
      resArr.push(objToPush);
    }
  }

  return resArr;
}

// accessors
const xStock = d => new Date(d.date);
const yStock = d => d.close;
const bisectDate = bisector(d => new Date(d.date)).left;

class Area extends React.Component {
  constructor(props) {
    super(props);
    this.handleTooltip = this.handleTooltip.bind(this);
  }

  componentDidMount() {
    const { units, data: item, setCurrentUnitValue } = this.props;

    if(!units) {
      return;
    }

    const filteredData = this.filterDataByDate(item);

    // find closest obj with 'unit' field and set currentUnit in redux
    for(let i = filteredData.length - 1; i >= 0; i--) {
      const obj = filteredData[i];

      if(obj.unit) {
        setCurrentUnitValue( obj.unit );
        break;
      }
    }

  }

  handleTooltip({ event, data, xStock, xScale, yScale }) {
    const { showTooltip, units, setCurrentUnitValue } = this.props;
    const { x } = localPoint(event);
    const x0 = xScale.invert(x);
    const index = bisectDate(data, x0, 1);
    const d0 = data[index - 1];
    const d1 = data[index];
    let d = d0;
    if (d1 && d1.date) {
      d = x0 - xStock(d0.date) > xStock(d1.date) - x0 ? d1 : d0;
    }

    if(units && !d.isFake) {
      setCurrentUnitValue(d.unit);
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
    const { unitType } = this.props;

    if(maxValue < 5) {
      maxValue = 5;
    }

    const gradation = (maxValue / rows);

    const gradationArray = new Array(rows + 1).fill().map( (item, i) => {
      return (i * gradation).toString();
    })
    return gradationArray;
  }

  createDateAxis = (items) => {
    const { ranges, maxDateRange, statFilter } = this.props.dateRanges;
    const resArr = [];
    // first column is a first date
    // resArr.push(items.first().date);

    switch (statFilter) {
      // week
      case ranges[0].name: {
        createWeekGrid();
        break;
      }

      // month
      case ranges[1].name: {
        createMonthGrid();
        break;
      }

      // 3 month
      case ranges[2].name: {
        create3MonthGrid();
        break;
      }

      // 6 month
      case ranges[3].name: {
        create6MonthGrid();
        break;
      }
    }

    return resArr;

    function create6MonthGrid() {
      for(let i = 6 ; i >= 0; i--) {
        const newDate = createClearDate();
        const month = newDate.getMonth();

        newDate.setMonth(month - i);
        resArr.push(newDate);
      }
    }

    function create3MonthGrid() {

      for(let i = 3; i >= 0; i--) {
        const newDate = createClearDate();
        const month = newDate.getMonth();

        newDate.setMonth(month - i);
        resArr.push(newDate);
      }
    }

    function createMonthGrid() {
      for(let i = 5; i >= 0; i--) {
        const newDate = createClearDate();
        const date = newDate.getDate();
        newDate.setDate(date - (i * 7));

        resArr.push(newDate);
      }
    }

    function createWeekGrid() {
      for(let i = 6; i > 0; i--) {
        const newDate = createClearDate();
        const date = newDate.getDate();
        newDate.setDate(date - i);

        resArr.push(newDate);
      }
    }

    // resets hours, minutes, seconds... So creates date like 00:00 time
    function createClearDate() {
      const { year, month, date } = currentDateParams();

      return new Date(year, month, date);

      function currentDateParams() {
        const newDate = new Date();
        const year = newDate.getFullYear();
        const month = newDate.getMonth();
        const date = newDate.getDate();

        return {
          year,
          month,
          date,
        }
      }
    }
  }

  filterDataByDate = data => {
    const { ranges, maxDateRange, statFilter } = this.props.dateRanges;
    const currentFilter = statFilter.split(' ')[0];
    const dateLimitMs = ranges[currentFilter].limit;

    const dateSortedStock = data.filter( item => {
      return item.date >= dateLimitMs;
    });

    return dateSortedStock;
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
      dateRanges,
      data: item,
      gradientColor = '106, 177, 66',
      lineColor = '#6AB142',
      tooltipTitle = 'ILS',
      unitType = 'money invested',
    } = this.props;

    // ATTENTION!! WAIT FOR GETTING DATA. DON'T FORGET ABOUT THIS :)
    if(!item) {
      return <Loader />;
    } else if(item.length === 0) {
      return <div className="stat__empty-message">{`Have no ${unitType} yet.`}</div>
    }

    // bounds
    const xMax = width;
    const yMax = height - 40;

    const columnsLeft = 0;
    const rowsTop = -75;
    let firstPoint;
    let lastPoint;
    let dateFilteredData;
    let smoothedData;
    let maxValue;
    let maxValueFloored;
    let valuesAxisValues;
    let dateAxisValues;

    dateFilteredData = this.filterDataByDate(item);
    smoothedData = smoothGraph(dateFilteredData);

    firstPoint = dateFilteredData.first();
    lastPoint = dateFilteredData.last();

    if(unitType === 'units') {
      maxValue = Math.floor( Math.max( ...(dateFilteredData.map( item => item.unit))));
    } else {
      maxValue = Math.floor( Math.max( ...(dateFilteredData.map( item => item.close))));
    }

    maxValueFloored = this.floorValue(maxValue);
    valuesAxisValues = this.createAxisValues(maxValueFloored);

    dateAxisValues = this.createDateAxis(dateFilteredData);

    // scales
    const xScale = scaleTime({
      range: [130, xMax - 69],
      domain: extent(dateFilteredData, xStock),
    });

    const yScale = scaleLinear({
      range: [yMax, 0],
      domain: [0, maxValueFloored * 1.1],
      nice: true,
    });

    function columnsScale(val) {
      return xScale(val);
    }

    function rowsScale(val) {
      return yScale(val);
    }

    columnsScale.domain = function() {
      return dateAxisValues;
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

      let i = index;

      if( !current.isFake ) {
        return current;
      }

      // find value of truly point
      while( i > 0 && data[i] && data[i].isFake ) {
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
                  stopColor={`rgba(${gradientColor}, 0.2)`}
                  stopOpacity={1}
                />
                <stop
                  offset="100%"
                  stopColor={`rgba(${gradientColor}, 0)`}
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
              left={90}
            />
            <GridColumns
              lineStyle={{ pointerEvents: 'none' }}
              scale={xScale}
              height={yMax}
              strokeDasharray="5,5"
              stroke="#C4C4C4"
              top={10}
              scale={columnsScale}
              strokeWidth={1}
            />
            {/* Main Line */}
            <LinePath
              data={dateFilteredData}
              xScale={xScale}
              yScale={yScale}
              x={xStock}
              y={yStock}
              strokeWidth={4}
              stroke={lineColor}
              fill={'transparent'}
              curve={curveMonotoneX}
            />
            <StatGraphValueScale
              scale={yScale}
              values={valuesAxisValues}
              {...this.props}
            />
            <StatGraphDateScale
              scale={xScale}
              values={dateAxisValues}
              {...this.props}
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
            { tooltipData
              && !tooltipData.d.isFake
              &&
              (<g>
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
              )
            }
          </svg>
              {tooltipData
              && !tooltipData.d.isFake
              && (
                <div>
                  <TooltipCustom
                    top={tooltipTop - 12}
                    left={tooltipLeft + 24}
                    zIndex={3}
                    value={tooltipGetValue().close}
                    title={tooltipTitle}
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
                      unit={firstPoint.unit}
                      value={firstPoint.close}
                    />
                    {/* description element for last dot */}
                    <TooltipCustom
                      left={xScale(xStock( lastPoint )) + 25}
                      top={yScale(yStock( lastPoint )) - 20}
                      unit={lastPoint.unit}
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

// export default connect(
//   state => {
//     return {
//       items: state.projects.items,
//     }
//   }, { getProjects }
// )(Projects);
export default withTooltip(Area);
