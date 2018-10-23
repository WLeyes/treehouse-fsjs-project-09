import React, { Component } from 'react'
import FormField from '../../UI/FormField';
import { validate } from '../../UI/Misc';

export default class AddEditCourses extends Component {

  state = {
    userID: '',
    formType: '',
    formError: false,
    formSuccess: '',
    formData: {
      title: {
        element: 'input',
        value: '',
        config: {
          label: 'Title',
          name: 'input--title',
          type: 'text'
        },
        validation:{
          required: true,
          valid: false,
          validationMessage: '',
          showLabel: true
        }
      },
      description: {
        element: 'input',
        value: '',
        config: {
          label: 'Description',
          name: 'input--description',
          type: 'text'
        },
        validation:{
          required: true,
          valid: false,
          validationMessage: '',
          showLabel: true
        }
      },
      estimatedTime: {
        element: 'input',
        value: '',
        config: {
          label: 'Estimated Time',
          name: 'input--estimatedTime',
          type: 'text'
        },
        validation:{
          required: false,
          valid: false,
          validationMessage: '',
          showLabel: true
        }
      },
      materialsNeeded: {
        element: 'input',
        value: '',
        config: {
          label: 'Materials Needed',
          name: 'input--materialsNeeded',
          type: 'text'
        },
        validation:{
          required: false,
          valid: false,
          validationMessage: '',
          showLabel: true
        }
      }
    }
  }

  updateFields = (course, courseID, formType) => {
    const newFormData = { ...this.state.formData }
    for(let key in newFormData){
      newFormData[key].value = course[key];
      newFormData[key].valid = true;
    }
    this.setState({
      courseID,
      formType,
      formData: newFormData
    })
  }

  componentDidMount() {
    const courseID = this.props.match.params.id;
    if(!courseID){
      this.setState({
        formType: 'Add Course'
      })
    } else {
      // import from api
    }
  }

  updateForm(element, content = '') {
    const newFormData = {...this.state.formData};
    const newElement = {...newFormData[element.id]};
    content === '' ?
    newElement.value = element.event.target.value
    : newElement.value = content
    let validData = validate(newElement);
    newElement.validationMessage = validData[1];
    newFormData[element.id] = newElement;
    this.setState({
      formError: false,
      formData: newFormData
    });
  }

  submitForm(event){
    
  }

  render() {
    return (
      <div>
        
      </div>
    )
  }
}
