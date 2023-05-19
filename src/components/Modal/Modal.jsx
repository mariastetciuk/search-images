import { useEffect } from 'react';
import PropTypes from 'prop-types';
import css from './Modal.module.css';

export const Modal = ({ largeURL, description, closeModal }) => {
  const handleOverlayClick = event => {
    if (event.currentTarget === event.target) {
      closeModal();
    }
  };
  const handlePressESC = event => {
    if (event.code === 'Escape') {
      closeModal();
    }
  };

  useEffect(() => {
    document.addEventListener('keydown', handlePressESC);
  }, []);

  // useEffect(() => {
  //   return document.removeEventListener('keydown', handlePressESC);
  // }, [handlePressESC]);

  return (
    <div className={css.overlay} onClick={handleOverlayClick}>
      <div className={css.modal}>
        <img src={largeURL} alt={description} />
      </div>
    </div>
  );
};

Modal.propTypes = {
  largeURL: PropTypes.string.isRequired,
  description: PropTypes.string.isRequired,
  closeModal: PropTypes.func.isRequired,
};

// export class Modal extends Component {
//   componentDidMount() {
//     document.addEventListener('keydown', this.handlePressESC);
//   }

//   componentWillUnmount() {
//     document.removeEventListener('keydown', this.handlePressESC);
//   }

//   handleOverlayClick = event => {
//     if (event.currentTarget === event.target) {
//       this.props.closeModal();
//     }
//   };

//   handlePressESC = event => {
//     if (event.code === 'Escape') {
//       this.props.closeModal();
//     }
//   };

//   render() {
//     const { largeURL, description } = this.props;
//     return (
//       <div className={css.overlay} onClick={this.handleOverlayClick}>
//         <div className={css.modal}>
//           <img src={largeURL} alt={description} />
//         </div>
//       </div>
//     );
//   }
// }
