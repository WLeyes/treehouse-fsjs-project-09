export const validate = (element) => {
  let error = [true, ''];

  // check if email
  if(element.validation.email){
    const valid = /\S+@\S+\.\S+/.test(element.value);
    const message  = `${!valid ? 'Please enter a valid email address.': ''}`;
    error = !valid ? [valid, message] : error
  }

  // Check if required
  if(element.validation.required){
    const valid = element.value.trim() !== '';
    const message = `${!valid ? 'This field is required.': ''}`;
    error = !valid ? [valid, message] : error
  }
  return error;
}