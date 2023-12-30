import { PieChart, pieArcLabelClasses } from '@mui/x-charts/PieChart';



const PieCharts = ({dataToShow}) => {
  console.log("cat data :",dataToShow)

  const data = dataToShow?.map((data,i)=>({ id: i, value: data.value, label: data.label }))

  const size = {
    width: 500,
    height: 300,
  };
  return (

    <PieChart
    series={[
      {
        arcLabel: (item) => `${item.label} (${item.value})`,
        arcLabelMinAngle: 45,
        data,
      },
    ]}
    sx={{
      [`& .${pieArcLabelClasses.root}`]: {
        fill: 'white',
        fontWeight: 'bold',
      },
    }}
    {...size}
  />
   
  )
}


export default PieCharts