import { useState, useRef } from 'react';
import { v4 as uuidv4 } from 'uuid';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';

import useChartService from '../../services/ChartService';
import ChartLine from '../chartLine/ChartLine';
import ChartPie from '../chartPie/ChartPie';
// import SelectionModal from '../selectionModal/SelectionModal';

//TODO сделать спиннер на загрузку, отрисовку в случае ошибки и при сценарии когда закончился массив данных
// const setContent = (process, Component, newItemLoading) => {
//    switch (process) {
//       case 'waiting':
//          return <Spinner />;
//       case 'loading':
//          return newItemLoading ? <Component /> : <Spinner />;
//       case 'confirmed':
//          return <Component />;
//       case 'error':
//          return <ErrorMessage />;
//       default:
//          throw new Error('Unexpected process state');
//    }
// }
// const [offsetPie, setOffsetPie] = useState(0);
// const [newItemLoading, setNewItemLoading] = useState(false);
// const [charEnded, setCharEnded] = useState(false);
// const { process, setProcess, getLineChart, getPieChart } = useChartService();


const ButtonAdded = () => {
   const [modalShow, setModalShow] = useState(false);
   const [chartLine, setChartLine] = useState([]);
   const [chartPie, setChartPie] = useState([]);
   const [offsetLine, setOffsetLine] = useState(0);

   const selectRef = useRef();

   const { getLineChart, getPieChart, setProcess } = useChartService();

   const onRequestLine = (initial) => {
      // initial ? setNewItemLoading(false) : setNewItemLoading(true);
      getLineChart(offsetLine)
         .then(onChartLineLoaded)
         .then(() => setProcess('confirmed'));
   }

   const onRequestPie = (initial) => {
      // initial ? setNewItemLoading(false) : setNewItemLoading(true);
      getPieChart()
         .then(onChartPieLoaded)
         .then(() => setProcess('confirmed'));
   }

   const onChartLineLoaded = async (newChartList) => {
      setChartLine([...chartLine, [...newChartList]]);
      setOffsetLine(offsetLine + 1);
   }

   const onChartPieLoaded = async (newChartList) => {
      setChartPie([...chartPie, [...newChartList]]);
   }

   function renderListChart(arr, Component) {
      return arr.map((item) => {
         return (
            <li key={uuidv4()} style={{ margin: "30px auto" }}>
               <Component item={item} />
            </li >
         )
      })
   }

   function createChart(element) {
      if (element.current.value === "Pie") {
         setModalShow(false);
         onRequestPie();
      }
      if (element.current.value === "Line") {
         setModalShow(false);
         onRequestLine(offsetLine);
      }
   }

   const lineList = renderListChart(chartLine, ChartLine);
   const pieList = renderListChart(chartPie, ChartPie);

   // вынести в отдельный компонент.. поймал затык на передаче пропсов и завис
   const SelectionModal = (props) => {
      return (
         <Modal
            {...props}
            size="lg"
            aria-labelledby="contained-modal-title-vcenter"
            centered
         >
            <Modal.Header closeButton>
               <Modal.Title id="contained-modal-title-vcenter">
                  Choose your chart:
               </Modal.Title>
            </Modal.Header>
            <Modal.Body>
               <select ref={selectRef} name="charts" id="charts">
                  <option>Select a chart</option>
                  <option value="Line">Line</option>
                  <option value="Pie">Pie</option>
               </select>
               <Button
                  variant="success"
                  onClick={() => createChart(selectRef)}
                  style={{ marginLeft: "20px" }}>
                  Add a chart
               </Button>
            </Modal.Body>
            <Modal.Footer>
               <Button variant="secondary" onClick={props.onHide}>Close</Button>
            </Modal.Footer>
         </Modal>
      );
   }

   return (
      <div>
         <div style={{ textAlign: "center", marginTop: "50px" }}>
            <Button variant="danger" onClick={() => setModalShow(true)}>
               Add new chart
            </Button>
         </div>
         <SelectionModal
            show={modalShow}
            onHide={() => setModalShow(false)}
         />
         <ul>
            {/*  объединить в один массив и последовательно рендерить  */}
            {lineList}
            {pieList}
         </ul>
      </div>
   )
}

export default ButtonAdded;