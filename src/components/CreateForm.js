import React, { useState } from 'react';
import { FaTrash, FaEdit, FaLevelUpAlt, FaLevelDownAlt } from "react-icons/fa";
import jsonData from './jsonData.json';
function CreateForm() {
    var [formFields, setFormFields] = useState([]);
     //formFields  = jsonData;

    const [label, setLabel] = useState('');
    const [type, setType] = useState('');
    const [className, setClassName] = useState('');
    const [editIndex, setEditIndex] = useState(null);
    const handleFormSubmit = (e) => {
        e.preventDefault();
        const newField = {
            id: Date.now().toString(),
            label: e.target.label.value,
            type: e.target.type.value,
            className: e.target.className.value, // For select fields
            // Add other properties as needed
        };
        if (editIndex !== null) {
            // If editIndex is not null, update the existing field
            const updatedFields = [...formFields];
            updatedFields[editIndex] = newField;
            setFormFields(updatedFields);
            setEditIndex(null);
        } else {

            //console.log(newField);
            generateFormHTML()
            // Update the form fields state
            setFormFields([...formFields, newField]);
        }
        setLabel('')
        setType('')
        setClassName('')
    };
    const generateFormHTML = () => {
        let html = '';
        //console.log(formFields);
        formFields.forEach((field) => {
            // //console.log(field);
            html += `<div className="form-group"><label>${field.label} </label> <input className="${field.className}" type="${field.type}" /></div><br />`;
        });

        return html;
    };
    const handleRemoveField = (fieldId) => {
        const updatedFields = formFields.filter((field) => field.id !== fieldId);
        setFormFields(updatedFields);
    };
    const handleEditField = (index, id) => {
        const fieldToEdit = formFields[index];
        if (fieldToEdit.id == id) {
            setLabel(fieldToEdit.label);
            setType(fieldToEdit.type);
            setClassName(fieldToEdit.className);
            setEditIndex(index);
        }
    };
    const handleCancelEdit = () => {
        setLabel('');
        setType('');
        setClassName('');
        setEditIndex(null);
    };
    /**************************************************** */
    const handleMoveUp = (index) => {
        if (index > 0) {
            const updatedFields = [...formFields];
            const temp = updatedFields[index];
            updatedFields[index] = updatedFields[index - 1];
            updatedFields[index - 1] = temp;
            setFormFields(updatedFields);
        }
    };

    const handleMoveDown = (index) => {
        if (index < formFields.length - 1) {
            const updatedFields = [...formFields];
            const temp = updatedFields[index];
            updatedFields[index] = updatedFields[index + 1];
            updatedFields[index + 1] = temp;
            setFormFields(updatedFields);
        }
    };
    /*************************************************** */
    return (
        <div className='container'>
            <h1>Form Builder</h1>

            {/* Form to capture field properties */}
            <form onSubmit={handleFormSubmit}>
                <div className='col-6 mx-auto'>
                    <div className="form-group">
                        <label>
                            Field Label:
                        </label>
                        <input className='form-control' type="text" name="label" value={label} onChange={(e) => setLabel(e.target.value)} />

                    </div>
                    <div className="form-group">
                        <label>
                            Field Type:
                        </label>
                        <select className='form-control' name="type" value={type} onChange={(e) => setType(e.target.value)}>
                            <option value="text">Text</option>
                            <option value="number">Number</option>
                            <option value="checkbox">Checkbox</option>
                            <option value="select">Select</option>
                            {/* Add other field types as needed */}
                        </select>

                    </div>
                    <div className="form-group">
                        <label>
                            Field Options (comma-separated for select fields):
                        </label>
                        <input className='form-control' type="text" name="className" value={className} onChange={(e) => setClassName(e.target.value)} />

                    </div>
                    <div className="form-group">

                        {/* <button className='btn btn-primary mt-1' type="submit">Add Field</button> */}
                        <button className='btn btn-primary mt-1' type="submit">{editIndex !== null ? 'Save Changes' : 'Add Field'}</button>
                        {editIndex !== null && (
                            <button type="button btn btn-primary" onClick={handleCancelEdit}>
                                Cancel
                            </button>
                        )}
                    </div>

                </div>
            </form>

            {/* Render the form based on formFields state */}

            <div className='row'>
                <div className='col-6' >

                    <form className="form-inline p-3">
                        {formFields.map((field, index) => (
                            <div className='form-group mb-2' key={field.id}>
                                <label>{field.label}</label>

                                <div className="input-group mb-3">
                                    <input className={field.className} type={field.type} />
                                    <div className='input-group-append'>
                                        <FaLevelUpAlt onClick={() => handleMoveUp(index)} disabled={index === 0} />

                                        <FaLevelDownAlt onClick={() => handleMoveDown(index)} disabled={index === formFields.length - 1} />

                                            <FaTrash className='mx-sm-3 mb-2' onClick={() => handleRemoveField(field.id)} />
                                            <FaEdit className='mx-sm-3 mb-2' onClick={() => handleEditField(index, field.id)} />
                                    </div>
                                </div>
                                {/* {field.type === 'number' && <input className='form-control' type="number" />}
                {field.type === 'checkbox' && <input className='form-control' type="checkbox" />} */}
                                {field.type === 'select' && (
                                    <select className='form-control'>
                                        {field.className.map((option, optionIndex) => (
                                            <option key={optionIndex} value={option}>
                                                {option}
                                            </option>
                                        ))}
                                    </select>

                                )}
                            </div>
                        ))}
                    </form>
                </div>
                <div className='col-6'>
                    <pre>{generateFormHTML()}</pre>
                </div>
            </div>
        </div>
    );

}

export default CreateForm;
