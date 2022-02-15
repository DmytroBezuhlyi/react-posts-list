import axios from "axios";

export default class PostsService {
  static async getAll(limit = 2, page = 1) {
    return await axios.get('https://jsonplaceholder.typicode.com/posts', {
      params: {
        _limit: limit,
        _page: page,
      }
    });
  }

  static async getByID(id) {
    return await axios.get(`https://jsonplaceholder.typicode.com/posts/${ id }`);
  }

  static async getComments(postID) {
    return await axios.get(`https://jsonplaceholder.typicode.com/posts/${ postID }/comments`);
  }
}