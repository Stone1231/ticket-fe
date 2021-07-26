import {
  apiTicketAll,
  apiTicketSingle,
  apiTicketDelete,
  apiTicketPut,
  apiTicketPost,
} from "./api";
export default class TicketService {
  static async get() {
    try {
      return await apiTicketAll();
    } catch (err) {
      console.error(err);
    }
  }
  static async getSingle(id) {
    try {
      return await apiTicketSingle(id);
    } catch (err) {
      console.error(err);
    }
  }
  static async delete(id) {
    try {
      return await apiTicketDelete(id);
    } catch (err) {
      console.error(err);
    }
  }
  static async post(data) {
    try {
      return await apiTicketPost(data);
    } catch (err) {
      console.error(err);
    }
  }
  static async put(data) {
    try {
      return await apiTicketPut(data);
    } catch (err) {
      console.error(err);
    }
  }
}
