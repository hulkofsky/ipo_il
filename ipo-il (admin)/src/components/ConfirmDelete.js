import React, { Component } from 'react';
import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap'

class ConfirmDelete extends Component {
    render() {
        return (
            <Modal isOpen={this.props.showConfirmDelete} toggle={this.props.toggleConfirm} className={null}>
                <ModalHeader toggle={this.props.toggleConfirm}>Delete Confirm</ModalHeader>
                <ModalBody>
                    {`Do you realy whant to delete this item?`}
                </ModalBody>
                <ModalFooter>
                    <Button color="danger" onClick={this.props.confirmDelete}>Confirm</Button>{' '}
                    <Button color="secondary" onClick={this.props.toggleConfirm}>Cancel</Button>
                </ModalFooter>
            </Modal>
        );
    };
}

export default ConfirmDelete;