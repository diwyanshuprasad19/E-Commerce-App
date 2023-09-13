import '../../css/Cart/stepper.css';
function Stepper(props) {

  return (
<>
<section className="step-wizard">
        <ul className="step-wizard-list">
            <li className={`step-wizard-item ${props.value === 1 ? 'current-item' : ''}`}>
                <span className="progress-count">1</span>
                <span className="progress-label">Cart</span>
            </li>

            <li className={`step-wizard-item ${props.value === 2 ? 'current-item' : ''}`}>
                <span className="progress-count">2</span>
                <span className="progress-label">Address</span>
            </li>

            <li className={`step-wizard-item ${props.value === 3 ? 'current-item' : ''}`}>
                <span className="progress-count">3</span>
                <span className="progress-label">Payment Method</span>
            </li>

            <li className="step-wizard-item">
                <span className="progress-count">4</span>
                <span className="progress-label">Success</span>
            </li>
        </ul>
    </section>

</>
  );
}

export default Stepper;
