import React, { Component } from 'react';
import { Button, Modal, ModalHeader, ModalBody, ModalFooter, InputGroup, Input, InputGroupAddon, CustomInput } from 'reactstrap'
import DatePicker from '../../datePicker'

class ConfirmDelete extends Component {
    constructor(props) {
        super(props)
        this.state = {}
        this.emptyData = {
			investor_id: '',
			project_id: '',
			purchase_date: new Date(),
			status_id: '',
			unit_count: '',
			unit_price: '',
			po_doc: '',
        }
		this.reset = this.reset.bind(this)
		this.handleChangeDate = this.handleChangeDate.bind(this)
    }

    componentWillReceiveProps(nextProps) {
        this.setState({
            data: !nextProps.data ? this.emptyData : nextProps.data
        })
    }

    handleChange(e, item) {
        const { target } = e
        this.setState((prevState) => ({
            data: {
                ...prevState.data,
                [item]: target.value
            }
        }))
	}
	
	handleChangeDate(date, item) {
		this.setState((prevState) => ({
			data: {
				...prevState.data,
				[item]: date.toISOString()
			}
		}))
	}

    handleToggle(item, value) {
        this.setState((prevState) => ({
            data: {
                ...prevState.data,
                [item]: !value
            }
        }))
    }

    getInputs() {
        let output = [], i = 1
        for (let item in this.state.data) {
            if (item !== 'id' && item !== 'password' && item !== 'signin_token') {
                if (typeof this.state.data[item] === 'boolean') {
                    output.push(
                        <InputGroup className="modal-input" key={i}>
                            <CustomInput
                                type="checkbox"
								id={item + 'form'}
                                label={item}
                                onChange={() => {
                                    this.handleToggle(item, this.state.data[item])
                                }}
                                checked={this.state.data[item]}
                            />
                        </InputGroup>
                    )
				} else if (item === 'purchase_date') {
					output.push(
						<DatePicker
							key={i}
							item={item}
							handleChange={this.handleChangeDate}
							value={this.state.data[item]}
						/>
					)
				} else if (this.state.data[item] && typeof this.state.data[item] === 'object') {
                    output.push(
                        <InputGroup className="modal-input" key={i}>
                            {null}
                        </InputGroup>
                    )
                } else {
                    output.push(
                        <InputGroup className="modal-input" key={i}>
                            <InputGroupAddon addonType="prepend">{item}</InputGroupAddon>
                            <Input value={this.state.data[item] ? this.state.data[item] : ''} onChange={(e) => this.handleChange(e, item)} />
                        </InputGroup>
                    )
                }
            }
            i++
        }
        return output
    }

    reset() {
        this.setState({ data: this.props.data })
    }

    render() {
        return (
            <Modal
                isOpen={this.props.showTableForm}
                toggle={this.props.toggleTableForm}
                className="wide-modal"
            >
                <ModalHeader toggle={this.props.toggleTableForm}>Edit Form</ModalHeader>
                <ModalBody>
                    {
                        this.state.data ?
                            this.getInputs()
                            :
                            null
                    }
                </ModalBody>
                <ModalFooter>
                    <Button className="float-left" color="success" onClick={() => this.props.saveChanges(this.state.data)}>Confirm</Button>
                    {' '}
                    {
                        this.state.data && this.state.data.id ?
                            <Button className="float-left" color="link" onClick={this.reset}>Reset</Button>
                            :
                            null
                    }
                    {' '}
                    <Button className="float-right" color="secondary" onClick={this.props.toggleTableForm}>Cancel</Button>
                </ModalFooter>
            </Modal>
        );
    };
}

export default ConfirmDelete;