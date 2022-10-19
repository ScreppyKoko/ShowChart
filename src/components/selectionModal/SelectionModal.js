// import Modal from 'react-bootstrap/Modal';
// import Button from 'react-bootstrap/Button';
// import { useRef } from 'react';


// const SelectionModal = (props) => {

//    const selectRef = useRef();

//    return (
//       <Modal
//          {...props}
//          size="lg"
//          aria-labelledby="contained-modal-title-vcenter"
//          centered
//       >
//          <Modal.Header closeButton>
//             <Modal.Title id="contained-modal-title-vcenter">
//                Choose your chart:
//             </Modal.Title>
//          </Modal.Header>
//          <Modal.Body>
//             <select ref={selectRef} name="charts" id="charts">
//                <option>Select a chart</option>
//                <option value="Line">Line</option>
//                <option value="Pie">Pie</option>
//             </select>
//             <Button variant="success" onClick={() => console.log(props)}>Add a chart</Button>
//          </Modal.Body>
//          <Modal.Footer>
//             <Button variant="secondary" onClick={props.onHide}>Close</Button>
//          </Modal.Footer>
//       </Modal>
//    );
// }

// export default SelectionModal;