import Gateway from '../config/gateway';

const getAllRentals = (params) => Gateway.get('rental', { params });

const getNotes = (params) => Gateway.get('rental/list-notes', { params });

const changeStatus = ({ id, status, dueDate }) =>
  Gateway.put(`rental/${id}`, { status, dueDate });
const editNote = (rentalId, note) =>
  Gateway.put(`rental/edit-note/${rentalId}`, { note });

export default {
  getAllRentals,
  changeStatus,
  getNotes,
  editNote,
};
