import React, { SyntheticEvent } from 'react';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import IconButton from '@mui/material/IconButton'
import Modal from '@mui/material/Modal'
import Box from '@mui/material/Box'
import Autocomplete from '@mui/material/Autocomplete'
import TextField from '@mui/material/TextField'
import dayjs, { Dayjs } from 'dayjs';
import { DateTimePicker } from '@mui/x-date-pickers/DateTimePicker';
import { DemoContainer } from '@mui/x-date-pickers/internals/demo';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import Button from '@mui/material/Button';
import { Type } from 'typescript';
import axios from 'axios';
import { Bar } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js';
import { Line } from 'react-chartjs-2';
import { Typography } from '@mui/material';

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  BarElement,
  Title,
  Tooltip,
  Legend
);


export const options = {
  responsive: true,
  plugins: {
    legend: {
      position: 'top' as const,
    },
    title: {
      display: true,
      text: 'Chart.js Line Chart',
    },
  },
};




const documents: IDocument[] = [
  {
    driver: 'Arthur',
    car: 'BMW',
    departuretime: dayjs('21-05-2023'),
    arrivaltime: dayjs('22-05-2023'),
    initialmileage: 2,
    finalmileage: 10,
    mileage: 8,
    fuelconsumption: 1
  },
  {
    driver: 'Alan',
    car: 'BMW',
    departuretime: dayjs('23-05-2023'),
    arrivaltime: dayjs('24-05-2023'),
    initialmileage: 2,
    finalmileage: 11,
    mileage: 9,
    fuelconsumption: 1
  }
]



const style = {
  position: 'absolute' as 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 400,
  bgcolor: 'background.paper',
  border: '2px solid #000',
  boxShadow: 24,
  p: 4,
};

interface ICar {
  car: string,
  mark: string,
  number: number,
  year: number,
  oil: number,
}

interface IGraphDrivers {
  driver: string,
  mileage: number
}

interface IGraphCars {
  car: string,
  mileage: number
}

interface IDriver {
  driver: string,
  car: string,
}

interface IDocument {
  driver: string,
  car: string,
  departuretime: Dayjs,
  arrivaltime: Dayjs,
  initialmileage: number,
  finalmileage: number,
  mileage: number,
  fuelconsumption: number
}

let car1: ICar = {car: '', mark: '', number: 0, year: 0, oil: 0}
let driver1: IDriver = {driver: '', car: ''}
let document1: IDocument = {driver: '', car: '', departuretime: dayjs('2019-01-25'), arrivaltime: dayjs('2019-01-25'), initialmileage: 0, finalmileage: 0, mileage: 0, fuelconsumption: 0}

