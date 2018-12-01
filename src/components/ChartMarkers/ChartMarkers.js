import React from 'react';
import './ChartMarkers.css'

const incrementsData = ['5', '10', '15', '20', '25'].reverse();

const ChartWrapper = ({year, bars}) => {
  const increments = incrementsData.map(increment => <div key={increment} className="Increments-increment">{increment}</div>);
  const delineators = incrementsData.map(() => <div className="Delineators-delineator"></div>);
  return (
    <div className="ChartWrapper">
      <div className="ChartWrapper-xTitle">Number of Mass Shootings</div>
      <div className="ChartWrapper-yTitle">{`Month in ${year}`}</div>
      <div className="ChartMarkers">
        <div className="Increments">
          {increments}
        </div>
        <div className="Delineators">
          {delineators}
        </div>
      </div>
      <div className="ChartBars js-Bars">
        {bars}
      </div>
    </div>
  );
}

export default ChartWrapper;