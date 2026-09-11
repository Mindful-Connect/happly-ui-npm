import * as SparkStat from './spark-stat';

export default { title: 'Charts/Spark Stat', component: SparkStat.Root };

const rising = [2, 3, 3, 4, 3, 5, 6, 5, 7, 8, 8, 9, 11, 12];
const easing = [9, 9, 8, 8, 7, 7, 6, 6, 5, 5, 5, 4, 4, 4];
const steady = [5, 5, 6, 5, 5, 6, 5, 5, 5, 6, 5, 5, 6, 5];

export const Default = {
  render: () => (
    <div className='w-[352px]'>
      <SparkStat.Root title='Metric title' value={65} delta={23} points={rising} />
    </div>
  ),
};

export const Down = {
  render: () => (
    <div className='w-[352px]'>
      <SparkStat.Root title='Metric title' value={1284} delta={-8} points={easing} />
    </div>
  ),
};

export const Flat = {
  render: () => (
    <div className='w-[352px]'>
      <SparkStat.Root title='Metric title' value={2} delta={0} points={steady} />
    </div>
  ),
};
