class Calculator {
    constructor(resultCell, prevOperandCell) {
        this.resultCell = resultCell
        this.prevOperandCell = prevOperandCell
        this.clear()
    }

    clear() {
        this.result = ''
        this.prevOperand = ''
        this.operation = undefined
    }

    delete() {
       this.result = this.result.toString().slice(0, -1)
    }

    appendNumber(number) {
        if(number === '.' && this.result.includes('.')) return
        if(number === '0' && this.result === '0') return
        if(this.overwright) {
            this.result = ""
            this.overwright = false
        }

        this.result = this.result.toString() + number.toString()
        
    }

    chooseOperation(operation) {
        if(this.result === '' && this.prevOperand !== '') {
            this.operation = operation
            this.compute()
        }
        if(this.prevOperand !== '') {
            this.compute()
        }
        if(this.result === '') return
        
        this.operation = operation
        this.prevOperand = this.result
        this.result = ''
        this.overwright = false
    }

    compute() {
        let computation
        const prev = parseFloat(this.prevOperand)
        const next = parseFloat(this.result)
        if(isNaN(prev) || isNaN(next)) return

        switch(this.operation) {
            case '+':
                computation = prev + next
                break            
            case '−':
                computation = prev - next
                break
            case '×':
                computation = prev * next
                break
            case '÷':
                computation = prev / next
                break
            default:
                return
        }
        this.result = computation
        this.prevOperand = ''
        this.operation = undefined
        this.overwright = true
    }

    updateDisplay() {
        this.resultCell.innerText = this.result
        if(this.operation != null) {
            this.prevOperandCell.innerText = `${this.prevOperand} ${this.operation}`
        } else {
            this.prevOperandCell.innerText = this.prevOperand
        }
    }
}

const numberBtns = document.querySelectorAll('.number')
const operationBtns = document.querySelectorAll('.operation')
const equalsBtn = document.querySelector('.equals')
const deleteBtn = document.querySelector('.delete')
const allClearBtn = document.querySelector('.all-clear')
const prevOperandCell = document.querySelector('.current-operation')
const resultCell = document.querySelector('.result')

const calculator = new Calculator(resultCell, prevOperandCell)

numberBtns.forEach(button => {
    button.addEventListener('click', () => {
        calculator.appendNumber(button.innerText)
        calculator.updateDisplay()
    })
})

operationBtns.forEach(button => {
    button.addEventListener('click', () => {
        calculator.chooseOperation(button.innerText)
        calculator.updateDisplay()
    })
})

equalsBtn.addEventListener('click', button => {
    calculator.compute()
    calculator.updateDisplay()
})

allClearBtn.addEventListener('click', button => {
    calculator.clear()
    calculator.updateDisplay()
})

deleteBtn.addEventListener('click', button => {
    calculator.delete()
    calculator.updateDisplay()
})