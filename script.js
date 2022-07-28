class Calculator {
    constructor(resultCell, outputCell) {
        this.resultCell = resultCell
        this.outputCell = outputCell
        this.clear()
    }

    clear() {
        this.result = ''
        this.output = ''
        this.operation = undefined
    }

    delete() {
       this.result = this.result.toString().slice(0, -1) 
    }

    appendNumber(number) {
        if(number === '.' && this.result.includes('.')) return
        if(number === '0' && this.result === '0') return

        this.result = this.result.toString() + number.toString()
    }

    chooseOperation(operation) {
        if(this.result === '') return
        if(this.output !== '') {
            this.compute()
        }
        this.operation = operation
        this.output = this.result
        this.result = ''
    }

    compute() {
        let computation
        const prev = parseFloat(this.output)
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
        this.output = ''
        this.operation = undefined
    }

    updateDisplay() {
        this.resultCell.innerText = this.result
        if(this.operation != null) {
            this.outputCell.innerText = `${this.output} ${this.operation}`
        } else {
            this.outputCell.innerText = this.output
        }
    }
}

const numberBtns = document.querySelectorAll('.number')
const operationBtns = document.querySelectorAll('.operation')
const equalsBtn = document.querySelector('.equals')
const deleteBtn = document.querySelector('.delete')
const allClearBtn = document.querySelector('.all-clear')
const outputCell = document.querySelector('.current-operation')
const resultCell = document.querySelector('.result')

const calculator = new Calculator(resultCell, outputCell)

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