function App() {

  const [cars, setCars] = React.useState<ICar[]>([])
  const [drivers, setDrivers] = React.useState<IDriver[]>([])
  const [documents, setDocuments] = React.useState<IDocument[]>([])

  const [modal, setModal] = React.useState(false)
  const [modalDrivers, setModalDrivers] = React.useState(false)
  const [modalCars, setModalCars] = React.useState(false)

  const [newOption, setNewOption] = React.useState(cars.map(item => {return {label: item.mark}}))

  const [chartDataCars, setChartDataCars] = React.useState<IGraphCars[]>([{car: '', mileage: 0}])
  const [chartDataDrivers, setChartDataDrivers] = React.useState<IGraphDrivers[]>([{driver: '', mileage: 0}])

  const [chartCars, setChartCars] = React.useState({
    labels: chartDataCars.map((item) => item.car),
    datasets: [
      {
        label: 'пробег по машинам',
        data: chartDataCars.map((item) => item.mileage),
        borderColor: 'rgb(255, 99, 132)',
        backgroundColor: 'rgba(255, 99, 132, 0.5)',
      },
    ],
  })

  const [chartDrivers, setChartDrivers] = React.useState({
    labels: chartDataDrivers.map((item) => item.driver),
    datasets: [
      {
        label: 'пробег по водителям',
        data: chartDataDrivers.map((item) => item.mileage),
        borderColor: 'rgb(255, 99, 132)',
        backgroundColor: 'rgba(255, 99, 132, 0.5)',
      },
    ],
  })



  const [newDocument, setNewDocument] = React.useState<IDocument>(document1)
  const [newDriver, setNewDriver] = React.useState<IDriver>(driver1)
  const [newCar, setNewCar] = React.useState<ICar>(car1)


  React.useEffect(() => {
    axios.get<ICar[]>('http://localhost:8080/product').then((response) => setCars(response.data))
    axios.get<IDriver[]>('http://localhost:8080/user').then((response) => setDrivers(response.data))
    axios.get<IDocument[]>('http://localhost:8080/order').then((response) => setDocuments(response.data))
    axios.get<[IGraphCars[], IGraphDrivers[]]>('http://localhost:8080/mileage')
      .then((response) => {
        setChartDataCars(response.data[0])
        setChartDataDrivers(response.data[1])
      })
  }, [])

  React.useEffect(() => {
    setChartCars({
      labels: chartDataCars.map((item) => item.car),
      datasets: [
        {
          label: 'пробег по машинам',
          data: chartDataCars.map((item) => item.mileage),
          borderColor: 'rgb(255, 99, 132)',
          backgroundColor: 'rgba(255, 99, 132, 0.5)',
        },
      ],
    })
    setChartDrivers({
      labels: chartDataDrivers.map((item) => item.driver),
      datasets: [
        {
          label: 'пробег по водителям',
          data: chartDataDrivers.map((item) => item.mileage),
          borderColor: 'rgb(255, 99, 132)',
          backgroundColor: 'rgba(255, 99, 132, 0.5)',
        },
      ],
    })
  }, [chartDataCars, chartDataDrivers])



  const openModal = () => {
    setModal(prev => !prev)
  }
  
  const openModalDrivers = () => {
    setModalDrivers(prev => !prev)
  }

  const openModalCars = () => {
    setModalCars(prev => !prev)
  }

  const changePropertyCar = (e: React.SyntheticEvent<Element, Event>, value: string) => {
    let document = newDocument
    document.driver = value
    setNewDocument(document)
  }

  const changePropertyInitialMileage = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    let document = newDocument
    document.initialmileage = parseFloat(e.target.value)
    setNewDocument(document)
  }

  const changePropertyMileage = (mil: number) => {
    let document = newDocument
    document.mileage = mil
    setNewDocument(document)
  }

  const changePropertyFinalMileage = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    let document = newDocument
    changePropertyMileage(document.finalmileage - document.initialmileage)
    document.finalmileage = parseFloat(e.target.value)
    setNewDocument(document)
  }

  const changePropertyFuelConsumptione = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    let document = newDocument
    document.fuelconsumption = parseFloat(e.target.value)
    setNewDocument(document)
  }

  const changePropertyDriver = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    let driver = newDriver
    driver.driver = e.target.value
    setNewDriver(driver)
  }

  const handleOptionChangeCar = (e: React.SyntheticEvent<Element, Event>, value: string) => {
    let driver = newDriver
    driver.car = value
    setNewDriver(driver)
  }

  const changePropertyCar1 = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    let car = newCar
    car.car = e.target.value
    setNewCar(car)
  }

  const changePropertyMark = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    let car = newCar
    car.mark = e.target.value
    setNewCar(car)
  }
  
  const changePropertyNumber = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    let car = newCar
    car.number = parseFloat(e.target.value)
    setNewCar(car)
  }

  const changePropertyYear = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    let car = newCar
    car.year = parseFloat(e.target.value)
    setNewCar(car)
  }

  const changePropertyOil = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    let car = newCar
    car.oil = parseFloat(e.target.value)
    setNewCar(car)
  }

  const handleOptionChange = (e: React.SyntheticEvent<Element, Event>, value: string) => {
    const newOpt = drivers.filter(item => item.car === value)
    const newop = newOpt.map(item => {
      return { label: item.driver } 
    })
    let document = newDocument
    document.car = value
    setNewDocument(document)
    setNewOption(newop)
  }

  const handleClose = () => {}

  const handleCreateDocument = (e: React.FormEvent) => {
    axios.post('http://localhost:8080/order', newDocument)
    axios.get<IDocument[]>('http://localhost:8080/order').then((response) => setDocuments(response.data))
    setModal(false)
    e.preventDefault()
  }

  const handleCreateDriver = (e: React.FormEvent) =>{
    axios.post('http://localhost:8080/user', newDriver)
    axios.get<IDriver[]>('http://localhost:8080/user').then((response) => setDrivers(response.data))
    setModalDrivers(false)
    e.preventDefault()
  }

  const handleCreateCar = (e: React.FormEvent) =>{
    axios.post('http://localhost:8080/product', newCar)
    axios.get<ICar[]>('http://localhost:8080/product').then((response) => setCars(response.data))
    setModalCars(false)
    e.preventDefault()
  }

  return (
    <div className="w-full flex gap-2 flex-col">
      <div className='w-full flex flex-col'>
        <div>
          <div className='flex'>
            <IconButton onClick={openModalCars} color="primary" aria-label="add to shopping cart">
              <p className='text-center'>+</p>
            </IconButton>
            <Typography variant="h4" component="h2">
              Машины
            </Typography>
          </div>
          
          <Modal
          open={modalCars}
          onClose={handleClose}
          aria-labelledby="modal-modal-title"
          aria-describedby="modal-modal-description"
          >
            <Box sx={style}>
              <form action="" onSubmit={(e) => handleCreateCar(e)}>
                <p className='cursor-pointer absolute right-2 top-1' onClick={openModalCars}>закрыть</p>
                <TextField onChange={(e) => changePropertyCar1(e)}  id="outlined-basic" label="Car" variant="outlined" />
                <TextField onChange={(e) => changePropertyMark(e)}  id="outlined-basic" label="Mark" variant="outlined" />
                <TextField onChange={(e) => changePropertyNumber(e)}  type="number" id="outlined-basic" label="Number	" variant="outlined" />
                <TextField onChange={(e) => changePropertyYear(e)}  type="number" id="outlined-basic" label="Year" variant="outlined" />
                <TextField onChange={(e) => changePropertyOil(e)} type="number" id="outlined-basic" label="oil" variant="outlined" />
                <Button type='submit' variant="outlined">создать</Button>
              </form>
            </Box>
          </Modal>
          
          <TableContainer component={Paper}>
            <Table sx={{ minWidth: 650 }} aria-label="simple table">
              <TableHead>
                <TableRow>
                  <TableCell>Car</TableCell>
                  <TableCell>Mark</TableCell>
                  <TableCell>Number</TableCell>
                  <TableCell>Year&nbsp;</TableCell>
                  <TableCell>Oil&nbsp;</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {cars.map((car) => (
                  <TableRow
                    key={car.mark}
                    sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                  >
                    <TableCell>{car.car}</TableCell>
                    <TableCell component="th" scope="row">
                      {car.mark}
                    </TableCell>
                    <TableCell>{car.number}</TableCell>
                    <TableCell>{car.year}</TableCell>
                    <TableCell>{car.oil}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        </div>
        <div className='mt-2'>
          <div className='flex'>
            <IconButton onClick={openModalDrivers} color="primary" aria-label="add to shopping cart">
              <p className='text-center'>+</p>
            </IconButton>
            <Typography variant="h4" component="h2">
              Водители
            </Typography>
          </div>
          
          <Modal
          open={modalDrivers}
          onClose={handleClose}
          aria-labelledby="modal-modal-title"
          aria-describedby="modal-modal-description"
          >
            <Box sx={style}>
              <form action="" onSubmit={(e) => handleCreateDriver(e)}>
                <p className='cursor-pointer absolute right-2 top-1' onClick={openModalDrivers}>закрыть</p>
                <TextField onChange={(e) => changePropertyDriver(e)} id="outlined-basic" label="driver" variant="outlined" />
                <Autocomplete
                  onInputChange={(e, value) => handleOptionChangeCar(e, value)}
                  disablePortal
                  id="combo-box-demo"
                  options={cars.map(item => {return {label: item.car}})}
                  sx={{ width: 300 }}
                  renderInput={(params) => <TextField {...params} label="cars" />}
                />
                <Button type='submit' variant="outlined">создать</Button>
              </form>
            </Box>
          </Modal>
          
          <TableContainer component={Paper}>
            <Table sx={{ minWidth: 650 }} aria-label="simple table">
              <TableHead>
                <TableRow>
                  <TableCell>driver</TableCell>
                  <TableCell>car</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {drivers.map((driver) => (
                  <TableRow
                    key={driver.driver}
                    sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                  >
                    <TableCell component="th" scope="row">
                      {driver.driver}
                    </TableCell>
                    <TableCell>{driver.car}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        </div>
      </div>
      <div className='w-full flex flex-col'>
        <Modal
          open={modal}
          onClose={handleClose}
          aria-labelledby="modal-modal-title"
          aria-describedby="modal-modal-description"
        >
          <Box sx={style}>
            <form action="" onSubmit={(e) => handleCreateDocument(e)}>
              <p className='cursor-pointer absolute right-2 top-1' onClick={openModal}>закрыть</p>
              <Autocomplete
                onInputChange={(e, value) => handleOptionChange(e, value)}
                disablePortal
                id="combo-box-demo"
                options={cars.map(item => {return {label: item.car}})}
                sx={{ width: 300 }}
                renderInput={(params) => <TextField {...params} label="cars" />}
              />
              <Autocomplete
                onInputChange={(e, value) => changePropertyCar(e, value)}
                disablePortal
                id="combo-box-demo"
                options={newOption}
                sx={{ width: 300 }}
                renderInput={(params) => <TextField {...params} label="drivers" />}
              />
              <LocalizationProvider dateAdapter={AdapterDayjs}>
                <DemoContainer components={['DateTimePicker']}>
                  <DateTimePicker onChange={(e: any) => {
                    let document = newDocument
                    document.arrivaltime = e
                  }} label="Basic date time picker" />
                  <DateTimePicker onChange={(e: any) => {
                    let document = newDocument
                    document.departuretime = e
                  }} label="Basic date time picker" />
                </DemoContainer>
              </LocalizationProvider>
              <TextField onChange={(e) => changePropertyInitialMileage(e)} type="number" id="outlined-basic" label="initialMileage" variant="outlined" />
              <TextField onChange={(e) => changePropertyFinalMileage(e)} type="number" id="outlined-basic" label="finalMileage" variant="outlined" />
              <TextField onChange={(e) => changePropertyMileage(newDocument.finalmileage - newDocument.initialmileage)} value={newDocument.mileage} type="number" id="outlined-basic" label="mileage" variant="outlined" />
              <TextField onChange={(e) => changePropertyFuelConsumptione(e)} type="number" id="outlined-basic" label="fuelConsumption" variant="outlined" />
              <Button type='submit' variant="outlined">создать</Button>
            </form>
          </Box>
        </Modal>
        <span className='flex'>
          <IconButton onClick={openModal} color="primary" aria-label="add to shopping cart">
            <p className='text-center'>+</p>
          </IconButton>
          <Typography variant="h4" component="h2">
            Документы
          </Typography>
        </span>
        <div className='flex w-full justify-center items-center'>
        
        <TableContainer component={Paper}>
            <Table sx={{ minWidth: 650 }} aria-label="simple table">
              <TableHead>
                <TableRow>
                  <TableCell>driver</TableCell>
                  <TableCell>car</TableCell>
                  <TableCell>departureTime</TableCell>
                  <TableCell>arrivalTime</TableCell>
                  <TableCell>initialMileage</TableCell>
                  <TableCell>finalMileage</TableCell>
                  <TableCell>mileage</TableCell>
                  <TableCell>fuelConsumption</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {documents.map((document) => (
                  <TableRow
                    key={document.driver}
                    sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                  >
                    <TableCell component="th" scope="row">
                      {document.driver}
                    </TableCell>
                    <TableCell>{document.car}</TableCell>
                    <TableCell>{(document.departuretime).toString()}</TableCell>
                    <TableCell>{(document.arrivaltime).toString()}</TableCell>
                    <TableCell>{document.initialmileage}</TableCell>
                    <TableCell>{document.finalmileage}</TableCell>
                    <TableCell>{document.mileage}</TableCell>
                    <TableCell>{document.fuelconsumption}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        </div>
      </div>
      <div className='flex flex-col w-full'>
        <div className='flex w-1/2'>
          <Line options={options} data={chartCars} />
          <Bar options={options} data={chartCars} />
        </div>
        <div className='flex w-1/2'>
          <Line options={options} data={chartDrivers} />
          <Bar options={options} data={chartDrivers} />
        </div>
      </div>
    </div>
  );
}

export default App;
