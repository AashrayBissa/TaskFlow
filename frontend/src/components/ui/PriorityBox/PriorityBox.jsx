import React from 'react';
import './PriorityBox.css';

export default function PriorityBox({handleInputChange, task}) {
  return (
      <div className='radio-outer'>
        <input type="radio" name="priority" id="low" className='inp' value="low" checked={task.priority === "low"} onChange={handleInputChange} />
        <label htmlFor="low" className='radio-label'>Low</label>
        <input type="radio" name="priority" id="mid" className='inp' value="medium" checked={task.priority === "medium"} onChange={handleInputChange}/>
        <label htmlFor="mid" className='radio-label'>Medium</label>
        <input type="radio" name="priority" id="high" className='inp' value="high" checked={task.priority === "high"} onChange={handleInputChange}/>
        <label htmlFor="high" className='radio-label'>High</label>
      </div>
  );
}

