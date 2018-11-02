import React, { Component } from 'react';
import {
	Button,
	Modal,
	ModalHeader,
	ModalBody,
	ModalFooter,
	InputGroup,
	Input,
	InputGroupAddon,
	CustomInput,
	Table
} from 'reactstrap'

class ConfirmDelete extends Component {
	constructor(props) {
		super(props)
		this.state = {
			showModal: false,
			ModalData: {},
			editableItemKey: '',
		}
		this.emptyData = {
			page_name: "",
			en: [],
			he: [],
			media: [],
		}
		this.reset = this.reset.bind(this)
	}

	componentWillReceiveProps(nextProps) {
		this.setState({
			data: !nextProps.data ? this.emptyData : Object.assign({}, nextProps.data)
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

	handleToggle(item, value) {
		this.setState((prevState) => ({
			data: {
				...prevState.data,
				[item]: !value
			}
		}))
	}

	toggleModal(data, index) {
		this.setState({
			showModal: !this.state.showModal,
			ModalData: data ? data : {},
			editableItemKey: index ? index : '',
		})
	}

	handleSubChange(e, item) {
		const { target } = e
		this.setState((prevState) => ({
			ModalData: {
				...prevState.ModalData,
				[item]: target.value
			}
		}))
	}

	getSubInputs() {
		let output = [], i = 1
		Object.keys(this.state.ModalData).forEach((item) => {
			output.push(
				<InputGroup className="modal-input" key={i}>
					<InputGroupAddon addonType="prepend">{item}</InputGroupAddon>
					<Input value={this.state.ModalData[item] ? this.state.ModalData[item] : ''} onChange={(e) => this.handleSubChange(e, item)} />
				</InputGroup>
			)
			i++
		})
		return output
	}

	deleteSubTableRow(item) {
		this.setState((prevState) => {
			delete prevState.data[item]
			return {
				data: prevState.data
			}
		})
	}

	saveChanges() {
		this.setState((prevState) => {
			prevState.data[prevState.editableItemKey] = prevState.ModalData
			return {
				data: prevState.data
			}
		})
		this.toggleModal();
	}

	getInputs() {
		let output = [], table = { body: [], head: [] }, media = [], i = 1
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
				} else if (this.state.data[item] && typeof this.state.data[item] === 'object' && item === 'media') {
					media.push(
						<tr key={i}>
							{
								Object.keys(this.state.data[item]).map((key, id) => (
									<React.Fragment key={id}>
										<td>
											{key}
										</td>
										<td>
											<div className="table-text-content">
												{this.state.data[item][key]}
											</div>
										</td>
										<td className="text-center">
											<Button
												color="success"
												onClick={() => this.toggleModal(this.state.data[item], item)}
											>
												Edit
                                            </Button>
											{' '}
											<Button
												color="danger"
												onClick={() => this.deleteSubTableRow(item)}
											>
												Delete
                                            </Button>
										</td>
									</React.Fragment>
								))
							}
						</tr>
					)
				} else if (this.state.data[item] && typeof this.state.data[item] === 'object') {
					if (table.head.length === 0) {
						table.head.push(
							<tr key={i + 'head'}>
								<th key='#head'></th>
								{
									Object.keys(this.state.data[item]).map((keys, id) => (
										<th key={id}>
											{keys}
										</th>
									))
								}
								<th key='head-actions'>Actions</th>
							</tr>
						)
					}
					table.body.push(
						<tr key={i}>
							<td key='#body'>{item}</td>
							{
								Object.values(this.state.data[item]).map((values, id) => (
									<td key={id}>
										<div className="table-text-content">
											{values}
										</div>
									</td>
								))
							}
							<td className="text-center">
								<Button
									color="success"
									onClick={() => this.toggleModal(this.state.data[item], item)}
								>
									Edit
                                </Button>
								{' '}
								<Button
									color="danger"
									onClick={() => this.deleteSubTableRow(item)}
								>
									Delete
                                </Button>
							</td>
						</tr>
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
		output.push(
			<InputGroup key={i}>
				{
					table.body.length ?
						<React.Fragment>
							<div className='head'>
								<h3>Content:</h3>
								{ /* <Button color="success" className="addButton">Add Content</Button> */}
							</div>
							<Table striped responsive bordered>
								<thead>
									{table.head}
								</thead>
								<tbody>
									{table.body}
								</tbody>
							</Table>
						</React.Fragment>
						:
						null
				}
				{
					media.length ?
						<React.Fragment>
							<div className='head'>
								<h3>Media:</h3>
								{ /* <Button color="success" className="addButton">Add Media</Button> */}
							</div>
							<Table striped responsive bordered>
								<tbody>
									{media}
								</tbody>
							</Table>
						</React.Fragment>
						:
						null
				}
				<Modal
					isOpen={this.state.showModal}
					toggle={() => this.toggleModal()}
					className="wide-modal"
				>
					<ModalHeader toggle={() => this.toggleModal()}>Edit Form</ModalHeader>
					<ModalBody>
						{
							this.state.ModalData ?
								this.getSubInputs()
								:
								null
						}
					</ModalBody>
					<ModalFooter>
						<Button className="float-left" color="success" onClick={() => this.saveChanges(this.state.ModalData)}>Save</Button>
						{' '}
						<Button className="float-right" color="secondary" onClick={() => this.toggleModal()}>Cancel</Button>
					</ModalFooter>
				</Modal>
			</InputGroup>
		)
		return output
	}

	reset() {
		this.setState({ data: Object.assign({}, this.props.data) })
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