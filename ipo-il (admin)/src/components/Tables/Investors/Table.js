import React, { Component } from 'react';
import ls from 'local-storage';
import axios from '../../../axiosConfig';
import ConfirmDelete from '../../ConfirmDelete';
import TableForm from './TableForm';
import { Table, Button } from 'reactstrap';
import { toLogin } from '../../../helper'

import TableRow from './TableRow'

class TableContainer extends Component {
    constructor(props) {
        super(props)
        this.state = {
            tableData: [],
            showConfirmDelete: false,
            showTableForm: false,
            EditableItem: 0,
            DeleteItemId: 0,
            isLoading: true,
        }
        this.toggleConfirm = this.toggleConfirm.bind(this)
        this.toggleTableForm = this.toggleTableForm.bind(this)
        this.confirmDelete = this.confirmDelete.bind(this)
        this.saveChanges = this.saveChanges.bind(this)
    }

    confirmDelete() {
		const token = ls.get('token')
		if (token) {
			axios.delete(`/adminpanel/investors/${this.state.DeleteItemId}`, {
				headers: {
					token: token
				}
			})
				.then(() => {
					this.getTableData();
				})
				.catch((error) => {
					toLogin()
				})
		} else {
			toLogin()
			
		}

        this.toggleConfirm()
    }

    saveChanges(item) {
		const token = ls.get('token')
		if (token) {
			if (!item.id) {
				axios.post(`/adminpanel/investors/`, item, {
					headers: {
						token: token
					}
				})
					.then(() => {
						this.getTableData();
					})
					.catch((error) => {
						toLogin()
					})
			} else {
				axios.put(`/adminpanel/investors/${item.id}`, item, {
					headers: {
						token: token
					}
				})
					.then(() => {
						this.getTableData();
					})
					.catch((error) => {
						toLogin()
					})
			}
		} else {
			toLogin()
			
		}

        this.toggleTableForm()
    }

    toggleTableForm(index) {
        this.setState({
            showTableForm: !this.state.showTableForm,
            EditableItem: index ? index : 0,
        })
    }

    toggleConfirm(id) {
        this.setState({
            showConfirmDelete: !this.state.showConfirmDelete,
            DeleteItemId: id,
        })
    }

    componentWillMount() {
        this.getTableData();
    }

    componentWillReceiveProps() {
        this.getTableData();
    }

    getTableData() {
		const token = ls.get('token')
		if (token) {
			this.setState({ isLoading: true });
			axios.get(`/adminpanel/investors`, {
				headers: {
					token: token
				}
			})
				.then((response) => {
					if (response.statusText === "OK") {
						this.setState({ tableData: response.data.data })
					}
				})
				.then(() => this.setState({ isLoading: false }))
				.catch((error) => {
					toLogin()
				})
		} else {
			toLogin()
			
		}
    }

    getColumns() {
        if (this.state.tableData && this.state.tableData.length) {
            return <TableRow data={this.state.tableData[0]} thead />
        }
        return null
    }

    getRows() {
        if (this.state.tableData && this.state.tableData.length) {
            return this.state.tableData.map((row, index) => (
                <TableRow key={index} index={index} data={row} toggleConfirm={this.toggleConfirm} toggleTableForm={this.toggleTableForm} />
            ))
        }
        return null
    }

    render() {
        return (
            this.state.isLoading ?
                <div className="lds-roller"><div></div><div></div><div></div><div></div><div></div><div></div><div></div><div></div></div>
                :
                <React.Fragment>
                    <Button color="success" className="addButton" onClick={this.toggleTableForm}>Add New</Button>
                    <Table striped responsive>
                        <thead>
                            {
                                this.getColumns()
                            }
                        </thead>
                        <tbody>
                            {
                                this.getRows()
                            }
                        </tbody>
                    </Table>
                    <TableForm
                        showTableForm={this.state.showTableForm}
                        toggleTableForm={this.toggleTableForm}
                        saveChanges={this.saveChanges}
                        data={this.state.tableData[this.state.EditableItem]}
                    />
                    <ConfirmDelete
                        showConfirmDelete={this.state.showConfirmDelete}
                        toggleConfirm={this.toggleConfirm}
                        confirmDelete={this.confirmDelete}
                    />
                </React.Fragment>
        );
    };
}

export default TableContainer;