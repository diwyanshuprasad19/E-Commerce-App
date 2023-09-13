import '../../../css/categorybef.css'
import React, { useState } from 'react';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlus,faPlug,faPerson,faPersonDress,faKitchenSet,faMobile,faMinus} from "@fortawesome/free-solid-svg-icons";
function Categorychart() {

    const [showSubMenu, setShowSubMenu] = useState(false);

    const handleToggle = () => {
      setShowSubMenu(!showSubMenu);
    };


    return (
      <>
<ul class="horizontal-list">
<li>User</li>
  <li>Sales</li>
  <li>Order</li>
  <li>Likes</li>
</ul>


      <ul className="horizontal-list1">
        <li className="category">
          <span className="toggle" onClick={handleToggle}>Category {!showSubMenu && <FontAwesomeIcon icon={faPlus} />}  {showSubMenu && <FontAwesomeIcon icon={faMinus} />}</span>
          {showSubMenu && (
            <ul className="submenu">
<li>User</li>
  <li>Sales</li>
  <li>Order</li>
  <li>Likes</li>
            </ul>
          )}
        </li>

      </ul>

  </>
    );
  }
  
  export default Categorychart;