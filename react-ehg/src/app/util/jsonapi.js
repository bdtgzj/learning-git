export function deserializer(inputs = {data: []}) {
  let outputs = []

  if (inputs.data) {
    inputs.data.forEach((input) => {
      let o = Object.assign({}, {type: input.type, id: input.id}, input.attributes)
      outputs.push(o)
    }, this)
  }
  
  return outputs
}

export function serializer(inputs = {data: []}) {

}