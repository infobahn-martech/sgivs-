import Gateway from '../config/gateway';

const getAllRentals = (params) => Gateway.get('rental', { params });

const getNotes = (params) => Gateway.get('rental/list-notes', { params });

const changeStatus = ({ id, status, dueDate }) =>
  Gateway.put(`rental/${id}`, { status, dueDate });
const editNote = (rentalId, note) =>
  Gateway.patch(`rental/edit-note`, {
    rentalId, // Pass rentalId in the request body
    note, // Pass note in the request body
  });

export default {
  getAllRentals,
  changeStatus,
  getNotes,
  editNote,
};
