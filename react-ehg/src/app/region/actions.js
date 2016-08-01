import { createEntity } from 'redux-json-api'

/*
 * validate 
 */
export function validateName(name) {
  return {
    type: VALIDATE_NAME,
    name
  }
}

export function validateOrder(order) {
  return {
    type: VALIDATE_ORDER,
    password
  }
}

/*
 * create
 */
export function create(region) {
  createEntity({type: 'region', attributes: region})
  
}

/*
 * read 
 */

/*
 * update 
 */

/*
 * delete 
 */
