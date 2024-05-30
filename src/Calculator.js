import React from 'react';

class Calculator extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            display: '',
            currentNum: '0',
            result: false
        }
        this.updateNum = this.updateNum.bind(this);
        this.reset = this.reset.bind(this);
        this.result = this.result.bind(this);
        this.replaceOperators = this.replaceOperators.bind(this);
    }

    replaceOperators(newOperator) {
        let i = this.state.display.length - 1;
        const display = this.state.display;
        const operators = ['+', '-', '*', '/'];
        let newDisplay = '';
        while(operators.includes(display.charAt(i))){
            newDisplay = display.slice(0, i);
            i--;
        }
        return newDisplay + newOperator;
    }

    updateNum(e) {
        let value = e.target.innerText;
        const prevNum = this.state.currentNum;
        const operators = ['+', '-', '*', '/'];
        if(value === 'x') value = '*';
        if(this.state.currentNum === '0'){
            this.setState({
                display: value,
                currentNum: value,
                result: false
            })
        }
        else if(this.state.result && !operators.includes(value)){
            this.setState({
                display: value,
                currentNum: value,
                result: false
            })
        }
        else{
            switch(value){
                case '+':
                case '-':
                case '*':
                case '/':
                    this.setState({
                        display: operators.includes(prevNum) && value !== '-' ? this.replaceOperators(value) : this.state.display + value,
                        currentNum: value,
                        result: false
                    })
                    break;
                case '.':
                    this.setState({
                        display: prevNum.includes('.') ? this.state.display : this.state.display + value,
                        currentNum: prevNum.includes('.') ? prevNum : prevNum + value,
                        result: false
                    })
                    break;
                default:
                    this.setState({
                        display: this.state.display + value,
                        currentNum: prevNum + value,
                        result: false
                    })
                break;
            }
        }
    }

    reset() {
        this.setState({
            display: '',
            currentNum: '0',
            result: false
        })
    }

    result() {
        if(this.state.result) return;
        let display  = this.state.display;
        if(display.charAt(0)==='0'){
            display = display.slice(1);
        }
        console.log(display);
        const result = Math.round(1e12 * eval(display)) / 1e12;
        this.setState({
            display: result,
            currentNum: result,
            result: true
        })
    }




    render() {
        return (
            <div id="calculator">
                <div id="display-wrapper" className="display">
                    <p className = "string" id="string">{this.state.display}</p>
                    <p className='currentNumber' id="display">{this.state.currentNum}</p>            
                </div>
                <div id="keyboard">
                    <button id="clear" className="clear" onClick={this.reset} >AC</button>
                    <button id="divide" className="operator" onClick={this.updateNum}>/</button>
                    <button id="multiply" className="operator" onClick={this.updateNum}>x</button>
                    <button id="seven" className="number" onClick={this.updateNum}>7</button>
                    <button id="eight" className="number" onClick={this.updateNum}>8</button>
                    <button id="nine" className="number" onClick={this.updateNum}>9</button>
                    <button id="subtract" className="operator" onClick={this.updateNum}>-</button>
                    <button id="four" className="number" onClick={this.updateNum}>4</button>
                    <button id="five" className="number" onClick={this.updateNum}>5</button>
                    <button id="six" className="number" onClick={this.updateNum}>6</button>
                    <button id="add" className="operator" onClick={this.updateNum}>+</button>
                    <button id="one" className="number" onClick={this.updateNum}>1</button>
                    <button id="two" className="number" onClick={this.updateNum}>2</button>
                    <button id="three" className="number" onClick={this.updateNum}>3</button>
                    <button id="equals" className="equal" onClick={this.result}>=</button>
                    <button id="zero" className="number" onClick={this.updateNum}>0</button>
                    <button id="decimal" className="number" onClick={this.updateNum}>.</button>
                </div>
            </div>
        )
    }
}

export default Calculator;