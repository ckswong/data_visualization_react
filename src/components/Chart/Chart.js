import React from 'react';

import './Chart.css';
import Bar from '../Bar/Bar.js';
import Select from '../Select/Select.js';
import ChartMarkers from '../ChartMarkers/ChartMarkers.js';

const months = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul","Aug", "Sep", "Oct", "Nov", "Dec"];

const Chart = ({data, minThreshold, year, yearSelectHandler, thresholdSelectHandler}) => {

  /* Constants ---------------------------------------- */

  const yMax = 25;

  /* Utils --------------------------------------------- */

  const createDateFromStr = str => new Date(str);
  const getHeightPercentage = value => value/yMax * 100;

  /* Procedural Methods ---------------------------------  */

  const buildBars = (data) => {
    const chartData = [];

    const filteredData = data.filter(incident => {
      const { num_killed, incident_date } = incident;
      const incidentDate = createDateFromStr(incident_date);
      const incidentYear = incidentDate.getFullYear();
      return num_killed >= minThreshold && incidentYear === year
    });

    for(let i = 0; i < 12; i++) {
      const dataByMonth = filteredData.filter((obj) => {
        const incidentDate = createDateFromStr(obj.incident_date);
        const incidentMonth = incidentDate.getMonth();
        return incidentMonth === i
      });
      chartData.push({month: months[i], total_incidents: dataByMonth.length});
    }

    return chartData.map((item, index)=> {
      const {month, total_incidents} = item;
      const wrapperStyles = {gridColumn: `${index + 2} / span 1`};
      const valueStyles = {height: `${getHeightPercentage(total_incidents)}%`};
      return <Bar wrapperStyles={wrapperStyles} valueStyles={valueStyles} title={month} />
    });
  };

  const buildYearOptions = (data) => {
    const years = data.map(incident => {
      const { incident_date } = incident;
      const incidentDate = createDateFromStr(incident_date);
      const incidentYear = incidentDate.getFullYear();
      return incidentYear
    });
    const max = Math.max(...years);
    const min = Math.min(...years);

    //Future-proofing this code for when there are more than 2 years.
    const yearsArr = Array.from(new Array(max - min + 1), (x,i) => i + min);

    return yearsArr.map(yearVal => {
      const selected = yearVal === year;
      return <option value={yearVal} key={yearVal} selected={selected} >{yearVal}</option>
    })
  };

  const buildCountOptions = (data) => {
    const counts = data.map(incident => incident.num_killed);
    const maxCount = Math.max(...counts);
    const countsArr = Array.from(new Array(maxCount), (x,i) => i + 1);

    return countsArr.map(countsVal => {
      const selected = countsVal === minThreshold;
      return <option value={countsVal} key={countsVal} selected={selected} >{countsVal}</option>
    })
  };

  const bars = buildBars(data);
  const yearOptions = buildYearOptions(data);
  const minThresholdOptions = buildCountOptions(data);

  return (
    <React.Fragment>
      <div className="ChartTitle">US Gun Violence Data</div>
      <p className="ChartCitation" >*data from <a href="https://www.gunviolencearchive.org" target="_blank" rel="noopener noreferrer">gunviolencearchive.org</a></p>
      <div className="CharSelectsWrapper">
        <label className="ChartSelectLabel" htmlFor="minThreshold">Threshold number of fatalities for Mass Shooting</label>
        <Select type="minThreshold" onChangeHandler={thresholdSelectHandler}>
          {minThresholdOptions}
        </Select>
        <label className="ChartSelectLabel" htmlFor="year">Select Year</label>
        <Select type="year" onChangeHandler={yearSelectHandler}>
          {yearOptions}
        </Select>
      </div>
      <ChartMarkers bars={bars} year={year}/>
    </React.Fragment>
  );
}

export default Chart;