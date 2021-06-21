import React from 'react'
import './Modal.css'

export default class Modal extends React.Component {
    state = {
        isOpen:false
    }
    render(){
        return(
            <React.Fragment>
                <button onClick={() =>  this.setState({isOpen:true})}>Открыть окно</button>
                {this.state.isOpen && (<div className='modal'>
                    <div className='modalBody'>
                        <h1>Модальная акошка</h1>
                        <p> Текст модальной акошки</p>
                        <button onClick={() =>  this.setState({isOpen:false})}>Закрыть окошко</button>
                    </div>
                </div>)}
            </React.Fragment>
        )
    }
}