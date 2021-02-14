import PageManager from './page-manager';

export default class CategoryCartManager extends PageManager {
  static createCart(url, cartItems) {
    return fetch(url, {
      method: "POST",
      credentials: "same-origin",
      headers: {"Content-Type": "application/json"},
      body: JSON.stringify(cartItems),
    }).then(response => response.json());
  }

  static getCart(url) {
    return fetch(url, {
      method: "GET",
      credentials: "same-origin"
    }).then(response => response.json());
  }

  static addProducts(url, cartId, cartItems) {
    return fetch(url + cartId + '/items', {
      method: "POST",
      credentials: "same-origin",
      headers: {"Content-Type": "application/json"},
      body: JSON.stringify(cartItems),
    }).then(response => response.json());
  }

  static deleteCart(url, cartId) {
    return fetch(url + cartId, {
      method: "DELETE",
      credentials: "same-origin",
      headers: {"Content-Type": "application/json"}
    }).then(response => response.json());
  }
}
