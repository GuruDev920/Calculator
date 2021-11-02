import { keys } from '../data/keys.js'
import "./calc.css"
import { Container, Row, Col, Button } from 'react-bootstrap';
import { useState } from 'react';


export default function Calc() {
    const [inputString, setInputString] = useState("")
    const [calcHistory, setCalcHistory] = useState([])
    const infixToPostfix = require('infix-to-postfix');
    const postfixCalculator = require('postfix-calculator');

    const handleClickKey = (key) => {
        console.log({ key, inputString })
        if (key.type === "input") {
            if (inputString.length > 30) return;
            setInputString(inputString + key.value)
        }
        if (key.type === "fun") {
            switch (key.value) {
                case 'ce':
                    setInputString("")
                    break;
                case 'c':
                    setCalcHistory([])
                    setInputString("")
                    break;
                default:
                    const infixString=infixToPostfix(inputString)
                    const res=postfixCalculator(infixString)
                    setInputString(res)
                    setCalcHistory([...calcHistory, inputString])
                    break;
            }
        }
    }
    return (
        <Container fluid>
            <div style={{ display: 'flex', justifyContent: 'center', height: '100%' }}>
                <div style={{ alignSelf: 'center' }}>
                    <Row>
                        <Col >
                            <div className="calc-container">
                                <div className="display-pan">
                                    {inputString}
                                </div>
                                <div className="key-board">
                                    {keys.map(key => (
                                        <Button
                                            key={key.label}
                                            className="key" variant="light"
                                            onClick={() => { handleClickKey(key) }}
                                        >{key.label}</Button>
                                    ))}
                                </div>
                            </div>

                        </Col>
                        <Col>
                            <div className="history">
                                <>----------Calculation History-----------</>
                                {
                                    calcHistory.map(item=>(
                                        <>
                                        <div>=> {item}</div>
                                        <div>~> {infixToPostfix(item)}</div>
                                        <div>== {postfixCalculator(infixToPostfix(item))}</div>
                                        ---------------------
                                        </>
                                    ))
                                }
                            </div>
                        </Col>
                    </Row>
                </div>
            </div>
        </Container>
    )
}