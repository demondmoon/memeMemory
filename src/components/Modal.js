
import classes from './Modal.module.css'
const Modal = ({turns, setShowModal}) => {
  const hide = (event) => {
    if(event.target.className === classes.backdrop) {
      setShowModal(false);
    }  
  }

  const closeModal = () => {
    setShowModal(false)
  }

  return (
    <div className={classes.backdrop} onClick={hide}>
      <div className={classes.modal}>
        <h2>You win!</h2>
        <p>You spent {turns} turns.</p>
        <button onClick={closeModal}>close</button>
      </div>
    </div>
  );
};

export default Modal;
