import moment from 'moment';

const getDates = () => {
  const tomorrow = moment().add(1, 'days');
  let startDate = moment().subtract(12, 'days');
  const dates = [];
  while (startDate.format('YYYY-MM-DD') !== tomorrow.format('YYYY-MM-DD')) {
    dates.push({ date: startDate.format('YYYY-MM-DD') });
    startDate = startDate.add(1, 'days');
  }
  return dates;
}

export default getDates;