import React, { useEffect, useState } from 'react';
import { Card, CardBody } from 'reactstrap';
import { Link } from 'react-router-dom';
import { Bar } from 'react-chartjs-2';
import moment from 'moment';
import * as api from '../api/v1';
import ParkingLogsTable from './ParkingLogsTable';
import DatePicker from '../utils/datepicker';
import 'react-datepicker/dist/react-datepicker.css';

const mainChartOpts = {
  responsive: true,
  maintainAspectRatio: false,
  legend: {
    display: false,
  },
  scales: {
    yAxes: [
      {
        ticks: {
          beginAtZero: true,
          precision: 0,
        },
      },
    ],
    xAxes: [
      {
        type: 'time',
        distribution: 'linear',
        time: {
          unit: 'minute',
          displayFormats: {
            minute: 'DD.MM H:mm',
            hour: 'DD.MM H:mm',
            day: 'DD.MM',
          },
          tooltipFormat: 'DD.MM.YYYY H:mm',
        },
        bounds: 'data',
        ticks: {
          autoSkip: true,
        },
        barPercentage: 0.9,
        categoryPercentage: 0.9,
      },
    ],
  },
  elements: {
    point: {
      radius: 0,
      hitRadius: 10,
      hoverRadius: 4,
      hoverBorderWidth: 3,
    },
  },
};

const columns = [
  { Header: 'Общее количество', accessor: 'capacity' },
  { Header: 'Текущее количество', accessor: 'current' },
  {
    Header: 'Изображение',
    accessor: 'image',
    Cell: ({ value }) => (
      <Link to={'/pk/images/' + value} target="_blank">
        {value}
      </Link>
    ),
  },
  {
    Header: 'Дата',
    accessor: 'createdAt',
    Cell: ({ value }) => moment(value).format('DD.MM.YY HH:mm:ss'),
  },
];

export default function ({ match }) {
  const [logs, setLogs] = useState([]);
  const [count, setCount] = useState(0);
  const [loading, setLoading] = React.useState(false);
  const fetchIdRef = React.useRef(0);
  const [chartOpts, setChartOpts] = useState({});
  const [dateFrom, setDateFrom] = useState('');
  const [dateTo, setDateTo] = useState('');
  const [dateStep, setDateStep] = useState(0);

  const selectDates = (date) => {
    if (!dateStep) {
      setDateFrom(new Date(date.setHours(0, 0, 0, 0)));
      setDateTo(new Date(date.setHours(23, 59, 0, 0)));
      setDateStep(1);
    } else {
      if (date <= dateFrom) {
        setDateFrom(new Date(date.setHours(0, 0, 0, 0)));
        setDateStep(0);
      } else if (date >= dateTo) {
        setDateTo(new Date(date.setHours(23, 59, 0, 0)));
        setDateStep(0);
      }
    }
  };

  const fetchData = React.useCallback(
    ({ pageSize, pageIndex, sortBy, dateFrom, dateTo }) => {
      const fetchId = ++fetchIdRef.current;
      setLoading(true);
      let sort = '';
      if (sortBy.length) {
        sort = `${sortBy[0].id}:${sortBy[0].desc ? 'desc' : 'asc'}`;
      }
      api
        .getLogs({
          sort,
          parking: match.params.id,
          page: pageIndex + 1,
          limit: pageSize,
          dateFrom: dateFrom && dateFrom.getTime(),
          dateTo: dateTo && dateTo.getTime(),
        })
        .then((logs) => {
          if (fetchId === fetchIdRef.current) {
            setLogs(logs.data);
            setCount(Math.ceil(logs.count / pageSize));
          }
        })
        .catch((error) => {
          console.log(error);
        })
        .then(() => setLoading(false));
    },
    [],
  );

  useEffect(() => {
    setChartOpts({
      labels: logs.map((r) => r.createdAt),
      datasets: [
        {
          label: 'Статистика занятых мест',
          backgroundColor: '#ddd',
          borderColor: '#20a8d8',
          pointHoverBackgroundColor: '#fff',
          borderWidth: 2,
          data:
            logs.length > 0
              ? logs.map((r) => {
                  return { x: r.createdAt, y: r.current };
                })
              : [],
        },
      ],
    });
  }, [logs]);

  return (
    <div className="parking-stats">
      <Card>
        <CardBody>
          <div className="mb-3">
            <Bar data={chartOpts} options={mainChartOpts} height={300} />
          </div>
          <DatePicker
            selected={dateFrom}
            startDate={dateFrom}
            endDate={dateTo}
            onSelect={selectDates}
            shouldCloseOnSelect={!!dateStep}
            dateFormat="dd.MM.yy"
            customInput={
              <div className="">
                <input
                  readOnly
                  type="text"
                  value={
                    (!!(dateFrom && dateTo) &&
                      moment(dateFrom).format('DD.MM.YYYY') +
                        ' - ' +
                        moment(dateTo).format('DD.MM.YYYY')) ||
                    'Выберите период'
                  }
                />
              </div>
            }
          />
          <ParkingLogsTable
            columns={columns}
            data={logs}
            fetchData={fetchData}
            dateFrom={dateFrom}
            dateTo={dateTo}
            count={count}
            loading={loading}
          />
        </CardBody>
      </Card>
    </div>
  );
}
