import React, { useState } from 'react';
import jsonData from './jsonData.json';
import { saveAs } from 'file-saver';
// Import my components here
import FormPreview from './FormPreview';
import FormHtml from './FormHtml';

function CreateForm() {
    var [formFields, setFormFields] = useState(jsonData.fields);
    const [label, setLabel] = useState('');
    const [type, setType] = useState('');
    const [name, setName] = useState('');
    const [isRequired, setIsRequired] = useState(false);
    const [className, setClassName] = useState('');
    const [editIndex, setEditIndex] = useState(null);
    function exportAsJson(data) {
        const json = JSON.stringify(data, null, 2);
        const blob = new Blob([json], { type: 'application/json' });
        saveAs(blob, 'data.json');
    }
    const handleFormSubmit = (e) => {
        e.preventDefault();
        const newField = {
            id: Date.now().toString(),
            label: label,
            type: type,
            name: name,
            className: className,
            isRequired: isRequired == "required"? true : false,
        };
        console.log(newField);
        if (editIndex !== null) {
            const updatedFields = [...formFields];
            updatedFields[editIndex] = newField;
            setFormFields(updatedFields);
            setEditIndex(null);
        } else {
            generateFormHTML()
            setFormFields([...formFields, newField]);
        }
        setLabel('')
        setType('')
        setName('')
        setClassName('')
        setIsRequired(false)
    };


    const generateFormHTML = () => {
        let html = '';
        formFields.forEach((field) => {
            html += `<div className="form-group"><label>${field.label} </label> <input ${field.isRequired ? "required" : ""}  name="${field.name}" className="${field.className}" type="${field.type}" /></div>`;
        });
        return html;
    };


    const handleRemoveField = (fieldId) => {
        const updatedFields = formFields.filter((field) => field.id !== fieldId);
        setFormFields(updatedFields);
    }


    const handleEditField = (index, id, e) => {
        e.preventDefault();
        const fieldToEdit = formFields[index];
        if (fieldToEdit.id == id) {
            setLabel(fieldToEdit.label);
            setType(fieldToEdit.type);
            setName(fieldToEdit.name);
            setClassName(fieldToEdit.className);
            setIsRequired(fieldToEdit.isRequired)
            setEditIndex(index);
        }
    };


    const handleCancelEdit = () => {
        setLabel('');
        setType('');
        setName('');
        setClassName('');
        setIsRequired(false)
        setEditIndex(null);
    };
    /**************************************************** */
    const handleMoveUp = (index, e) => {
        e.preventDefault();
        if (index > 0) {
            const updatedFields = [...formFields];
            const temp = updatedFields[index];
            updatedFields[index] = updatedFields[index - 1];
            updatedFields[index - 1] = temp;
            setFormFields(updatedFields);
        }
    };

    const handleMoveDown = (index, e) => {
        e.preventDefault();
        if (index < formFields.length - 1) {
            const updatedFields = [...formFields];
            const temp = updatedFields[index];
            updatedFields[index] = updatedFields[index + 1];
            updatedFields[index + 1] = temp;
            setFormFields(updatedFields);
        }
    };
    /*************************************************** */
    function copyToClipboard() {
        var textToCopy = document.getElementById("copiable-text").innerText;
        var dummyElement = document.createElement("textarea");
        dummyElement.value = textToCopy;
        document.body.appendChild(dummyElement);
        dummyElement.select();
        document.execCommand("copy");
        document.body.removeChild(dummyElement);
        alert("Text copied to clipboard!");
    }


    return (
        <div className='container'>
            <h1>Form Builder</h1>
            <form onSubmit={handleFormSubmit}>
                <div className='row'>
                    <div className='col-6 mx-auto'>
                        <div className="form-group">
                            <label>
                                Field Label:
                            </label>
                            <input required className='form-control' type="text" name="label" value={label} onChange={(e) => setLabel(e.target.value)} />

                        </div>
                        <div className="form-group">
                            <label>
                                Name:
                            </label>
                            <input required className='form-control' type="text" name="label" value={name} onChange={(e) => setName(e.target.value)} />

                        </div>
                        <div className="form-group">
                            <label>
                                Field Type:
                            </label>
                            <select required className='form-control' name="type" value={type} onChange={(e) => setType(e.target.value)}>
                                <option value="">Select type</option>
                                <option value="text">Text</option>
                                <option value="number">Number</option>
                                <option value="checkbox">Checkbox</option>
                                <option value="select">Select</option>
                                <option value="button">Button</option>
                                <option value="submit">Submit</option>
                                <option value="color">Color</option>
                                <option value="email">Email</option>
                                <option value="file">File</option>
                                <option value="search">Search</option>
                                <option value="month">Month</option>
                                <option value="password">Password</option>
                                <option value="radio">Radio</option>
                                <option value="date">Date</option>
                                <option value="url">Url</option>
                                <option value="week">Week</option>
                                <option value="datetime-local">Datetime-local</option>
                            </select>
                        </div>
                        <div className="form-group">
                            <label>
                                Field Type:
                            </label>
                            <select className='form-control' name="type" value={isRequired} onChange={(e) => setIsRequired(e.target.value)}>
                                <option value="not-required">Not required</option>
                                <option value="required">Required</option>
                               
                            </select>
                        </div>
                        <div className="form-group">
                            <label>
                                Class
                            </label>
                            <input className='form-control' type="text" name="className" value={className} onChange={(e) => setClassName(e.target.value)} />
                        </div>
                        <div className="form-group">
                            <button className='btn btn-primary m-1 add-field' type="submit">{editIndex !== null ? 'Save Changes' : 'Add Field'}</button>
                            {editIndex !== null && (
                                <button className="btn btn-primary cancel-edit m-1" onClick={handleCancelEdit}>
                                    Cancel
                                </button>
                            )}
                        </div>
                    </div>
                </div>
            </form>

            <div className='row'>
                <div className='col-md-6 col-sm-12 col-xs-12' >
                    <form className="form-inline p-3">
                        {formFields.length > 0 && formFields.map((field, index) => (
                            <FormPreview key={field.id} formFields={formFields} field={field} index={index} handleMoveUp={handleMoveUp} handleMoveDown={handleMoveDown} handleRemoveField={handleRemoveField} handleEditField={handleEditField} />
                        ))}
                    </form>
                </div>
                <FormHtml formFields={formFields} copyToClipboard={copyToClipboard} exportAsJson={exportAsJson} generateFormHTML={generateFormHTML} />
            </div>
        </div>
    );

}

export default CreateForm;
